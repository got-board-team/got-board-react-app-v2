import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import Map from "./Map";
import Dropable from "./common/Dropable";
import WarRoom from './WarRoom';
import Combat from './Combat';
import { Locations, Houses, capitalizeName } from "../constants";
import { GameState } from "../reducers/game";
import { CurrentUserState } from "../reducers/currentUser";

const CurrentSelectedHouse = ({houseName}: {houseName: Houses}) => (<span className="ui__top-text">{capitalizeName(houseName)}</span>);

interface MatchProps {
  game: GameState;
  currentUser: CurrentUserState;
  match: any;
}

const Game = React.memo(({game, currentUser, match: { params: { id } } }: MatchProps) => {
  const [uiPanelsPositions, setUiPanelsPositions] = useState({
    "war-room": {x: 100, y: 80},
    "combat": {x: 700, y: 80},
  });

  const currentMatch = game.matches.find(m => m.id === parseInt(id));
  const currentPlayerHouse = currentMatch && currentMatch.houses.find(h => h.playerId === currentUser.id);

  const updateUiPanelPosition = (item: any, monitor: any) => {
    const newCoords = monitor.getDifferenceFromInitialOffset();
    if (newCoords && newCoords.x && newCoords.y) {
      const newX = newCoords.x + warRoomPosition.x;
      const newY = newCoords.y + warRoomPosition.y;
      const newPanelsPositions = {
        ...uiPanelsPositions,
        [item.type]: { x: newX, y: newY }
      };
      setUiPanelsPositions(newPanelsPositions);
    }
  }

  const warRoomPosition = uiPanelsPositions["war-room"];
  const combatPosition = uiPanelsPositions["combat"];

  return (
    <Dropable accept={[Locations.WAR_ROOM, Locations.COMBAT]} dropAction={updateUiPanelPosition} dropLocation="game">
      <section className="ui__top-bar">
        <Link to="/">Home</Link>
        <WarRoom x={warRoomPosition.x} y={warRoomPosition.y} />
        <Combat x={combatPosition.x} y={combatPosition.y} />
        {currentPlayerHouse && <CurrentSelectedHouse houseName={currentPlayerHouse.type} />}
      </section>
      <Map />
    </Dropable>
  );
});

const mapStateToProps = (state: any) => ({
  game: state.game,
  currentUser: state.currentUser,
});
export default connect(mapStateToProps)(Game);
