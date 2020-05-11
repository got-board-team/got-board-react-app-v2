import { useDispatch, useSelector } from "react-redux";

import { getUserSuccess, removeUser } from "../actions/users";
import { CurrentUserState } from "../reducers/currentUser";
import { selectCurrentUser } from "../selectors";

type HookReturn = [
  () => void,
  () => void,
  { currentUser: any }
];

export function useCurrentUser(): HookReturn {
  const currentUser: CurrentUserState = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

  function loadUserFromLocalStorage() {
    const user = localStorage.getItem("currentUser");

    if (!user) {
      return;
    }

    const parsedUser = JSON.parse(user);

    if (parsedUser.id) {
      dispatch(getUserSuccess(parsedUser));
    }
  }

  function logoutUser() {
    localStorage.removeItem("currentUser");
    dispatch(removeUser());
  }

  return [loadUserFromLocalStorage, logoutUser, { currentUser }];
}
