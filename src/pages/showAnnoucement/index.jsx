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
  
  // console.log(Cookies.get("current_user_id"))
  
  const findUser = () => {
    fetch("http://localhost:3000/member-data")
    .then((response) => response.json())
    .then((response) => setUser(response))
  }

  const findAnnoucment = () => {
    fetch("http://localhost:3000/annoucements/" + id)
    .then((response) => response.json())
    .then((response) => setAnnoucement(response))
  }

  useEffect(() => {
    findAnnoucment();
    findUser()
  }, [])


  // console.log(annoucement)
 return (
  <div className="annoucement">
    {/* <p>{user.email}</p> */}
    <p>{annoucement.title}</p>
    <p>{annoucement.description}</p>
    <p>{annoucement.price}</p>
    <p>{annoucement.size} m2</p>
  </div>
 )
}



export default ShowAnnoucement