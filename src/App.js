import React from "react";
import { Switch,Route } from "react-router-dom";

import LandingPage from "./layout/LandingPage";

import HomePage from "./page/Home";

const App = () => {
  return (
    <Switch>
      <Route path="/">
          <LandingPage>
            <HomePage />
          </LandingPage>
      </Route>
    </Switch>
  );
}

export default App;
