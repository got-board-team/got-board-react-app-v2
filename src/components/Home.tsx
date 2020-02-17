import React, { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'

import { GameState, Match, House } from "../reducers/game";
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
  joinMatchAction: (selectedMatchId: number, selectedHouseName: Houses) => void,
}

// TODO: Extract to a model file
const threePlayersMatch: House[] = [
  { type: Houses.BARATHEON, playerId: null },
  { type: Houses.LANNISTER, playerId: null },
  { type: Houses.STARK, playerId: null },
];

const fourPlayersMatch: House[] = [
  ...threePlayersMatch,
  { type: Houses.MARTELL, playerId: null },
];

const fivePlayersMatch: House[] = [
  ...fourPlayersMatch,
  { type: Houses.GREYJOY, playerId: null },
];

const sixPlayersMatch: House[] = [
  ...fivePlayersMatch,
  { type: Houses.TYRELL, playerId: null },
];

const HousesModels = (playerCount: number): House[] => {
  switch (playerCount) {
    case 3:
      return threePlayersMatch;
    case 4:
      return fourPlayersMatch;
    case 5:
      return fivePlayersMatch;
    case 6:
      return sixPlayersMatch;
    default:
      return [];
  }
}

const JoinMatch = React.memo(({match, currentUserId, joinMatchAction}: JoinMatchProps) => {
  const [hasSelectedHouse, setSelectedHouse] = useState(false);

  const showHouses = useCallback(() => {
    setSelectedHouse(!hasSelectedHouse);
  }, [hasSelectedHouse]);

  const hasJoinedMatch: boolean = !!(match.houses.find(house => house.playerId === currentUserId));

  if (hasJoinedMatch) {
    return (<p><Link to={`/matches/${match.id}`}>Return to match {match.name} ({match.playersCount} players)</Link></p>);
  }

  if (hasSelectedHouse) {
    const joinableHouses = HousesModels(match.playersCount).filter(house => !match.houses.map(h => h.type).includes(house.type));

    return (
      <nav>
        <p>Join as:</p>
        {joinableHouses.map(house => <p key={house.type}><button onClick={event => joinMatchAction(match.id, house.type)}>{house.type}</button></p>)}
      </nav>
    );
  }

  return (<p><button onClick={showHouses}>Join match {match.name} ({match.playersCount} players)</button></p>);
});

const Home = React.memo(({ game, currentUser, joinMatch }: HomeProps) => {
  const joinMatchAction = useCallback((selectedMatchId, selectedHouseName) => {
    joinMatch(selectedMatchId, selectedHouseName, currentUser.id);
  }, [currentUser, joinMatch]);

  return (
    <section>
      <nav>
        <Link to="/new-match">New Match</Link><br />
        {game && game.matches.map(match => <JoinMatch match={match} joinMatchAction={joinMatchAction} currentUserId={currentUser.id} />)}
      </nav>
    </section>
  );
});

const mapStateToProps = (state: any) => ({
  game: state.game,
  currentUser: state.currentUser,
});

const mapActionToProps = {
  joinMatch,
};

export default connect(mapStateToProps, mapActionToProps)(Home);
