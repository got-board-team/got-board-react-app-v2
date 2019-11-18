import * as types from "../actions/actionTypes";

export interface WarRoomState {
  isLoading: boolean;
  pieces: Array<any>;
  errorMessage: string;
}

const initialState: WarRoomState = {
  isLoading: false,
  pieces: [
    { id: 1, type: "piece", x: 100, y: 100 },
    { id: 2, type: "piece", x: 150, y: 100 },
    { id: 3, type: "piece", x: 200, y: 100 },
    { id: 4, type: "piece", x: 250, y: 100 },
    { id: 5, type: "piece", x: 300, y: 100 },
  ],
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
