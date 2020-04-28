import * as types from "./actionTypes";
import { Piece } from "../models";

const updateDropableSuccessAction = (drop: Piece) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export const updateDrop = (drop: Piece) => (dispatch: any) => {
  // From the match id in the URL, set it in state as currentMatch
  // PUT api/matches/:current_match/drops
  // {drop: Drop}
  /* export interface Drop {
   *   id: number;
   *   type: string;
   *   x: number;
   *   y: number;
   *   location: string;
   *   houseName?: string; // Optional for Combat but not for Pieces
   *   spec?: DropSpec;
   * } */
  dispatch(updateDropableSuccessAction(drop));
};

const updateFlippedSuccessAction = (drop: Piece) => ({
  type: types.UPDATE_DROP_REVEAL_COMBAT_SUCCESS,
  drop,
  isPusherDispatch: true,
});

export const revealCards = (drops: Piece[]) => (dispatch: any) => {
  drops.forEach(drop => dispatch(updateFlippedSuccessAction(drop)));
}

const resetCombatSuccessAction = () => ({
  type: types.RESET_COMBAT_SUCCESS,
  isPusherDispatch: true,
});

export const resetCombat = () => (dispatch: any) => {
  dispatch(resetCombatSuccessAction());
}
