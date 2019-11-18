import * as types from "./actionTypes";

const updateAction = () => ({
  type: types.UPDATE_MAP,
});

const updateSuccessAction = (pieces: Array<any>) => ({
  type: types.UPDATE_MAP_SUCCESS,
  pieces: pieces,
});

const updateErrorAction = (errorMessage: string) => ({
  type: types.UPDATE_MAP_ERROR,
  errorMessage,
});

export const updateMap = (pieces: Array<any>) => (dispatch: any) => {
  dispatch(updateAction());
  dispatch(updateSuccessAction(pieces));
};
