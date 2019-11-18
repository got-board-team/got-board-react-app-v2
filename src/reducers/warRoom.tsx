import * as types from "../actions/actionTypes";

interface WarRoomState {
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
