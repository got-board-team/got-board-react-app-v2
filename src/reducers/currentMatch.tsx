import * as types from "../actions/actionTypes";
import { Match, Player, JoinedPlayerAPIResponse } from "../models";
import { Houses } from "../constants";

export interface CurrentMatchState {
  isLoading: boolean;
  attributes: Match | null;
  players: Player[];
  error: string | null;
}

interface Payload {
  type: string;
  attributes: Match;
  newPlayer: JoinedPlayerAPIResponse;
  error: string | null;
}

const initialState: CurrentMatchState = {
  isLoading: false,
  attributes: null,
  // TODO: Remove mock.
  players: [
    {
      id: 2,
      house: Houses.STARK,
    },
    {
      id: null,
      house: Houses.BARATHEON,
    },
    {
      id: null,
      house: Houses.LANNISTER,
    },
  ],
  error: null,
};

export default (
  state = initialState,
  { type, attributes, error, newPlayer }: Payload
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
    case types.JOIN_MATCH_SUCCESS:
      const currentPlayers = state.players.filter(player => player.house !== newPlayer.house_name);

      return {
        ...state,
        players: [
          ...currentPlayers,
          {
            id: newPlayer.user_id,
            house: newPlayer.house_name as Houses
          }
        ],
      }
    case types.JOIN_MATCH_ERROR:
      return {
        ...state,
        error,
      }
    default:
      return state;
  }
};
