import React, { useEffect } from "react";
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { selectCurrentUser } from "../selectors";
import { useGetCurrentUser } from "../actions/users";
import { CurrentUserState } from "../reducers/currentUser";

function Auth({ match: { params: { email } }, history }: { match: any, history: any }) {
  const [request, { loading, error }] = useGetCurrentUser();
  const currentUser: CurrentUserState = useSelector(selectCurrentUser);

  useEffect(function getUserDetailsFromAPI() {
    request(email);
  }, []);

  if (currentUser && currentUser.id) {
    history.push('/');
    return null;
  }

  return (
    <p>Authenticating...</p>
  );
}

export default withRouter(Auth);
