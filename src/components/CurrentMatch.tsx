import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'

import Map from "./Map";
import Dropable from "./common/Dropable";
import WarRoom from './WarRoom';
import Combat from './Combat';
import { Locations, Houses, capitalizeName } from "../constants";
import { Match } from "../models";
import { User } from "../reducers/currentUser";
import { selectCurrentMatch, selectCurrentUser } from "../selectors";
import { House } from "../models";
import { useGetMatch } from "../actions/matches";

const CurrentSelectedHouse = ({houseName}: {houseName: Houses}) => (<span className="ui__top-text">{capitalizeName(houseName)}</span>);

const MockedCurrentUserHouse = {
  type: Houses.STARK,
  playerId: 1,
};

function CurrentMatch({ match: { params: { id } } }: { match: any }) {
  const [uiPanelsPositions, setUiPanelsPositions] = useState({
    "war-room": {x: 100, y: 80},
    "combat": {x: 700, y: 80},
  });

  const [request, {loading, error}] = useGetMatch(parseInt(id));
  const currentMatch: Match = useSelector(selectCurrentMatch);
  const currentUser: User = useSelector(selectCurrentUser);
  const currentPlayerHouse: House = MockedCurrentUserHouse;

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

  const warRoomPosition = uiPanelsPositions["war-room"];
  const combatPosition = uiPanelsPositions["combat"];

  useEffect(function getCurrentMatch() {
    request();
  },
  []);

  return (
    <Dropable accept={[Locations.WAR_ROOM, Locations.COMBAT]} dropAction={updateUiPanelPosition} dropLocation="game">
      <section className="ui__top-bar">
        <Link to="/">Home</Link>
        <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
        <Combat x={combatPosition.x} y={combatPosition.y} />
        {currentPlayerHouse && <CurrentSelectedHouse houseName={currentPlayerHouse.type} />}
      </section>
      <Map />
    </Dropable>
  );
};

export default React.memo(CurrentMatch);
