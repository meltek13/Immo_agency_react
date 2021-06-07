import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import Home from "pages/home"

const App = () => (
<Router>
 <Switch>
   <Route path="/">
     <Home />
   </Route>
 </Switch>
</Router>

);

ReactDOM.render(<App />, document.getElementById("root"));