import * as types from "./actionTypes";
import { Drop } from "../reducers/drop";

const updateDropableSuccessAction = (drop: Drop) => ({
  type: types.UPDATE_DROP_LOCATION_SUCCESS,
  drop,
});

export const updateDropLocation = (drop: Drop) => (dispatch: any) => {
  dispatch(updateDropableSuccessAction(drop));
};
