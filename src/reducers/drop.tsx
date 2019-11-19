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
    { id: 1, type: "piece", x: 10, y: 10, location: "war-room" },
    { id: 2, type: "piece", x: 43, y: 10, location: "war-room" },
    { id: 3, type: "piece", x: 10, y: 10, location: "map" },
    { id: 4, type: "piece", x: 43, y: 10, location: "map" },
  ],
};

export default (
  state = initialState,
  { type, drop }: {type: string, drop: Drop}
) => {
  switch (type) {
    case types.UPDATE_DROP_LOCATION_SUCCESS:
      const currentDrop: Drop | undefined = state.drops.find((p: Drop) => p.id === drop.id);
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
