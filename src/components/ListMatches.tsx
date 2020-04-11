import React, { useEffect } from "react";
//import { Link, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetMatches } from "../actions/matches";
import { Match, MatchesState } from "../reducers/matches";

const selectMatches = (state: any) => state.matches.data;

function ListMatches() {
  const matches: Match[] = useSelector(selectMatches);
  const [request, {loading, error}] = useGetMatches();

  useEffect(function getMatches() {
    request();
  }, []);

  return (
    <section className="list-matches">
      {matches && matches.map(match => <div key={match.id}>{match.name}</div>)}
    </section>
  );
}

export default React.memo(ListMatches);
