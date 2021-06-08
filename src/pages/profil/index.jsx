import React, {useState ,useEffect } from 'react'
import Cookies, { remove } from "js-cookie";
import { useDispatch} from "react-redux";
import { logOut } from "store-redux/index";
import { useHistory } from "react-router-dom";

import { Link } from 'react-router-dom';

import './index.scss'

const Profil = () => {

  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
  const [annoucements, setAnnoucements] = useState([])
  const dispatch = useDispatch();
  const history = useHistory();

  const fetchFunction = () => {
    fetch("http://localhost:3000/members", {
      method: "get",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      }, 
    })
      .then((response) => response.json())
      .then((response) => {
      setEmail(response.current_user.email)
      setId(response.current_user.id)
      });  
};
      
    useEffect(() => {
        fetchFunction();
      }, []);
 
    const deleteAccount = (e) => {
 
        fetch(`http://localhost:3000/members/${id}`, {
          method: "delete",
          headers: {
            Authorization: Cookies.get("token"),
            "Content-Type": "application/json",
          }, 
        })
          .then((response) => response.json())
          .then((response) => {
           Cookies.remove("token");
           Cookies.remove("current_user_id")
           dispatch(logOut());
           history.push("/")
            
          });     
    };

    useEffect(() => {
      fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  response.map(annoucement => annoucement.user_id === parseInt(Cookies.get("current_user_id")) && setAnnoucements(oldArray => [...oldArray, annoucement])))
    }, [])
    
    const remove = (id) => {
      fetch('http://localhost:3000/annoucements/' + id, {
        method: "DELETE"
      })
    }


  return(
    <>
      <div id="container-profil">
        <div id="box-infos">
          <p className='email'>{email}</p>
        </div>
        <h3>Mes annonces</h3>
        {annoucements.map(annoucement => 
          <div key={annoucement.id} className="annoucement">
            <p>Titre: {annoucement.title}</p>
            <p>Description: {annoucement.description}</p>
            <p>Prix: {annoucement.price}€</p>
            <p>Adress: {annoucement.adress}</p>
            <p>Type: {annoucement.typeHome}</p>
            <p>Ville: {annoucement.city}</p>
            <p>Taille: {annoucement.size} m2</p>
            <br/>
            <Link to={`/annoucement/update/${annoucement.id}`}><button>Modifier l'annonce</button></Link>
            <button onClick={() => remove(annoucement.id)}>Supprimer mon annonce</button>
          </div>
          )}  
        <button onClick={deleteAccount}>Supprimer mon compte</button>
      </div>
    </>
  )
}

export default Profil