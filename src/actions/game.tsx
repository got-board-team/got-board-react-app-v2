import * as types from "./actionTypes";
import { Match } from "../reducers/game";

const newGameAction = () => ({
  type: types.NEW_GAME,
  isLoading: true,
});

const newGameSuccessAction = (match: Match) => ({
  type: types.NEW_GAME_SUCCESS,
  isLoading: false,
  match,
});

export const createMatch = (match: Match) => (dispatch: any) => {
  dispatch(newGameAction());
  dispatch(newGameSuccessAction(match));
}
