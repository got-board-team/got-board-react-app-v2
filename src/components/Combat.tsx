import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux'

import Piece from './Piece';
import Draggable from './common/Draggable';
import Dropable from "./common/Dropable";
import { Drop } from "../models";
import { AllPieceKinds, Houses } from "../constants";
import { revealCards, resetCombat } from "../actions/drop";

import "./Combat.scss";

interface CombatProps {
  currentPlayerHouse: Houses;
  drops: Drop[];
  x: number;
  y: number;
  revealCards: (drops: Drop[]) => void;
  resetCombat: () => void;
}

const Combat = React.memo(({x, y, drops, currentPlayerHouse, revealCards, resetCombat}: CombatProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggle = useCallback(() => {
    setIsVisible(!isVisible);
    if (isVisible) {
      resetCombat();
    }
  }, [isVisible, resetCombat]);
  const reveal = useCallback(() => {
    revealCards(drops);
  }, [drops, revealCards]);

  if (isVisible) {
    return (
      <Dropable accept={AllPieceKinds} dropLocation="combat">
        <Draggable id={0} piece_type="combat" x={x} y={y} location="game" className="ui__panel combat">
          <section className="combat__actions">
            <button onClick={toggle}>Close</button>
            <button onClick={reveal}>Reveal</button>
          </section>

          <section className="combat__inventory">
            {drops.map((drop, index) => <Piece key={index} id={drop.id} x={drop.x} y={drop.y} piece_type={drop.piece_type} location={drop.location} houseName={drop.houseName} spec={{...drop.spec, flipped: (drop.houseName && (drop.houseName !== currentPlayerHouse)) && (drop && drop.spec && drop.spec.flipped)}} />)}
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

const mapDispatchToProps = {
  revealCards,
  resetCombat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Combat);
