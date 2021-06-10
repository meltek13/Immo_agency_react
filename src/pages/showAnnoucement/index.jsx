import React, { useEffect } from 'react'
import useState from 'react-hook-use-state';
import {
 useParams
} from "react-router-dom";
import Cookies from "js-cookie";
import './index.css';
import { Link } from 'react-router-dom';
import { useSelector} from "react-redux";

const ShowAnnoucement = () => {

  const [annoucement, setAnnoucement] = useState('');
  const [idUser, setIdUser] = useState(0);
  const [user, setUser] = useState('');
  const loged = useSelector((state) => state.loged);
  let { id } = useParams();

  const findUser = () => {
    fetch("https://immo-react.herokuapp.com/annoucements/" + id)
    .then((response) => response.json())
    .then((response) => {setAnnoucement(response);
    setIdUser(response.user_id)})
  }

  const allUser = () => {
    fetch("https://immo-react.herokuapp.com/members", {
      method: "get",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      }, 
    })
      .then((response) => response.json())
      .then((response) => {
        response.users.map(user => user.id === idUser && setUser(user))
      });  
  };


  useEffect(() => {
    findUser()
    allUser()
  }, [idUser])

 return (
  <div className="annoucement-profil">
{ loged ? (<p>Contact :{user.email}</p> ):(<p>Contact : Connectez-vous pour voir l'email du propriétaire </p> ) }
    
    <p>Titre: {annoucement.title}</p>
    <p>Description: {annoucement.description}</p>
    <p>Prix: {annoucement.price}€</p>
    <p>Adress: {annoucement.adress}</p>
    <p>Type: {annoucement.typeHome}</p>
    <p>Ville: {annoucement.city}</p>
    <p>Taille: {annoucement.size} m2</p>
    <Link to={'/'}><button className="btn">retour</button></Link>
  </div>
 )
}



export default ShowAnnoucement