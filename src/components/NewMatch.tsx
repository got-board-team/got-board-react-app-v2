import React, { useState, useCallback } from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { Match } from "../models";
import { useCreateMatch } from "../actions/matches";
import { selectCreatedMatch } from "../selectors";
import MainNav from "./MainNav";

const DEFAULT_GAME_PRESET: Match = {
  id: -1,
  name: "",
  players_count: 3,
  created_at: "",
  updated_at: "",
};

function NewMatch() {
  const [newMatch, setNewMatch] = useState(DEFAULT_GAME_PRESET);
  const [createMatchRequest, {loading, error}] = useCreateMatch(newMatch.name, newMatch.players_count);
  const createdMatch: Match = useSelector(selectCreatedMatch);

  const createNewMatch = useCallback(() => {
    createMatchRequest();
  }, [createMatchRequest, error, loading]);

  if (createdMatch) {
    return <Redirect to={`matches/${createdMatch.id}`} />;
  }

  return (
    <>
      <MainNav />
      <section className="page__content">
        <h1>New Match</h1>
        <form>
          {error && <p>{error}</p>}
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
              players_count: parseInt(e.target.value),
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
