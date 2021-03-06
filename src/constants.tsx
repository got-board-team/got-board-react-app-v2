export enum PieceKinds {
  FOOTMAN = "footman",
  KNIGHT = "knight",
  SIEGE = "siege",
  SHIP = "ship",
  CARD = "card",
  WILDINGS_TOKEN = "wildings_token",
  INFLUENCE_TOKEN = "influence_token",
  ROUND_TOKEN = "round_token",
  SUPPLY_TOKEN = "supply_token",
  VICTORY_TOKEN = "victory_token",
};

export const AllPieceKinds = [
  PieceKinds.FOOTMAN,
  PieceKinds.KNIGHT,
  PieceKinds.SIEGE,
  PieceKinds.SHIP,
  PieceKinds.CARD,
  PieceKinds.WILDINGS_TOKEN,
  PieceKinds.INFLUENCE_TOKEN,
  PieceKinds.ROUND_TOKEN,
  PieceKinds.SUPPLY_TOKEN,
  PieceKinds.VICTORY_TOKEN,
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
