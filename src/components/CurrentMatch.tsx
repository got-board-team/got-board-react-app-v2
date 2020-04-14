import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import Map from "./Map";
import Dropable from "./common/Dropable";
import MatchTopNavigation from "./MatchTopNavigation";
import { Locations, Houses } from "../constants";
import { User } from "../reducers/currentUser";
import { selectCurrentMatch, selectCurrentUser } from "../selectors";
import { useGetMatch } from "../actions/matches";
import { CurrentMatchState } from "../reducers/currentMatch";

function CurrentMatch({ match: { params: { id } } }: { match: any }) {
  const [request, {loading, error}] = useGetMatch(parseInt(id));
  const currentMatch: CurrentMatchState = useSelector(selectCurrentMatch);
  const currentUser: User = useSelector(selectCurrentUser);
  const currentPlayerHouse = Houses.STARK; // Mocked for now

  const updateUiPanelPosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const newX = newCoords.x + warRoomPosition.x;
      const newY = newCoords.y + warRoomPosition.y;
      const newPanelsPositions = {
        ...uiPanelsPositions,
        [item.type]: { x: newX, y: newY }
      };
      setUiPanelsPositions(newPanelsPositions);
    }
  }

  const [uiPanelsPositions, setUiPanelsPositions] = useState({
    "war-room": {x: 100, y: 80},
    "combat": {x: 700, y: 80},
  });

  const warRoomPosition = uiPanelsPositions["war-room"];
  const combatPosition = uiPanelsPositions["combat"];

  useEffect(function getCurrentMatch() {
    request();
  },
  []);

  if (loading) {
    return (<p>Loading...</p>);
  }

  if (currentMatch.players.length === 0) {
    console.log("No players");
  }

  return (
    <Dropable accept={[Locations.WAR_ROOM, Locations.COMBAT]} dropAction={updateUiPanelPosition} dropLocation="game">
      <MatchTopNavigation warRoomPosition={warRoomPosition} combatPosition={combatPosition} currentPlayerHouse={currentPlayerHouse} />
      {error && <p>{error}</p>}
      <Map />
    </Dropable>
  );
};

export default React.memo(CurrentMatch);
