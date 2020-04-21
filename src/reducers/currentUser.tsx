import * as types from "../actions/actionTypes";

export interface CurrentUserState {
  isLoading: boolean;
  id?: number;
  email?: string;
  name?: string;
  createdAt: string;
  updatedAt: string;
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

const mockedCurrentUser = {
  id: 1,
  email: "rafael@got.local",
  name: "Rafael",
  createdAt: "2020-04-08T21:02:57.498519",
  updatedAt: "2020-04-08T21:02:57.498519"
};

const initialState: CurrentUserState = {
  isLoading: false,
  ...mockedCurrentUser,
};

export default (
  state = initialState,
  { type, attributes }: Payload
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
        attributes,
      };
    default:
      return state;
  }
};
