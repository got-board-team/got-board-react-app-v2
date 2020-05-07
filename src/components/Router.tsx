import React, { useEffect, ReactNode } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import CurrentMatch from "./CurrentMatch";
import NewMatch from "./NewMatch";
import Auth from "./Auth";
import { useCurrentUser } from "../services/useCurrentUser";

interface ProtectedRouteProps {
  currentUser: any;
  component: ReactNode;
  exact: boolean;
  path: string;
}

function ProtectedRoute({ component, currentUser, ...props }: ProtectedRouteProps) {
  if (currentUser && currentUser.id) {
    return (
      <Route component={Home} {...props} />
    );
  }

  return (
    <Redirect to="/" />
  );
}

function Router() {
  const [loadUser, logoutUser, { currentUser }] = useCurrentUser();

  useEffect(function setCurrentUser() {
    loadUser();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/:email" component={Auth} />
      <ProtectedRoute exact path="/new-match" component={NewMatch} currentUser={currentUser} />
      <ProtectedRoute exact path="/matches/:id" component={CurrentMatch} currentUser={currentUser} />
    </Switch>
  );
}

export default React.memo(Router);
