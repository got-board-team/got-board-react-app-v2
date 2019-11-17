import React, { useState } from 'react';

import Piece, { PieceProps } from './Piece';
import Draggable from './Draggable';
import Dropable from "./Dropable";

interface WarRoomProps {
  x: number;
  y: number;
}

const WarRoom = React.memo(({x, y}: WarRoomProps) => {
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
    <Dropable accept="piece" dropAction={updatePiecePosition}>
      <Draggable id={0} type="war-room" x={x} y={y}>
        <section className="war-room">
          {warRoomPieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
        </section>
      </Draggable>
    </Dropable>
  );
});

export default WarRoom;
