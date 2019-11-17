import * as types from "./actionTypes";

const updateAction = () => ({
  type: types.UPDATE_WAR_ROOM,
});

const updateSuccessAction = () => ({
  type: types.UPDATE_WAR_ROOM_SUCCESS,
});

const updateErrorAction = (errorMessage: string) => ({
  type: types.UPDATE_WAR_ROOM_ERROR,
  errorMessage,
});

export const updateWarRoom = () => (dispatch: any) => {
  dispatch(updateAction());
};
