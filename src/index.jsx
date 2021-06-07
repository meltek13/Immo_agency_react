import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import './index.scss'
import { Provider } from "react-redux";
import store from "./store-redux/store.js";
import Home from "pages/home"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SignIn from 'pages/sign_in'
import SignUp from 'pages/sign_up'

const App = () => (
<Router>
<main>
  <Provider store={store}>
  <Navbar/>
  <Switch>
    <Route path="/" exact>
      <Home />
    </Route>
    <Route path="/sign-up">
      <SignUp/>
    </Route>
    <Route path="/sign-in">
      <SignIn/>
    </Route>
  </Switch>
 <Footer/>
 </Provider>
  </main>
</Router>

);

ReactDOM.render(<App />, document.getElementById("root"));