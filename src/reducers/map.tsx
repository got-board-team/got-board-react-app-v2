import * as types from "../actions/actionTypes";

export interface MapState {
  isLoading: boolean;
  pieces: Array<any>;
  errorMessage: string;
}

const initialState: MapState = {
  isLoading: false,
  pieces: [
    { id: 6, type: "piece", x: 100, y: 100 },
    { id: 7, type: "piece", x: 150, y: 100 },
  ],
  errorMessage: "",
};

export default (
  state = initialState,
  { type, errorMessage, pieceId }: {type: string, errorMessage: string, pieceId: number}
) => {
  switch (type) {
    case types.REMOVE_PIECE_FROM_MAP_SUCCESS:
      const updatedPieces = state.pieces.filter(p => p.id === pieceId);

      return {
        ...state,
        pieces: updatedPieces,
      };
    default:
      return state;
  }
};
