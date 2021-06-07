import React, {useState ,useEffect } from 'react'
import Cookies from "js-cookie";
import { useDispatch} from "react-redux";
import { logOut } from "store-redux/index";
import { useHistory } from "react-router-dom";

import './index.scss'
const Profil = () => {
  const [email, setEmail] = useState("")
  const [id, setId] = useState("")
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
       console.log(response)
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
           console.log(response)
           Cookies.remove("token");
           Cookies.remove("current_user_id")
           dispatch(logOut());
           history.push("/")
            
          });
      
    };





  return(
    <>
      <div id="container-profil">
        <h1>Profil User</h1>
        <div id="box-infos">
          <p className='id'>#ID {id}</p>
          <p className='email'>{email}</p>

        </div>
        <div className="pictures-immo">
          <h2>Nombre de biens:</h2>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" />
        </div>
        <button onClick={deleteAccount}>delete</button>
      </div>
    </>
  )
}

export default Profil