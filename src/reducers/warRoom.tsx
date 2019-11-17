import * as types from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  pieces: [],
  errorMessage: "",
};

export default (
  state = initialState,
  { type, errorMessage, pieces }: {string, string, Array}
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
        errorMessage: "Could not update war room",
      };
    default:
      return state;
  }
};
