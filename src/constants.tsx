export enum PieceKinds {
  FOOTMAN = "footman",
  KNIGHT = "knight",
  SIEGE = "siege",
  SHIP = "ship",
};

export const AllPieceKinds = [
  PieceKinds.FOOTMAN,
  PieceKinds.KNIGHT,
  PieceKinds.SIEGE,
  PieceKinds.SHIP,
];

export enum Houses {
  BARATHEON = "baratheon",
  GREYJOY = "greyjoy",
  LANNISTER = "lannister",
  MARTELL = "martell",
  STARK = "stark",
  TYRELL = "tyrell",
}

export enum Locations {
  MAP = "map",
  WAR_ROOM = "war-room",
  COMBAT = "combat",
}
