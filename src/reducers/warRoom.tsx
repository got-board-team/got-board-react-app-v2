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
  { type, errorMessage, pieces }: {type: string, errorMessage: string, pieces: Array<any>}
) => {
  switch (type) {
    case types.UPDATE_WAR_ROOM:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPDATE_WAR_ROOM_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pieces: pieces,
      };
    case types.UPDATE_WAR_ROOM_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage,
      };
    default:
      return state;
  }
};
