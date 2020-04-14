import { Houses } from "./constants";

export interface Match {
  id: number;
  name: string;
  playersCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Player {
  id: number;
  house: House;
}

export interface House {
  type: Houses;
  playerId: number | null;
}

const threePlayersMatch: House[] = [
  { type: Houses.BARATHEON, playerId: null },
  { type: Houses.LANNISTER, playerId: null },
  { type: Houses.STARK, playerId: null },
];

const fourPlayersMatch: House[] = [
  ...threePlayersMatch,
  { type: Houses.MARTELL, playerId: null },
];

const fivePlayersMatch: House[] = [
  ...fourPlayersMatch,
  { type: Houses.GREYJOY, playerId: null },
];

const sixPlayersMatch: House[] = [
  ...fivePlayersMatch,
  { type: Houses.TYRELL, playerId: null },
];

const HousesModels = (playerCount: number): House[] => {
  switch (playerCount) {
    case 3:
      return threePlayersMatch;
    case 4:
      return fourPlayersMatch;
    case 5:
      return fivePlayersMatch;
    case 6:
      return sixPlayersMatch;
    default:
      return [];
  }
}
