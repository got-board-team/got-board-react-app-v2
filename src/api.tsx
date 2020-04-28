const BASE_API_URL = "http://localhost:8000";

export const allMatchesEndpoint = `${BASE_API_URL}/matches`;
export const matchEndpoint = (matchId: number) => `${BASE_API_URL}/matches/${matchId}`;
export const joinMatchEndpoint = (matchId: number) => `${BASE_API_URL}/matches/${matchId}/join`;
export const getPiecesEndpoint = (matchId: number) => `${BASE_API_URL}/matches/${matchId}/pieces`;
