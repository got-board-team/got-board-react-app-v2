import React, { useState } from 'react';
import { useDrop } from 'react-dnd'

import Piece, { PieceProps } from './Piece';

const Map = React.memo(() => {
  const [pieces, setPieces] = useState([
    { id: 1, type: "piece", x: 100, y: 100 },
    { id: 2, type: "piece", x: 150, y: 100 },
    { id: 3, type: "piece", x: 200, y: 100 },
  ]);

  const [collectedProps, drop] = useDrop({
    accept: "piece",
    canDrop: () => true,
    drop: (item: PieceProps, monitor) => {
      const newCoords = monitor.getDifferenceFromInitialOffset();
      if (newCoords && newCoords.x && newCoords.y) {
        const currentPiece = pieces.find(i => i.id === item.id);
        if (!currentPiece) return; // Not undefined
        const otherPieces = pieces.filter(i => i.id !== item.id);
        const newPiece: PieceProps = {
          ...currentPiece,
          x: newCoords.x + currentPiece.x,
          y: newCoords.y + currentPiece.y,
        };
        const final: PieceProps[] = [
          ...otherPieces,
          newPiece,
        ]
        setPieces(final);
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  });

  return (
    <section className="map" ref={drop}>
      {pieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
    </section>
  );
});

export default Map;
