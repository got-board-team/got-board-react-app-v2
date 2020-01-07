import React, { useState, useCallback } from "react";
import { Link, Redirect } from "react-router-dom";

const DEFAULT_GAME_PRESET = {
  gameName: "",
  playersCount: 3
};

const NewGame = React.memo(() => {
  const [newGame, setNewGame] = useState(DEFAULT_GAME_PRESET);
  const [gameCreated, setGameCreate] = useState(false);

  const createGame = useCallback(() => {
    console.log("Set new game to redux", newGame);
    setGameCreate(true);
  }, [newGame]);

  if (gameCreated) {
    return <Redirect to="/" />;
  }

  return (
    <section>
      <nav>
        <Link to="/">Home</Link>
      </nav>

      <section>
        <h1>New Game</h1>
        <form>
          <fieldset>
            <input
              type="text"
              name="game-name"
              onChange={(e) => {
                setNewGame({
                  ...newGame,
                  gameName: e.target.value,
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
          <input type="button" onClick={createGame} value="Create Game" />
        </form>
      </section>
    </section>
  );
});

export default NewGame;
