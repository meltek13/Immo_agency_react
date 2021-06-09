import { React, useState } from 'react';
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {useDispatch } from "react-redux";
import { logIn } from "store-redux/index";
import './sign_up.css';
import signin_svg from 'assets/img/signin.svg';


const SignUp = () => {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();
  const loged = useSelector((state) => state.loged);
  
  const fetchFunction = (e) => {
    confirmPassword === password && 

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
      return response.json()}
    )
      .then((userdata) => {
        (Cookies.get("token") !== "null") && 
          Cookies.set("current_user_id", userdata.user.id)
          dispatch(logIn());
          history.push("/");
      });
    };
  

  return (
    <>
    <div className="Register">
    <h2 className="h2-signin">Créer un compte</h2>
      <img className='svg-signin' src={signin_svg} alt="illustration" />
        <form>
        <input className="input-log" type="Email" name="Email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input-log" type="Password" name="Password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
        <input className="input-log" type="Password" name="Password" placeholder="Mot de passe de confirmation"  onChange={(e) => setConfirmPassword(e.target.value)} />
        <button className="btn-signin" type="submit" onClick={fetchFunction} >S'inscrire</button>
      </form>
    </div>
    </>
  );
};

export default SignUp;
