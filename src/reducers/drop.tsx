import * as types from "../actions/actionTypes";
import { Locations, Houses } from "../constants";
import { Drop } from "../models";

interface DropState {
  isLoading: boolean;
  drops: Drop[];
}

const initialState: DropState = {
  isLoading: false,
  drops: [],
};

export default (
  state = initialState,
  { type, drop, drops, error }: {type: string, drop: Drop, drops: Drop[], error: string}
) => {
  switch (type) {
    case types.RESET_COMBAT_SUCCESS:
      const dropsInCombat: Drop[] = state.drops.filter((p: Drop) => p.location === Locations.COMBAT)
      const resetedDrops: Drop[] = dropsInCombat.map(d => ({
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
          ...state.drops.filter((p: Drop) => p.location !== Locations.COMBAT),
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
          ...state.drops.filter((p: Drop) => p.id !== drop.id),
          {
            ...drop,
            spec: flippedSpec,
          },
        ],
      };
    case types.UPDATE_DROP_LOCATION_SUCCESS:
      console.log('reducer', types.UPDATE_DROP_LOCATION_SUCCESS)
      const computedSpec = {
        ...drop.spec,
        flipped: drop.location === Locations.COMBAT,
      };

      return {
        isLoading: false,
        drops: [
          ...state.drops.filter((p: Drop) => p.id !== drop.id),
          {
            ...drop,
            //@ts-ignore
            type: drop.piece_type,
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
          //@ts-ignore
          type: drop.piece_type,
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
