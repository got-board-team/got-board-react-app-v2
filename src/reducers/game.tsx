import * as types from "../actions/actionTypes";
import * as houses from "../houses";

export interface GameState {
  isLoading: boolean;
  matches: Match[];
}

interface JoinMatchAttr {
  id: number;
  playerId: number;
  houseName: string;
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
        name: action.newMatch.name,
        playersCount: action.newMatch.playersCount,
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
      const otherMatches = state.matches.filter(m => m.id !== action.joinMatch.id);
      const currentMatch = state.matches.find(m => m.id === action.joinMatch.id);

      console.log(action.joinMatch);
      console.log(otherMatches);
      console.log(currentMatch);

      if (!currentMatch) {
        return {
          ...state,
          isLoading: false,
          matches: [],
        };
      }

      console.log('kasjlkasjla')

      const currentHouses = currentMatch.houses;
      const updatedMatch = {
        ...currentMatch,
        houses: [
          ...currentHouses,
          {
            type: action.joinMatch.houseName,
            playerId: action.joinMatch.playerId,
          }
        ]
      }

      return {
        ...state,
        isLoading: false,
        matches: [...otherMatches, updatedMatch],
      };
    default:
      return state;
  }
};
