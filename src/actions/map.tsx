import * as types from "./actionTypes";

const removePieceFromMapSuccessAction = (pieceId: number) => ({
  type: types.REMOVE_PIECE_FROM_MAP_SUCCESS,
  pieceId: pieceId,
});

export const removePieceFromMap = (pieceId: number) => (dispatch: any) => {
  dispatch(removePieceFromMapSuccessAction(pieceId));
};
