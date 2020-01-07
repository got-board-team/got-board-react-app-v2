import * as types from "../actions/actionTypes";

interface GameState {
  isLoading: boolean;
  games: Game[];
}

interface Game {
  id: number;
  name: string;
  playersCount: number;
}

const initialState: GameState = {
  isLoading: false,
  games: [],
};

export default (
  state = initialState,
  { type, game }: {type: string, game: Game}
) => {
  switch (type) {
    case types.NEW_GAME:
      return {
        ...state,
        isLoading: true,
      };
    case types.NEW_GAME_SUCCESS:
      const newGame: Game = {
        id: state.games.length + 2,
        name: game.name,
        playersCount: game.playersCount,
      };
      const updatedGames = [
        ...state.games,
        newGame,
      ];

      return {
        ...state,
        isLoading: false,
        games: updatedGames,
      };
    default:
      return state;
  }
};
