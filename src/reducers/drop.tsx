import * as types from "../actions/actionTypes";
import { Locations, Houses } from "../constants";
import { Piece } from "../models";

interface DropState {
  isLoading: boolean;
  drops: Piece[];
}

const initialState: DropState = {
  isLoading: false,
  drops: [],
};

export default (
  state = initialState,
  { type, drop }: {type: string, drop: Piece}
) => {
  switch (type) {
    case types.RESET_COMBAT_SUCCESS:
      const dropsInCombat: Piece[] = state.drops.filter((p: Piece) => p.location === Locations.COMBAT)
      const resetedDrops: Piece[] = dropsInCombat.map(d => ({
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
          ...state.drops.filter((p: Piece) => p.location !== Locations.COMBAT),
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
          ...state.drops.filter((p: Piece) => p.id !== drop.id),
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
          ...state.drops.filter((p: Piece) => p.id !== drop.id),
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
