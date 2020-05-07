import * as types from "../actions/actionTypes";

export interface CurrentUserState {
  id?: number;
  email?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

interface Payload {
  type: string
  attributes: User
}

const initialState: CurrentUserState = {};

export default (
  state = initialState,
  { type, attributes }: Payload
) => {
  switch (type) {
    case types.SET_USER:
      return {
        ...attributes,
      };
    case types.REMOVE_USER:
      return initialState;
    default:
      return state;
  }
};
