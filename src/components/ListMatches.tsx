import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetMatches } from "../actions/matches";
import { Match } from "../reducers/matches";

const selectMatches = (state: any) => state.matches.data;

function ListMatches() {
  const matches: Match[] = useSelector(selectMatches);
  const [request, {loading, error}] = useGetMatches();

  useEffect(function getMatches() {
    request();
  }, []);

  return (
    <section className="list-matches">
      {matches && matches.map(match => <Link key={match.id} to={`matches/${match.id}`}>{match.name}</Link>)}
    </section>
  );
}

export default React.memo(ListMatches);
