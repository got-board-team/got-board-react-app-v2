import React from 'react';
import { connect } from 'react-redux'

import Piece, { PieceProps } from './Piece';
import Draggable from './Draggable';
import Dropable from "./Dropable";
import { updateWarRoom } from "./actions/warRoom";

interface WarRoomProps {
  pieces: Array<any>;
  updateWarRoom: (pieces: Array<any>) => void;
  x: number;
  y: number;
}

const WarRoom = React.memo(({x, y, pieces, updateWarRoom}: WarRoomProps) => {
  const updatePiecePosition = (item: any, monitor: any) => {
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
      updateWarRoom(final);
    }
  }

  return (
    <Dropable accept="piece" dropAction={updatePiecePosition}>
      <Draggable id={0} type="war-room" x={x} y={y}>
        <section className="war-room">
          {pieces.map((piece, index) => <Piece key={index} id={piece.id} x={piece.x} y={piece.y} type="piece" />)}
        </section>
      </Draggable>
    </Dropable>
  );
});

const mapStateToProps = (state: any) => ({
  pieces: state.warRoom.pieces,
});

const mapDispatchToProps = {
  updateWarRoom,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom);
