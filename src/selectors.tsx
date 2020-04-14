const selectMatches = (state: any) => state.matches.data;
const selectCreatedMatch = (state: any) => state.matches.createdMatch;
const selectCurrentUser = (state: any) => state.currentUser;
const selectCurrentMatch = (state: any) => state.currentMatch;

export {
  selectMatches,
  selectCurrentUser,
  selectCreatedMatch,
  selectCurrentMatch
};
