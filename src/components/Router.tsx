import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import NewGame from "./NewGame";

const Router = React.memo(() => (
  <Switch>
    <Route exact path="/" render={() => <Home />} />
    <Route exact path="/new-game" render={() => <NewGame />} />
    <Route exact path="/games/1" render={() => <Game />} />
  </Switch>
));

export default Router;
