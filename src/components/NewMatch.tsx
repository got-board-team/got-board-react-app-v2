import React, { useState, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from 'react-redux'

import { createMatch } from "../actions/game";
import { Match, GameState } from "../reducers/game";

const DEFAULT_GAME_PRESET: Match = {
  id: null,
  name: "",
  playersCount: 3
};

interface Props {
  games: GameState;
  createMatch: (match: Match) => void;
}

const NewMatch = React.memo(({ games, createMatch }: Props) => {
  const [newGame, setNewGame] = useState(DEFAULT_GAME_PRESET);
  const [gameCreated, setGameCreate] = useState(false);

  const createNewGame = useCallback(() => {
    createMatch(newGame);
    setGameCreate(true);
  }, [newGame, createMatch]);

  if (gameCreated) {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <section>
        <h1>New Match</h1>
        <form>
          <fieldset>
            <input
              type="text"
              name="game-name"
              onChange={(e) => {
                setNewGame({
                  ...newGame,
                  name: e.target.value,
                })}
              } /><br />
            <select onChange={(e) => setNewGame({
              ...newGame,
              playersCount: parseInt(e.target.value),
            })}>
              <option value="3">3 Players</option>
              <option value="4">4 Players</option>
              <option value="5">5 Players</option>
              <option value="6">6 Players</option>
            </select><br />
          </fieldset>
          <input type="button" onClick={createNewGame} value="Create Game" />
        </form>
      </section>
    </section>
  );
});

const mapStateToProps = (state: any) => ({
  games: state.games,
});

const mapDispatchToProps = {
  createMatch,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewMatch);
