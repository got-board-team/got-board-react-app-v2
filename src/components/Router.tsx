import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import CurrentMatch from "./CurrentMatch";
import NewMatch from "./NewMatch";

const Router = React.memo(() => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route exact path="/new-match" render={() => <NewMatch />} />
    <Route exact path="/matches/:id" render={(props) => <CurrentMatch {...props} />} />
  </Switch>
));

export default Router;
