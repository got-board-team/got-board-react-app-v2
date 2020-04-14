import * as types from "../actions/actionTypes";
import { Match, Player } from "../models";

export interface CurrentMatchState {
  isLoading: boolean;
  attributes: Match | null;
  players: Player[];
  error: string | null;
}

interface Payload {
  type: string;
  attributes: Match;
  players: Player[];
  error: string | null;
}

const initialState: CurrentMatchState = {
  isLoading: false,
  attributes: null,
  players: [],
  error: null,
};

export default (
  state = initialState,
  { type, attributes, error }: Payload
) => {
  switch (type) {
    case types.GET_MATCH:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_MATCH_SUCCESS:
      return {
        ...state,
        isLoading: false,
        attributes,
      };
    case types.GET_MATCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    default:
      return state;
  }
};
