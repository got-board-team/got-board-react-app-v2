import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./Home";
import CurrentMatch from "./CurrentMatch";
import NewMatch from "./NewMatch";
import Auth from "./Auth";
import { useCurrentUser } from "../services/useCurrentUser";

interface ProtectedRouteProps {
  currentUser: any;
  component: any; // TODO: Investigate why FunctionalComponent type is not working
  exact: boolean;
  path: string;
}

function ProtectedRoute({ component: ProtectedComponent, currentUser, ...props }: ProtectedRouteProps) {
  if (currentUser) {
    return (
      <Route component={ProtectedComponent} {...props} />
    );
  }

  return (
    <Redirect to="/" />
  );
}

function Router() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadUser, logoutUser, { currentUser }] = useCurrentUser();

  useEffect(function setCurrentUser() {
    loadUser();
  }, []);

  useEffect(function disableLoadingOnCurrentUser() {
    setIsLoading(false);
  }, [currentUser]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

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
