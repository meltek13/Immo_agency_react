import React, { useEffect } from 'react'
import useState from 'react-hook-use-state';
import {
 useParams
} from "react-router-dom";
import Cookies from "js-cookie";

const ShowAnnoucement = () => {

  const [annoucement, setAnnoucement] = useState('');
  const [idUser, setIdUser] = useState('');
 

  let { id } = useParams();
  
  useEffect(() => {
   fetch("http://localhost:3000/annoucements/" + id)
    .then((response) => response.json())
    .then((response) => {setAnnoucement(response);
    setIdUser(response.user_id)})
  }, [])
  console.log(annoucement)


 return (
  <div className="annoucement">
   <p>{annoucement.title}</p>
   <p>{annoucement.description}</p>
   <p>{annoucement.price}</p>
   <p>{annoucement.size} m2</p>
  </div>
 )
}



export default ShowAnnoucement