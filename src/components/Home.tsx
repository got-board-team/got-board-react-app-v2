import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { GameState } from "../reducers/game";
import { Houses } from "../constants";

interface HomeProps {
  game: GameState;
  history: any;
}

interface JoinMatchProps {
  matchId: number;
  playerCount: number;
  history: any;
}

// TODO: Extract to a model file
const ThreePlayerHouses = [
  { id: 1, name: Houses.BARATHEON },
  { id: 2, name: Houses.LANNISTER },
  { id: 3, name: Houses.STARK },
];

const HousesModels = (playerCount: number) => {
  switch (playerCount) {
    case 3:
      return ThreePlayerHouses;
    case 4:
      return [
        ...ThreePlayerHouses,
        { id: 4, name: Houses.MARTELL },
      ];
    case 5:
      return [
        ...ThreePlayerHouses,
        { id: 4, name: Houses.MARTELL },
        { id: 5, name: Houses.GREYJOY },
      ];
    case 6:
      return [
        ...ThreePlayerHouses,
        { id: 4, name: Houses.MARTELL },
        { id: 5, name: Houses.GREYJOY },
        { id: 6, name: Houses.TYRELL },
      ];
    default:
      return [];
  }
}

const JoinMatch = React.memo(({matchId, playerCount, history}: JoinMatchProps) => {
  const selectHouse = useCallback((selectedMatchId, selectedHouseId) => {
    history.push(`/matches/${selectedMatchId}`);
  }, []);

  return (
    <nav>
      <p>Join as:</p>
      {HousesModels(playerCount).map(house => <p><button onClick={event => selectHouse(matchId, house.id)}>{house.name}</button></p>)}
    </nav>
  );
});

const Home = React.memo(({ game, history }: HomeProps) => (
  <section>
    <nav>
      <Link to="/new-match">New Match</Link><br />
      {game && game.matches.map(match => match && match.id && (
        <p key={match.id}>
          <Link to={`/matches/${match.id}`}>Match {match.name} ({match.playersCount} players)</Link>
          <JoinMatch matchId={match.id} playerCount={match.playersCount} history={history} />
          <hr />
        </p>
      ))}
    </nav>
  </section>
));

const mapStateToProps = (state: any) => ({
  game: state.game,
})

export default connect(mapStateToProps)(Home);
