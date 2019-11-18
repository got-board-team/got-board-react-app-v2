import React, { useState } from 'react';
import { connect } from 'react-redux'

import WarRoom from './WarRoom';
import Map from "./Map";
import Dropable from "./Dropable";
import { updateWarRoom } from "./actions/warRoom";

const Game = React.memo(() => {
  const [warRoomPosition, setWarRoomPosition] = useState({x: 50, y: 50});

  const updateWarRoomPosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const newX = newCoords.x + warRoomPosition.x;
      const newY = newCoords.y + warRoomPosition.y;
      setWarRoomPosition({x: newX, y: newY});
    }
  }

  return (
    <Dropable accept="war-room" dropAction={updateWarRoomPosition}>
      <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
      <Map />
    </Dropable>
  );
});

const mapStateToProps = (state: any) => ({
  ...state.warRoom,
});

const mapDispatchToProps = {
  updateWarRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);
