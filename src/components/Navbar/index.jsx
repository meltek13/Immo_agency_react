import React from 'react'
import {
  Link,
} from 'react-router-dom';
import "./navbar.scss"
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import {useDispatch } from "react-redux";
import { logOut } from "store-redux/index";

const Navbar = () => {
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);

 

  const handleClick = (e) => {
    e.preventDefault();
 
    fetch("http://localhost:3000/users/sign_out", {
        method: "delete",
        headers: {
          Authorization: Cookies.get("token"),
          "Content-Type": "application/json",
        }, 
      })
        .then((response) => response.json())
        .then((userdata) => {
          console.log(userdata)
          Cookies.remove("token");
          Cookies.remove("current_user_id");
          dispatch(logOut());
          
        });
  };

  return(
    <div className="navbar">
      <div className="content-link">
        <Link className="link" to="/">Home</Link>
      </div>
      { loged ? ( 
        <>
        <div className="content-link">
        <a className="link" onClick={handleClick}>
          Se deconnecter
        </a>
      </div>
      <div className="content-link">
        <Link className="link" to="/profil">Profil</Link>
      </div>
      <div className="content-link">
        <Link className="link" to="/createAnnoucement">Create Annoucement</Link>
      </div>
      </>
      ) : (
        <>
      <div className="content-link">
        <Link className="link" to="/sign-in">Se connecter</Link>
      </div>
      <div className="content-link">
        <Link className="link" to="/sign-up">S'incrire</Link>
      </div>
      </>
      )}
      
      
    </div>
  )
}

export default Navbar