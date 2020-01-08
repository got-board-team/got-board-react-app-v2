import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { Match, GameState } from "../reducers/game";

interface HomeProps {
  game: GameState;
}

const Home = React.memo(({ game }: HomeProps) => (
  <section>
    <nav>
      <Link to="/new-match">New Match</Link><br />
      {game && game.matches.map(match => (
        <p key={match && match.id ? match.id : 0}>
          <Link to={`/matches/${match.id}`}>Match {match.name} ({match.playersCount} players)</Link>
        </p>
      ))}
    </nav>
  </section>
));

const mapStateToProps = (state: any) => ({
  game: state.game,
})

export default connect(mapStateToProps)(Home);
