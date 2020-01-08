import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import NewMatch from "./NewMatch";

const Router = React.memo(() => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route exact path="/new-match" render={() => <NewMatch />} />
    <Route exact path="/matches/:id" render={() => <Game />} />
  </Switch>
));

export default Router;
