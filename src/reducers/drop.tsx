import * as types from "../actions/actionTypes";
import { Locations } from "../constants";
import { DropResponse } from "../models";

interface DropState {
  isLoading: boolean;
  drops: DropResponse[];
}

const initialState: DropState = {
  isLoading: false,
  drops: [],
};

export default (
  state = initialState,
  { type, drop, drops, error }: {type: string, drop: DropResponse, drops: DropResponse[], error: string}
) => {
  switch (type) {
    case types.RESET_COMBAT_SUCCESS:
      const dropsInCombat: DropResponse[] = state.drops.filter((p: DropResponse) => p.location === Locations.COMBAT)
      const resetedDrops: DropResponse[] = dropsInCombat.map(d => ({
        ...d,
        location: Locations.WAR_ROOM,
        spec: {
          ...d.spec,
          flipped: false,
        }
      }));

      return {
        isLoading: false,
        drops: [
          ...state.drops.filter((p: DropResponse) => p.location !== Locations.COMBAT),
          ...resetedDrops,
        ],
      };
    case types.UPDATE_DROP_REVEAL_COMBAT_SUCCESS:
      const flippedSpec = {
        ...drop.spec,
        flipped: false,
      };

      return {
        isLoading: false,
        drops: [
          ...state.drops.filter((p: DropResponse) => p.id !== drop.id),
          {
            ...drop,
            spec: flippedSpec,
          },
        ],
      };
    case types.UPDATE_DROP_LOCATION_SUCCESS:
      console.log('reducer', types.UPDATE_DROP_LOCATION_SUCCESS);
      console.log(drop);
      // TODO: This drop is type Drop so not compatible. To be a DropResponse
      // the action object should come from the API response
      const computedSpec = {
        ...drop.spec,
        flipped: drop.location === Locations.COMBAT,
      };

      return {
        isLoading: false,
        drops: [
          ...state.drops.filter((p: DropResponse) => p.id !== drop.id),
          {
            ...drop,
            type: drop.piece_type,
            houseName: drop.house_name,
          },
        ],
      };
    case types.GET_PIECES:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_PIECES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        drops: drops.map(drop => ({
          ...drop,
          type: drop.piece_type,
          houseName: drop.house_name,
        })),
      };
    case types.GET_PIECES_ERROR:
      return {
        ...state,
        isLoading: false,
        error,
      };
    default:
      return state;
  }
};
