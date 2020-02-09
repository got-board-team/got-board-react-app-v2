import * as types from "../actions/actionTypes";
import * as houses from "../houses";

export interface GameState {
  isLoading: boolean;
  matches: Match[];
}

interface JoinMatchAttr {
  id: number;
  playerId: number;
  houseId: number;
}

interface GameAction {
  newMatch: Match;
  joinMatch: JoinMatchAttr;
}

interface House {
  type: string;
  playerId: number;
}

export interface Match {
  id: number | null;
  name: string;
  playersCount: number;
  houses: House[];
}

const initialState: GameState = {
  isLoading: false,
  matches: [
    {
      id: 1,
      name: "Lets start",
      playersCount: 3,
      houses: [
        {
          type: houses.BARATHEON,
          playerId: 2,
        }
      ],
    }
  ],
};

export default (
  state = initialState,
  { type, action }: {type: string, action: GameAction}
) => {
  switch (type) {
    case types.NEW_GAME:
      return {
        ...state,
        isLoading: true,
      };
    case types.NEW_GAME_SUCCESS:
      const newGame: Match = {
        id: state.matches.length + 1,
        name: match.name,
        playersCount: match.playersCount,
        houses: [],
      };
      const updatedGames = [
        ...state.matches,
        newGame,
      ];

      return {
        ...state,
        isLoading: false,
        matches: updatedGames,
      };
    case types.JOIN_MATCH_SUCCESS:
      const otherMatches = state.matches.filter(m => m.id !== match.id);
      const currentMatch = state.matches.find(m => m.id === match.id);
      console.log("-----");
      console.log(match);
      console.log("-----");

      return {
        ...state,
        isLoading: false,
        matches: [],//[...otherMatches, currentMatch],
      };
    default:
      return state;
  }
};
