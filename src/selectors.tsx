const selectMatches = (state: any) => state.matches.data;
const selectCreatedMatch = (state: any) => state.matches.createdMatch;
const selectCurrentUser = (state: any) => state.currentUser;

export { selectMatches, selectCurrentUser, selectCreatedMatch };
