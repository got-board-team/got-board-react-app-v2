import React from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { addPieceInWarRoom, updatePieceInWarRoom } from "../actions/warRoom";
import { removePieceFromMap } from "../actions/map";
import { Drop } from "../reducers/drop";

interface WarRoomProps {
  drops: Array<Drop>;
  x: number;
  y: number;
}

const WarRoom = React.memo(({x, y, drops}: WarRoomProps) => (
  <Dropable accept="piece" dropLocation="war-room">
    <Draggable id={0} type="war-room" x={x} y={y} location="game">
      <section className="war-room">
        {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} />)}
      </section>
    </Draggable>
  </Dropable>
));

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "war-room"),
});

const mapDispatchToProps = {
  addPieceInWarRoom,
  updatePieceInWarRoom,
  removePieceFromMap,
};

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom);
