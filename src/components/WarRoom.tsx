import React, { useState} from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { Drop } from "../reducers/drop";
import { AllPieceKinds, Houses } from "../constants";

import "./WarRoom.scss";

interface WarRoomProps {
  drops: Drop[];
  x: number;
  y: number;
  currentPlayerHouse: Houses
}

const WarRoom = React.memo(({x, y, drops, currentPlayerHouse}: WarRoomProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  if (isVisible) {
    return (
      <Dropable accept={AllPieceKinds} dropLocation="war-room">
        <Draggable id={0} type="war-room" x={x} y={y} location="game" houseName={currentPlayerHouse} className="ui__panel war-room">
          <section className="war-room__actions">
            <button onClick={toggle}>Close</button>
          </section>

          <section className="war-room__inventory">
            {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} houseName={currentPlayerHouse} spec={drop.spec} />)}
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

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(WarRoom);
