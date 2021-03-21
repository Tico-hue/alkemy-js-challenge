import React from "react";
import "./index.css";
import "./components/Home";
import Login from "./components/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
export default App;
