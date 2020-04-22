import React from 'react';

import { Player } from "../models";
import { useJoinMatch } from "../actions/matches";

interface Props {
  currentMatchId: number;
  currentUserId: number;
  players: Player[];
}

function JoinMatch({currentMatchId, currentUserId, players}: Props) {
  const [joinMatchRequest, { loading }] = useJoinMatch(currentMatchId, currentUserId);

  return (
    <section className="ui__panel ui__panel--centralized">
      <h3>Select one of the available houses</h3>
      <nav>
        {players.map(player => (
          <div key={player.house}>
            <button disabled={loading || !!player.id} onClick={() => joinMatchRequest(player.house)}>{loading ? "Joining..." : player.house}</button>
          </div>
        ))}
      </nav>
    </section>
  );
}

export default JoinMatch;
