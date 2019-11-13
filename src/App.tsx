import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

import './App.css';
import WarRoom from './WarRoom';
import Piece, { PieceProps } from './Piece';
import Map from "./Map";
import Dropable from "./Dropable";

const App: React.FC = () => {
  const [warRoomPieces, setWarRoomPieces] = useState([
    { id: 1, type: "piece", x: 100, y: 100 },
    { id: 2, type: "piece", x: 150, y: 100 },
    { id: 3, type: "piece", x: 200, y: 100 },
    { id: 4, type: "piece", x: 250, y: 100 },
    { id: 5, type: "piece", x: 300, y: 100 },
  ]);

  const updatePiecePosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const currentPiece = warRoomPieces.find(i => i.id === item.id);
      if (!currentPiece) return; // Not undefined
      const otherPieces = warRoomPieces.filter(i => i.id !== item.id);
      const newPiece: PieceProps = {
        ...currentPiece,
        x: newCoords.x + currentPiece.x,
        y: newCoords.y + currentPiece.y,
      };
      const final: PieceProps[] = [
        ...otherPieces,
        newPiece,
      ]
      setWarRoomPieces(final);
    }
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Dropable accept="piece" dropAction={updatePiecePosition}>
          <WarRoom id={0} type="war-room" x={50} y={50}>
            {warRoomPieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
          </WarRoom>
        </Dropable>
        <Map />
      </div>
    </DndProvider>
  );
}

export default App;
