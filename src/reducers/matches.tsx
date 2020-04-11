import * as types from "../actions/actionTypes";

export interface Match {
  id: number;
  name: string;
  players_count: number;
  createdAt: string;
  updatedAt: string;
}

export interface MatchesState {
  isLoading: boolean;
  data: Match[];
}

const initialState: MatchesState = {
  isLoading: false,
  data: [],
};

export default (
  state = initialState,
  { type, matches, error }: {type: string, matches: Match[], error: string}
) => {
  switch (type) {
    case types.GET_MATCHES:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_MATCHES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: matches,
      };
    case types.GET_MATCHES_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    default:
      return state;
  }
};
