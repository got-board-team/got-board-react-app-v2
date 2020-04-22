import React from 'react';
import { Link } from "react-router-dom";

import { Houses, capitalizeName } from "../constants";
import WarRoom from './WarRoom';
import Combat from './Combat';

interface uiDraggable {
  x: number;
  y: number;
}

interface Props {
  warRoomPosition: uiDraggable;
  combatPosition: uiDraggable;
  currentPlayerHouse: Houses;
}

function CurrentSelectedHouse({houseName}: {houseName: Houses}) {
  return (<span className="ui__top-text">{capitalizeName(houseName)}</span>);
};

function MatchTopNavigation({warRoomPosition, combatPosition, currentPlayerHouse}: Props) {
  return (
    <section className="ui__top-bar">
      <Link to="/">Home</Link>
      <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} currentPlayerHouse={currentPlayerHouse} />
      <Combat x={combatPosition.x} y={combatPosition.y} currentPlayerHouse={currentPlayerHouse} />
      <CurrentSelectedHouse houseName={currentPlayerHouse} />
    </section>
  );
}

export default React.memo(MatchTopNavigation);
