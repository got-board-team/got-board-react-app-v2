import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';
import WarRoom from './WarRoom';
import Piece from './Piece';
import Map from "./Map";

const App: React.FC = () => {
  const [warRoomPieces, setWarRoomPieces] = useState([
    { id: 1, type: "piece", x: 100, y: 100 },
    { id: 2, type: "piece", x: 150, y: 100 },
    { id: 3, type: "piece", x: 200, y: 100 },
    { id: 4, type: "piece", x: 250, y: 100 },
    { id: 5, type: "piece", x: 300, y: 100 },
  ]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <WarRoom>
          {warRoomPieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
        </WarRoom>
        <Map />
      </div>
    </DndProvider>
  );
}

export default App;
