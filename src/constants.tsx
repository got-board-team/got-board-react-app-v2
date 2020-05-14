export enum PieceKinds {
  FOOTMAN = "footman",
  KNIGHT = "knight",
  SIEGE = "siege",
  SHIP = "ship",
  CARD = "card",
  WILDINGS_TOKEN = "wildings_token",
};

export const AllPieceKinds = [
  PieceKinds.FOOTMAN,
  PieceKinds.KNIGHT,
  PieceKinds.SIEGE,
  PieceKinds.SHIP,
  PieceKinds.CARD,
  PieceKinds.WILDINGS_TOKEN,
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

export enum Cards {
  BRIENNE = "brienne",
}

export const capitalizeName = (name: string) => name.charAt(0).toUpperCase() + name.slice(1);
