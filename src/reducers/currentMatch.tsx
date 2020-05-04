import * as types from "../actions/actionTypes";
import { Player, PlayerAPIResponse, getHousesModels } from "../models";
import { Houses } from "../constants";

export interface CurrentMatchState {
  isLoading: boolean;
  error: string | null;
  id?: number;
  name?: string;
  players?: Player[];
  players_count?: number;
}

interface Payload {
  type: string;
  id: number;
  name: string;
  players_count: number;
  created_at: string;
  updated_at: string;
  players: PlayerAPIResponse[];
  newPlayer: PlayerAPIResponse;
  error: string | null;
}

const initialState: CurrentMatchState = {
  isLoading: false,
  error: null,
};

// TODO: Move this logic to the API
function fillMatchSlots(players_count: number, players: PlayerAPIResponse[]) {
  const matchSetup = getHousesModels(players_count);

  if (players.length === 0) {
    return matchSetup;
  }

  let computedPlayers: Player[] = [];

  matchSetup.forEach(slot => {
    const player = players.find(p => p.house_name.toLowerCase() === slot.house);
    if (player) {
      computedPlayers.push({
        id: player.user_id,
        house: player.house_name as Houses
      });
      return;
    }

    computedPlayers.push(slot);
  });

  return computedPlayers;
}

export default (
  state = initialState,
  { type, id, name, players_count, players, created_at, updated_at, error, newPlayer }: Payload
) => {
  switch (type) {
    case types.GET_MATCH:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_MATCH_SUCCESS:
      const p = fillMatchSlots(players_count, players);

      return {
        ...state,
        isLoading: false,
        id,
        name,
        players_count,
        created_at,
        updated_at,
        players: p
      };
    case types.GET_MATCH_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    case types.JOIN_MATCH_SUCCESS:
      const currentPlayers = state.players ? state.players.filter(player => player.house !== newPlayer.house_name) : [];

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
