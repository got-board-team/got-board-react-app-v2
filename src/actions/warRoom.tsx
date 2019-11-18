import * as types from "./actionTypes";

const addPieceSuccessAction = (piece: any) => ({
  type: types.ADD_PIECE_IN_WAR_ROOM_SUCCESS,
  piece: piece,
});

export const addPieceInWarRoom = (piece: any) => (dispatch: any) => {
  dispatch(addPieceSuccessAction(piece));
};

const updatePieceSuccessAction = (piece: any) => ({
  type: types.UPDATE_PIECE_IN_WAR_ROOM_SUCCESS,
  piece: piece,
});

export const updatePieceInWarRoom = (piece: any) => (dispatch: any) => {
  dispatch(updatePieceSuccessAction(piece));
};
