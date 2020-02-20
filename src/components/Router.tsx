import React from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./Home";
import Game from "./Game";
import NewMatch from "./NewMatch";

const Router = React.memo(() => (
  <Switch>
    <Route exact path="/" render={(props) => <Home history={props.history} />} />
    <Route exact path="/new-match" render={() => <NewMatch />} />
    <Route exact path="/matches/:id" render={(props) => <Game {...props} />} />
  </Switch>
));

export default Router;
