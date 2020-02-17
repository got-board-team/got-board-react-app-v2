import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { GameState, Match } from "../reducers/game";
import { CurrentUserState } from "../reducers/currentUser";
import { joinMatch } from "../actions/joinMatch";
import { Houses } from "../constants";

interface HomeProps {
  game: GameState;
  currentUser: CurrentUserState;
  joinMatch: (matchId: number, houseName: string, playerId: number) => void,
}

interface JoinMatchProps {
  match: Match;
  currentUserId: number;
  joinMatchAction: (matchId: number, houseName: string, playerId: number) => void,
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

const JoinMatch = React.memo(({match, currentUserId, joinMatchAction}: JoinMatchProps) => {
  const [hasSelectedHouse, setSelectedHouse] = useState(false);

  const showHouses = useCallback(() => {
    setSelectedHouse(!hasSelectedHouse);
  }, [hasSelectedHouse]);

  const selectHouse = useCallback((selectedMatchId, selectedHouseName) => {
    joinMatchAction(selectedMatchId, selectedHouseName, currentUserId);
  }, [match, currentUserId]);

  if (hasSelectedHouse) {
    return (
      <nav>
        <p>Join as:</p>
        {HousesModels(match.playersCount).map(house => <p><button onClick={event => selectHouse(match.id, house.name)}>{house.name}</button></p>)}
      </nav>
    );
  }

  return (<button onClick={showHouses}>Join match {match.name} ({match.playersCount} players)</button>);
  //return (<Link to={`/matches/${match.id}`}></Link>);
});

const Home = React.memo(({ game, currentUser, joinMatch }: HomeProps) => (
  <section>
    <nav>
      <Link to="/new-match">New Match</Link><br />
      {game && game.matches.map(match => match && match.id && (
        <div key={match.id}>
          <JoinMatch match={match} joinMatchAction={joinMatch} currentUserId={currentUser.id} />
        </div>
      ))}
    </nav>
  </section>
));

const mapStateToProps = (state: any) => ({
  game: state.game,
  currentUser: state.currentUser,
});

const mapActionToProps = {
  joinMatch,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
