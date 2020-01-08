import * as types from "../actions/actionTypes";

export interface GameState {
  isLoading: boolean;
  matches: Match[];
}

export interface Match {
  id: number | null;
  name: string;
  playersCount: number;
}

const initialState: GameState = {
  isLoading: false,
  matches: [
    {
      id: 1,
      name: "Lets start",
      playersCount: 3,
    }
  ],
};

export default (
  state = initialState,
  { type, match }: {type: string, match: Match}
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
    default:
      return state;
  }
};
