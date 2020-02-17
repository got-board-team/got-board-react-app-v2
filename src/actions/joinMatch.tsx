import * as types from "./actionTypes";

const joinMatchSuccessAction = (matchId: number, houseName: string, playerId: number) => ({
  type: types.JOIN_MATCH_SUCCESS,
  action: {
    joinMatch: {
      id: matchId,
      playerId,
      houseName,
    },
  },
});

export const joinMatch = (matchId: number, houseName: string, playerId: number) => (dispatch: any) => {
  dispatch(joinMatchSuccessAction(matchId, houseName, playerId));
}
