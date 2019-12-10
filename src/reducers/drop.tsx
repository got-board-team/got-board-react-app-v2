import * as types from "../actions/actionTypes";
import { PieceKinds, Locations, Houses, Cards } from "../constants";

interface DropSpec {
  card?: string;
  flipped?: boolean; // When it's flipped, the user sees it's back cover.
}

export interface Drop {
  id: number;
  type: string;
  x: number;
  y: number;
  location: string;
  houseName?: string; // Optional for Combat but not for Pieces
  spec?: DropSpec;
}

interface DropState {
  isLoading: boolean;
  drops: Drop[];
}

const initialState: DropState = {
  isLoading: false,
  drops: [
    {
      id: 1,
      type: PieceKinds.FOOTMAN,
      x: 0,
      y: 0,
      location: Locations.WAR_ROOM,
      houseName: Houses.BARATHEON,
    },
    {
      id: 2,
      type: PieceKinds.KNIGHT,
      x: 0,
      y: 0,
      location: Locations.WAR_ROOM,
      houseName: Houses.BARATHEON,
    },
    {
      id: 3,
      type: PieceKinds.SIEGE,
      x: 100,
      y: 100,
      location: Locations.MAP,
      houseName: Houses.BARATHEON,
    },
    {
      id: 4,
      type: PieceKinds.SHIP,
      x: 180,
      y: 100,
      location: Locations.WAR_ROOM,
      houseName: Houses.BARATHEON,
    },
    {
      id: 5,
      type: PieceKinds.CARD,
      x: 180,
      y: 100,
      location: Locations.WAR_ROOM,
      houseName: Houses.BARATHEON,
      spec: {
        card: Cards.BRIENNE,
        flipped: false
      },
    },
  ],
};

export default (
  state = initialState,
  { type, drop }: {type: string, drop: Drop}
) => {
  switch (type) {
    case types.UPDATE_DROP_LOCATION_SUCCESS:
      const otherDrops: Drop[] = state.drops.filter((p: Drop) => p.id !== drop.id);

      const computedSpec = {
        ...drop.spec,
        flipped: drop.location === Locations.COMBAT,
      };

      const updatedDrops: Drop[] = [
        ...otherDrops,
        {
          id: drop.id,
          type: drop.type,
          location: drop.location,
          x: drop.x,
          y: drop.y,
          houseName: drop.houseName,
          spec: computedSpec,
        },
      ];

      return {
        isLoading: false,
        drops: updatedDrops,
      };
    default:
      return state;
  }
};
