import React, { useEffect } from 'react'
import useState from 'react-hook-use-state';
import {
 useParams
} from "react-router-dom";
import Cookies from "js-cookie";

const ShowAnnoucement = () => {

  const [annoucement, setAnnoucement] = useState('');
  const [user, setUser] = useState("");

  let { id } = useParams();
  
  const findAnnoucment = () => {
    fetch("http://localhost:3000/annoucements/" + id)
    .then((response) => response.json())
    .then((response) => {
      setAnnoucement(response)
    })
  }
  const findUser = () => {
    fetch("http://localhost:3000/members", {
     method: "get"
   })
     .then((response) => response.json())
     .then((response) => {
       response.users.map(elem => elem.id ===  annoucement.user_id && setUser(elem))
     });
  }

  useEffect(() => {
    findAnnoucment();
    findUser();
  }, [annoucement.user_id])

 return (
  <div className="annoucement">
    <p>De {user.email}</p>
    <p>{annoucement.title}</p>
    <p>{annoucement.description}</p>
    <p>{annoucement.price}</p>
    <p>{annoucement.size} m2</p>
  </div>
 )
}



export default ShowAnnoucement