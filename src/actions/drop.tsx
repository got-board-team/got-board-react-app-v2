import * as types from "./actionTypes";
import { Drop } from "../reducers/drop";

const updateDropableSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
});

export const updateDrop = (drop: Drop) => (dispatch: any) => {
  dispatch(updateDropableSuccessAction(drop));
};

export const revealCards = (drops: Drop[]) => (dispatch: any) => {
  console.log('Reveal Cards Action', drops);
}
