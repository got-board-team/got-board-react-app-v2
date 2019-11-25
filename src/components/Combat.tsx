import React, { useState} from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { Drop } from "../reducers/drop";
import { AllPieceKinds } from "../constants";

import "./Combat.scss";

interface CombatProps {
  drops: Array<Drop>;
  x: number;
  y: number;
}

// TODO: To be implemented
const currentPlayerHouse = "baratheon";

const Combat = React.memo(({x, y, drops}: CombatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = () => setIsVisible(!isVisible);

  if (isVisible) {
    return (
      <Dropable accept={AllPieceKinds} dropLocation="combat">
        <Draggable id={0} type="combat" x={x} y={y} location="game" houseName={currentPlayerHouse} className="ui__panel combat">
          <section className="combat__actions">
            <button onClick={toggle}>Close</button>
          </section>

          <section className="combat__inventory">
            {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} type={drop.type} location={drop.location} houseName={currentPlayerHouse} />)}
          </section>
        </Draggable>
      </Dropable>
    );
  }

  return <button onClick={toggle} className="ui__action">Combat</button>;
});

const mapStateToProps = (state: any) => ({
  drops: state.drop.drops.filter((drop: Drop) => drop.location === "combat"),
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
