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
  { type, drop }: {type: string, drop: Drop}
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
            id: drop.id,
            type: drop.type,
            location: drop.location,
            x: drop.x,
            y: drop.y,
            houseName: drop.houseName,
            spec: computedSpec,
          },
        ],
      };
    default:
      return state;
  }
};
