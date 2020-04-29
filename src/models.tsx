import { Houses } from "./constants";

export interface Match {
  id: number;
  name: string;
  players_count: number;
  created_at: string;
  updated_at: string;
  players: Player[];
}

export interface Player {
  id: number | null;
  house: Houses;
}

export interface PlayerAPIResponse {
  created_at: string;
  house_name: string;
  id: number;
  match_id: number;
  user_id: number;
}

interface House {
  house: Houses;
  id: number | null;
}

export interface Drop {
  id: number;
  type: string;
  x: number;
  y: number;
  location: string;
  houseName?: Houses; // Optional for Combat but not for Pieces
  spec?: PieceSpec;
}

export interface DropResponse {
  id: number;
  piece_type: string;
  x: number;
  y: number;
  location: string;
  house_name?: Houses; // Optional for Combat but not for Pieces
  spec?: PieceSpec;
}

interface PieceSpec {
  card?: string;
  flipped?: boolean; // When it's flipped, the user sees it's back cover.
}

const threePlayersMatch: House[] = [
  { house: Houses.BARATHEON, id: null },
  { house: Houses.LANNISTER, id: null },
  { house: Houses.STARK, id: null },
];

const fourPlayersMatch: House[] = [
  ...threePlayersMatch,
  { house: Houses.MARTELL, id: null },
];

const fivePlayersMatch: House[] = [
  ...fourPlayersMatch,
  { house: Houses.GREYJOY, id: null },
];

const sixPlayersMatch: House[] = [
  ...fivePlayersMatch,
  { house: Houses.TYRELL, id: null },
];

export const getHousesModels = (playerCount: number): House[] => {
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
