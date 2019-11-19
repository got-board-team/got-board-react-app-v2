import React from 'react';
import { connect } from 'react-redux'

import Dropable from "./Dropable";
import Piece, { PieceProps } from './Piece';
import { Drop } from "./reducers/drop";

interface MapProps {
  drops: Drop[];
}

const Map = React.memo(({drops}: MapProps) => {
  const updatePiecePosition = (item: any, monitor: any) => {
    /* const newCoords = monitor.getDifferenceFromInitialOffset();
     * if (newCoords && newCoords.x && newCoords.y) {
     *   const currentPiece = pieces.find(i => i.id === item.id);
     *   const otherPieces = pieces.filter(i => i.id !== item.id);
     *   let newPiece: PieceProps;
     *   if (!currentPiece) {
     *     const newCoords2 = monitor.getSourceClientOffset();
     *     const ids = otherPieces.map(piece => piece.id);
     *     newPiece = {
     *       id: Math.max(...ids) + 1,
     *       type: "piece",
     *       x: newCoords2.x,
     *       y: newCoords2.y,
     *     };
     *   } else {
     *     newPiece = {
     *       ...currentPiece,
     *       x: newCoords.x + currentPiece.x,
     *       y: newCoords.y + currentPiece.y,
     *     };
     *   }
     *   const final: PieceProps[] = [
     *     ...otherPieces,
     *     newPiece,
     *   ]

     *   //updateMap(final);
     * } */
  }

  return (
    <Dropable accept="piece" dropAction={updatePiecePosition}>
      <section className="map">
        {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} />)}
      </section>
    </Dropable>
  );
});

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "map"),
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Map);
