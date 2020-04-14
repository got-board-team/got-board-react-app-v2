import * as types from "../actions/actionTypes";

export interface Match {
  id: number;
  name: string;
  playersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface MatchesState {
  isLoading: boolean;
  createdMatch: Match | null;
  data: Match[];
}

interface Payload {
  type: string;
  matches: Match[];
  match: Match;
  error: string;
}

const initialState: MatchesState = {
  isLoading: false,
  createdMatch: null,
  data: [],
};

export default (
  state = initialState,
  { type, matches, match, error }: Payload
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
    case types.CREATE_MATCH:
      return {
        ...state,
        isLoading: true,
        createdMatch: null,
      };
    case types.CREATE_MATCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        createdMatch: match,
        data: [...state.data, match],
      };
    case types.CREATE_MATCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    default:
      return state;
  }
};
