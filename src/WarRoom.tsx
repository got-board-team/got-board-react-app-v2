import React from 'react';
import { connect } from 'react-redux'

import Piece, { PieceProps } from './Piece';
import Draggable from './Draggable';
import Dropable from "./Dropable";
import { addPieceInWarRoom, updatePieceInWarRoom } from "./actions/warRoom";
import { removePieceFromMap } from "./actions/map";
import { Drop } from "./reducers/drop";

interface WarRoomProps {
  drops: Array<Drop>;
  updatePieceInWarRoom: (piece: any) => void;
  addPieceInWarRoom: (piece: any) => void;
  removePieceFromMap: (piece: any) => void;
  x: number;
  y: number;
}

const WarRoom = React.memo(({x, y, drops, addPieceInWarRoom, updatePieceInWarRoom, removePieceFromMap}: WarRoomProps) => {
  const updatePiecePosition = (item: any, monitor: any) => {
    /* const newCoords = monitor.getDifferenceFromInitialOffset();

     * if (newCoords && newCoords.x && newCoords.y) {
     *   const currentPiece = pieces.find(i => i.id === item.id);

     *   if (!currentPiece) {
     *     const otherPieces = pieces.filter(i => i.id !== item.id);
     *     const ids = otherPieces.map(piece => piece.id);
     *     const newPiece = {
     *       id: item.id,
     *       type: "piece",
     *       x: newCoords.x,
     *       y: newCoords.y,
     *     };
     *     addPieceInWarRoom(newPiece);
     *     removePieceFromMap(item.id);
     *     return;
     *   }

     *   const updatedPiece: PieceProps = {
     *     ...currentPiece,
     *     x: newCoords.x + currentPiece.x,
     *     y: newCoords.y + currentPiece.y,
     *   };

     *   updatePieceInWarRoom(updatedPiece);
     * } */
  }

  return (
    <Dropable accept="piece" dropAction={updatePiecePosition}>
      <Draggable id={0} type="war-room" x={x} y={y}>
        <section className="war-room">
          {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} />)}
        </section>
      </Draggable>
    </Dropable>
  );
});

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "war-room"),
});

const mapDispatchToProps = {
  addPieceInWarRoom,
  updatePieceInWarRoom,
  removePieceFromMap,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom);
