import * as types from "../actions/actionTypes";

export interface MapState {
  isLoading: boolean;
  pieces: Array<any>;
  errorMessage: string;
}

const initialState: MapState = {
  isLoading: false,
  pieces: [],
  errorMessage: "",
};

export default (
  state = initialState,
  { type, errorMessage, pieceId }: {type: string, errorMessage: string, pieceId: number}
) => {
  switch (type) {
    case types.REMOVE_PIECE_FROM_MAP_SUCCESS:
      const updatedPieces = state.pieces.filter(p => p.id !== pieceId);

      return {
        ...state,
        pieces: updatedPieces,
      };
    default:
      return state;
  }
};
