import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useRequest2 } from "./useRequest";
import { getUserByEmailEndpoint } from "../api";
import { UserAPIResponse } from "../models";
import * as types from "./actionTypes";

type GetCurrentUserHook = [(userEmail: string) => void, {loading: boolean, error: string | null}];

export const getUserSuccess = (user: UserAPIResponse) => ({
  type: types.SET_USER,
  attributes: user,
});

export const removeUser = () => ({
  type: types.REMOVE_USER
});

export function useGetCurrentUser(): GetCurrentUserHook {
  const dispatch = useDispatch();

  const [request, { data, loading, error }] = useRequest2("GET");

  function createRequest(userEmail: string) {
    const url = getUserByEmailEndpoint(userEmail);
    return request(url);
  }

  useEffect(
    function persistUser() {
      if (data) {
        localStorage.setItem("currentUser", JSON.stringify(data));
        dispatch(getUserSuccess(data));
        return;
      }
    },
    [data, error, dispatch]
  );

  return [createRequest, { loading, error }];
}
