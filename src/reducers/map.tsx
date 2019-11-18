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
  { type, errorMessage, pieces }: {type: string, errorMessage: string, pieces: Array<any>}
) => {
  switch (type) {
    case types.UPDATE_MAP:
      return {
        ...state,
        isLoading: true,
      };
    case types.UPDATE_MAP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        pieces: pieces,
      };
    case types.UPDATE_MAP_ERROR:
      return {
        ...state,
        isLoading: false,
        errorMessage,
      };
    default:
      return state;
  }
};
