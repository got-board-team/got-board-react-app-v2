import * as types from "../actions/actionTypes";
import { Houses } from "../constants";

interface CurrentUserState {
  isLoading: boolean;
  houseName: string;
}

export interface User {
  houseName: string;
}

const initialState: CurrentUserState = {
  isLoading: false,
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
