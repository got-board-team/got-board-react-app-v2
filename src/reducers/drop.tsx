import * as types from "../actions/actionTypes";

export interface Drop {
  id: number;
  type: string;
  x: number;
  y: number;
  location: string;
}

interface DropState {
  isLoading: boolean;
  drops: Drop[];
}

const initialState: DropState = {
  isLoading: false,
  drops: [
    { id: 1, type: "piece", x: 0, y: 0, location: "war-room" },
    { id: 2, type: "piece", x: 0, y: 0, location: "war-room" },
    { id: 3, type: "piece", x: 100, y: 100, location: "map" },
    { id: 4, type: "piece", x: 143, y: 100, location: "map" },
  ],
};

export default (
  state = initialState,
  { type, drop }: {type: string, drop: Drop}
) => {
  switch (type) {
    case types.UPDATE_DROP_LOCATION_SUCCESS:
      const otherDrops: Drop[] = state.drops.filter((p: Drop) => p.id !== drop.id);

      const updatedDrops: Drop[] = [
        ...otherDrops,
        {
          id: drop.id,
          type: drop.type,
          location: drop.location,
          x: drop.x,
          y: drop.y,
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
