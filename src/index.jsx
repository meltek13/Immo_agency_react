import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import './index.scss'
import Home from "pages/home"
import Navbar from './components/Navbar'
import CreateAnnoucement from './pages/CreateAnnoucement'
// import Footer from './components/Footer'

const App = () => (
<Router>
  <Navbar/>
  <Switch>
    <Route path="/createAnnoucement">
      <CreateAnnoucement />
    </Route>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
 {/* <Footer/> */}
</Router>

);

ReactDOM.render(<App />, document.getElementById("root"));