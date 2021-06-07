import { React, useState } from 'react';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDispatch } from "react-redux";
import { logIn } from "store-redux/index";

const SignUp = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);
  const fetchFunction = (e) => {

    e.preventDefault();
    const data = {
      email,
      password,
    };

    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "user": {
          "email": data.email,
          "password": data.password,
        },
      }),
    })
    .then((response) => {Cookies.set("token",response.headers.get("authorization"));
   console.log(Cookies.get("token"))
    return response.json()}
    )
      .then((userdata) => {
       console.log(userdata)
       Cookies.set("current_user_id", userdata.user.id)
       dispatch(logIn());
       history.push("/");
      });
  
};
  

  return (
    
    <div className="Register">
        <form>
        <input type="Email" name="Email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="Password" name="Password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit" onClick={fetchFunction} >S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUp;
