import * as types from "./actionTypes";

const joinMatchSuccessAction = (matchId: number, houseId: number, playerId: number) => ({
  type: types.JOIN_MATCH_SUCCESS,
  match,
});

export const joinMatch = (matchId: number, houseId: number, playerId: number) => (dispatch: any) => {
  dispatch(joinMatchSuccessAction(matchId, houseId, playerId));
}
