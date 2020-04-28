import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'

import Map from "./Map";
import Dropable from "./common/Dropable";
import MatchTopNavigation from "./MatchTopNavigation";
import JoinMatch from "./JoinMatch";
import { Locations } from "../constants";
import { Drop } from "../models";
import { selectCurrentMatch, selectCurrentUser, selectMapDrops } from "../selectors";
import { useGetMatch } from "../actions/matches";
import { useGetPieces } from "../actions/pieces";
import { CurrentMatchState } from "../reducers/currentMatch";
import { CurrentUserState } from "../reducers/currentUser";

function CurrentMatch({ match: { params: { id } } }: { match: any }) {
  const [requestMatch, {loading, error}] = useGetMatch(parseInt(id));
  const [requestPieces, {loading: loadingPieces, error: errorPieces}] = useGetPieces(parseInt(id));

  const currentMatch: CurrentMatchState = useSelector(selectCurrentMatch);
  const currentUser: CurrentUserState = useSelector(selectCurrentUser);
  const currentPlayer = currentMatch.players && currentMatch.players.find(player => currentUser.id === player.id);
  const drops: Drop[] = useSelector(selectMapDrops);

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

  useEffect(function getCurrentMatchData() {
    requestMatch();
    requestPieces();
  },
  []);

  if (loading) {
    return (<p>Loading...</p>);
  }

  return (
    <Dropable accept={[Locations.WAR_ROOM, Locations.COMBAT]} dropAction={updateUiPanelPosition} dropLocation="game">
      {(!currentPlayer && currentMatch.id && currentUser.id && currentMatch.players) &&
       <JoinMatch
         currentMatchId={currentMatch.id}
         currentUserId={currentUser.id}
         players={currentMatch.players}
       />}
      {currentPlayer && <MatchTopNavigation warRoomPosition={warRoomPosition} combatPosition={combatPosition} currentPlayerHouse={currentPlayer.house} />}
      {error && <p>{error}</p>}
      <Map drops={drops} />
    </Dropable>
  );
};

export default React.memo(CurrentMatch);
