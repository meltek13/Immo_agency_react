import React from 'react'
import {
  Link,
} from 'react-router-dom';
import "./navbar.scss"
import Cookies from "js-cookie";
import { useSelector, useDispatch} from "react-redux";
import { logOut } from "store-redux/index";
import { HomeOutlined, PoweroffOutlined, UserOutlined, PlusSquareOutlined, SolutionOutlined } from '@ant-design/icons'


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
          dispatch(logOut());
        });
  };

  return(
    <div className="navbar">
      <div className="content-link">

        <Link className="link " to="/">
        <h6 className="title-nav">Home</h6>
          <span className="home-icon"><HomeOutlined /></span>
          
        </Link>

      </div>
      { loged ? ( 
        <>
      <div className="content-link">
        <Link className="link" to='/profil'>
        <h6 className="title-nav">Profil</h6>
          <span className="home-icon"><UserOutlined /></span> 
        </Link>
      </div>
      <div className="content-link">
        
        <Link className="link" to="/createAnnoucement">
          <h6 className="title-nav">Ajouter une annonce</h6>
          <span className="home-icon"><PlusSquareOutlined /></span>
          </Link>
        
      </div>
      <div className="content-link">
          <a href="" className="link" onClick={handleClick}>
          <h6 className="title-nav">Se deconnecter</h6>
          <span className="disconnect-icon"><PoweroffOutlined /></span> 
          </a>
        </div>
      </>
      ) : (
        <>
      <div className="content-link">
      
        <Link className="link" to="/signUp">
        <h6 className="title-nav">S'inscrire</h6>
          <span className="home-icon"><SolutionOutlined /></span>
        </Link>
      </div>
      <div className="content-link">
        
        <Link className="link" to="/signIn">
          <h6 className="title-nav">Se connecter</h6>
          <span className="connect-icon"><PoweroffOutlined /></span> 
        </Link>
      </div>
      </>
      )}
      
      
    </div>
  )
}

export default Navbar