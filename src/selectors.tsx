import { Locations } from "./constants";
import { Drop } from "./models";

const selectMatches = (state: any) => state.matches.data;
const selectCreatedMatch = (state: any) => state.matches.createdMatch;
const selectCurrentUser = (state: any) => state.currentUser;
const selectCurrentMatch = (state: any) => state.currentMatch;
const selectMapDrops = (state: any) => state.drop && state.drop.drops ? state.drop.drops.filter((drop: Drop) => drop.location === Locations.MAP) : [];

export {
  selectMatches,
  selectCurrentUser,
  selectCreatedMatch,
  selectCurrentMatch,
  selectMapDrops
};
