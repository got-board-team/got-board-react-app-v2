import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { GameState } from "../reducers/game";
import { CurrentUserState } from "../reducers/currentUser";
import { joinMatch } from "../actions/joinMatch";
import { Houses } from "../constants";

interface HomeProps {
  game: GameState;
  currentUser: CurrentUserState;
  mapActionToProps: () => void,
}

interface JoinMatchProps {
  matchId: number;
  playerCount: number;
  currentUserId: number;
  joinMatchAction: (matchId: number, houseId: number, playerId: number) => void,
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

const JoinMatch = React.memo(({matchId, playerCount, currentUserId, joinMatchAction}: JoinMatchProps) => {
  const selectHouse = useCallback((selectedMatchId, selectedHouseId) => {
    console.log(`selected ${selectedMatchId} : ${selectedHouseId}`);
    joinMatchAction(selectedMatchId, selectedHouseId, currentUserId);
  }, []);

  return (
    <nav>
      <p>Join as:</p>
      {HousesModels(playerCount).map(house => <p><button onClick={event => selectHouse(matchId, house.id)}>{house.name}</button></p>)}
    </nav>
  );
});

const Home = React.memo(({ game, currentUser }: HomeProps) => (
  <section>
    <nav>
      <Link to="/new-match">New Match</Link><br />
      {game && game.matches.map(match => match && match.id && (
        <p key={match.id}>
          <Link to={`/matches/${match.id}`}>Match {match.name} ({match.playersCount} players)</Link>
          <JoinMatch matchId={match.id} playerCount={match.playersCount} joinMatchAction={joinMatch} currentUserId={currentUser.id} />
          <hr />
        </p>
      ))}
    </nav>
  </section>
));

const mapStateToProps = (state: any) => ({
  game: state.game,
  currentUser: state.currentUser,
});

const mapActionToProps = () => ({
  joinMatch,
});

export default connect(mapStateToProps, mapActionToProps)(Home);
