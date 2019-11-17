import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';
import WarRoom from './WarRoom';
import Map from "./Map";
import Dropable from "./Dropable";

const App: React.FC = () => {
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
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Dropable accept="war-room" dropAction={updateWarRoomPosition}>
          <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
          <Map />
        </Dropable>
      </div>
    </DndProvider>
  );
};

export default App;
