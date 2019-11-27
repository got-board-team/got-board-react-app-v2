import React, { useState } from 'react';

import Map from "./Map";
import Dropable from "./common/Dropable";
import WarRoom from './WarRoom';
import Combat from './Combat';
import { Locations } from "../constants";

const Game = React.memo(() => {
  const [uiPanelsPositions, setUiPanelsPositions] = useState({
    "war-room": {x: 100, y: 80},
    "combat": {x: 700, y: 80},
  });

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

  return (
    <Dropable accept={[Locations.WAR_ROOM, Locations.COMBAT]} dropAction={updateUiPanelPosition} dropLocation="game">
      <section className="ui__actions-bar">
        <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
        <Combat x={combatPosition.x} y={combatPosition.y} />
      </section>
      <Map />
    </Dropable>
  );
});

export default Game;
