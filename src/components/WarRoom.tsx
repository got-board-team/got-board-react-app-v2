import React, { useState} from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { addPieceInWarRoom, updatePieceInWarRoom } from "../actions/warRoom";
import { removePieceFromMap } from "../actions/map";
import { Drop } from "../reducers/drop";
import { AllPieceKinds } from "../constants";

import "./WarRoom.scss";

interface WarRoomProps {
  drops: Array<Drop>;
  x: number;
  y: number;
}

// TODO: To be implemented
const currentPlayerHouse = "baratheon";

const WarRoom = React.memo(({x, y, drops}: WarRoomProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  if (isVisible) {
    return (
      <Dropable accept={AllPieceKinds} dropLocation="war-room">
        <Draggable id={0} type="war-room" x={x} y={y} location="game" houseName={currentPlayerHouse} className="war-room">
          <section className="war-room__actions">
            <button onClick={toggle}>Close</button>
          </section>

          <section className="war-room__inventory">
            {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} houseName={currentPlayerHouse} />)}
          </section>
        </Draggable>
      </Dropable>
    );
  }

  return <button onClick={toggle} className="ui__action">War room</button>;
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
