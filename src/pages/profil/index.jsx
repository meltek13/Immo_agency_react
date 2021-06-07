import React, {useState ,useEffect } from 'react'
import Cookies from "js-cookie";

import './index.scss'
const Profil = () => {

  const [user, setUser] = useState('')

  const fetchFunction = () => {
    fetch("http://localhost:3000/members", {
      method: "get"
    })
      .then((response) => response.json())
      .then((response) => {
        response.users.map(elem => elem.id === parseInt(Cookies.get("current_user_id")) && setUser(elem))
      });
  };

  useEffect(() => {
      fetchFunction();
  }, []);

  return(
    <>
      <div id="container-profil">
        <h1>Profil User</h1>
        <div id="box-infos">
         <p>{user.email}</p>
         <p>{user.id}</p>
        </div>
        <div className="pictures-immo">
          <h2>Nombre de biens:</h2>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" />
        </div>
      </div>
    </>
  )
}

export default Profil