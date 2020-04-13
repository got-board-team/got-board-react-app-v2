import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";

import { Match } from "../reducers/matches";
import { useCreateMatch } from "../actions/matches";
import MainNav from "./MainNav";

const DEFAULT_GAME_PRESET: Match = {
  id: -1,
  name: "",
  playersCount: 3,
  createdAt: "",
  updatedAt: "",
};

function NewMatch() {
  const [newMatch, setNewMatch] = useState(DEFAULT_GAME_PRESET);
  const [matchCreated, setMatchCreated] = useState(false);
  const [createMatchRequest, {loading, error}] = useCreateMatch(newMatch.name, newMatch.playersCount);

  const createNewMatch = useCallback(() => {
    createMatchRequest();
    // TODO: If error it's not stoping here. Concurrency issue.
    if (!loading && !error) {
      setMatchCreated(true);
    }
  }, [createMatchRequest, error, loading]);

  if (matchCreated) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <MainNav />
      <section className="page__content">
        <h1>New Match</h1>
        <form>
          {error && <p>{JSON.stringify(error)}</p>}
          <fieldset>
            <input
              type="text"
              name="game-name"
              onChange={(e) => {
                setNewMatch({
                  ...newMatch,
                  name: e.target.value,
                })}
              } /><br />
            <select onChange={(e) => setNewMatch({
              ...newMatch,
              playersCount: parseInt(e.target.value),
            })}>
              <option value="3">3 Players</option>
              <option value="4">4 Players</option>
              <option value="5">5 Players</option>
              <option value="6">6 Players</option>
            </select><br />
          </fieldset>
          <input type="button" onClick={createNewMatch} value="Create Game" disabled={loading} />
        </form>
      </section>
    </>
  );
};

export default React.memo(NewMatch);
