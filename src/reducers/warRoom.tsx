import * as types from "../actions/actionTypes";

export interface WarRoomState {
  isLoading: boolean;
  pieces: Array<any>;
  errorMessage: string;
}

const initialState: WarRoomState = {
  isLoading: false,
  pieces: [],
  errorMessage: "",
};

export default (
  state = initialState,
  { type, errorMessage, piece, pieces }: {type: string, errorMessage: string, pieces: Array<any>, piece: any}
) => {
  switch (type) {
    case types.ADD_PIECE_IN_WAR_ROOM_SUCCESS:
      const piecesWithNewPiece = [
        ...state.pieces,
        {
          ...piece,
          type: "piece",
        }
      ];
      return {
        ...state,
        isLoading: false,
        pieces: piecesWithNewPiece,
      };
    case types.UPDATE_PIECE_IN_WAR_ROOM_SUCCESS:
      const currentPiece = state.pieces.find(p => p.id === piece.id);
      const otherPieces = state.pieces.filter(p => p.id !== piece.id);

      const updatedPieces = [
        ...otherPieces,
        {
          ...currentPiece,
          x: piece.x,
          y: piece.y,
        },
      ];

      return {
        ...state,
        isLoading: false,
        pieces: updatedPieces,
      };
    default:
      return state;
  }
};
