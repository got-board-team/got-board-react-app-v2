import * as types from "./actionTypes";

const updateAction = () => ({
  type: types.UPDATE_WAR_ROOM,
});

const updateSuccessAction = (pieces: Array<any>) => ({
  type: types.UPDATE_WAR_ROOM_SUCCESS,
  pieces: pieces,
});

const updateErrorAction = (errorMessage: string) => ({
  type: types.UPDATE_WAR_ROOM_ERROR,
  errorMessage,
});

export const updateWarRoom = (pieces: Array<any>) => (dispatch: any) => {
  dispatch(updateAction());
  dispatch(updateSuccessAction(pieces));
};
