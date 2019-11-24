import React, { useState } from 'react';

import WarRoom from './WarRoom';
import Map from "./Map";
import Dropable from "./common/Dropable";

const Game = React.memo(() => {
  const [warRoomPosition, setWarRoomPosition] = useState({x: 600, y: 80});

  const updateWarRoomPosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const newX = newCoords.x + warRoomPosition.x;
      const newY = newCoords.y + warRoomPosition.y;
      setWarRoomPosition({x: newX, y: newY});
    }
  }

  return (
    <Dropable accept="war-room" dropAction={updateWarRoomPosition} dropLocation="game">
      <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
      <Map />
    </Dropable>
  );
});

export default Game;
