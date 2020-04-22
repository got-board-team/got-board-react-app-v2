import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { useGetMatches } from "../actions/matches";
import { Match } from "../models";
import { selectMatches } from "../selectors";

function ListMatches() {
  const matches: Match[] = useSelector(selectMatches);
  const [request, {loading, error}] = useGetMatches();

  useEffect(function getMatches() {
    request();
  }, []);

  return (
    <section>
      {loading && <p>Loading...</p>}
      {matches && matches.map(match => <div key={match.id}><Link to={`matches/${match.id}`}>{match.name}</Link></div>)}
    </section>
  );
}

export default React.memo(ListMatches);
