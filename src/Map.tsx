import React, { useState } from 'react';

import Dropable from "./Dropable";
import Piece, { PieceProps } from './Piece';

const Map = React.memo(() => {
  const [pieces, setPieces] = useState([
    { id: 6, type: "piece", x: 100, y: 100 },
    { id: 7, type: "piece", x: 150, y: 100 },
    { id: 8, type: "piece", x: 200, y: 100 },
  ]);

  const updatePiecePosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const currentPiece = pieces.find(i => i.id === item.id);
      const otherPieces = pieces.filter(i => i.id !== item.id);
      let newPiece: PieceProps;
      if (!currentPiece) {
        const newCoords2 = monitor.getSourceClientOffset();
        const ids = otherPieces.map(piece => piece.id);
        newPiece = {
          id: Math.max(...ids) + 1,
          type: "piece",
          x: newCoords2.x,
          y: newCoords2.y,
        };
      } else {
        newPiece = {
          ...currentPiece,
          x: newCoords.x + currentPiece.x,
          y: newCoords.y + currentPiece.y,
        };
      }
      const final: PieceProps[] = [
        ...otherPieces,
        newPiece,
      ]

      setPieces(final);
    }
  }

  return (
    <Dropable accept="piece" dropAction={updatePiecePosition}>
      <section className="map">
        {pieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
      </section>
    </Dropable>
  );
});

export default Map;
