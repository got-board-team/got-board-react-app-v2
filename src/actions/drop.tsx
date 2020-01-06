import * as types from "./actionTypes";
import { Drop } from "../reducers/drop";

const updateDropableSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
});

export const updateDrop = (drop: Drop) => (dispatch: any) => {
  dispatch(updateDropableSuccessAction(drop));
};

const updateFlippedSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_REVEAL_COMBAT_SUCCESS,
  drop,
});

export const revealCards = (drops: Drop[]) => (dispatch: any) => {
  drops.forEach(drop => dispatch(updateFlippedSuccessAction(drop)));
}

const resetCombatSuccessAction = () => ({
  type: types.RESET_COMBAT_SUCCESS,
});

export const resetCombat = () => (dispatch: any) => {
  console.log('resetCombat action')
  dispatch(resetCombatSuccessAction());
}
