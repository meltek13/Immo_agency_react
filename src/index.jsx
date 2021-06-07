import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Route,
    Switch,
  } from 'react-router-dom';
import './index.scss'
import store from "./store-redux/store.js";
import { Provider } from "react-redux";
import Home from "pages/home"
import Navbar from './components/Navbar'
import CreateAnnoucement from './pages/CreateAnnoucement'
import Profil from './pages/profil'
import SignUp from 'pages/sign_up'
import SignIn from 'pages/sign_in'
import ShowAnnoucement from './pages/showAnnoucement'
// import Footer from './components/Footer'

const App = () => (
  <Router>
  
  <main>
  <Provider store={store}>
  <Navbar />
    <Switch>
      <Route path="/" exact>
      <Home/>
      </Route>
      <Route path="/sign-up">
      <SignUp/>
      </Route>
      <Route path="/sign-in">
      <SignIn/>
      </Route>
      <Route path="/profil">
      <Profil/>
      </Route>
    </Switch>
    </Provider>
  </main>
</Router>

); 


ReactDOM.render(<App />, document.getElementById("root"));