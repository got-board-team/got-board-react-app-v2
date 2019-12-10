import React, { useState} from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { Drop } from "../reducers/drop";
import { User } from "../reducers/currentUser";
import { AllPieceKinds } from "../constants";

import "./Combat.scss";

interface CombatProps {
  currentUser: User;
  drops: Array<Drop>;
  x: number;
  y: number;
}

const Combat = React.memo(({x, y, drops, currentUser}: CombatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  if (isVisible) {
    return (
      <Dropable accept={AllPieceKinds} dropLocation="combat">
        <Draggable id={0} type="combat" x={x} y={y} location="game" className="ui__panel combat">
          <section className="combat__actions">
            <button onClick={toggle}>Close</button>
          </section>

          <section className="combat__inventory">
            {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} houseName={drop.houseName} spec={{...drop.spec, flipped: drop.houseName !== currentUser.houseName}} />)}
          </section>
        </Draggable>
      </Dropable>
    );
  }

  return <button onClick={toggle} className="ui__action">Combat</button>;
});

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "combat"),
  currentUser: state.currentUser,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
