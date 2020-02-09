import * as types from "../actions/actionTypes";
import { Houses } from "../constants";

export interface CurrentUserState {
  isLoading: boolean;
  id: number;
  houseName: string;
}

export interface User {
  id: number;
  houseName: string;
}

const initialState: CurrentUserState = {
  isLoading: false,
  id: 1,
  houseName: Houses.BARATHEON,
};

export default (
  state = initialState,
  { type, user }: {type: string, user: User}
) => {
  switch (type) {
    case types.GET_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.GET_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        ...user,
      };
    default:
      return state;
  }
};
