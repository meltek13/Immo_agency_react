import React, { useState, useEffect } from "react";
import Cookies, { remove } from "js-cookie";
import { useDispatch } from "react-redux";
import { logOut } from "store-redux/index";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import ButtonDelete from "../../components/ButtonDelete";
import ButtonUpdate from "../../components/ButtonUpdate";
import "./index.scss";

const Profil = () => {
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [annoucements, setAnnoucements] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();
  
  // fonction a  utiliser en local pour les images
  const decodeUrlForImage = (imageUrl) => {
    let link = imageUrl;
    let linkStart = link.substring(0, 16);
    let linkMiddle = ":3000/";
    let linkEnd = link.substring(17, link.length);
    let constructor = linkStart + linkMiddle + linkEnd;

    return constructor;
  };

  const fetchFunction = () => {
    fetch("https://immo-react.herokuapp.com/members", {
      method: "get",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setEmail(response.current_user.email);
        setId(response.current_user.id);
      });
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const deleteAccount = (e) => {
    fetch(`https://immo-react.herokuapp.com/members/${id}`, {
      method: "delete",
      headers: {
        Authorization: Cookies.get("token"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        Cookies.remove("token");
        Cookies.remove("current_user_id");
        dispatch(logOut());
        history.push("/");
      });
  };

  useEffect(() => {
    fetch("https://immo-react.herokuapp.com/annoucements")
      .then((response) => response.json())
      .then((response) => {
        response.map(
          (annoucement) =>
            annoucement.user_id === parseInt(Cookies.get("current_user_id")) &&
            setAnnoucements((oldArray) => [...oldArray, annoucement])
        );
        console.log(response);
      });
  }, []);

  const remove = (id) => {
    fetch("https://immo-react.herokuapp.com/annoucements/" + id, {
      method: "DELETE",
    });
  };

  return (
    <>
      <div id="container-profil">
        <div id="box-infos">
          <p className="email">{email}</p>
          <ButtonDelete
            action={deleteAccount}
            className="delete-account"
            name="Supprimer mon compte"
          />
        </div>
        <h3>Mes annonces</h3>
        {annoucements.map((annoucement) => (
          <div key={annoucement.id}>
            <div className="container container-annoucement">
              <p>Titre: {annoucement.title}</p>
              <p>Description: {annoucement.description}</p>
              <p>Prix: {annoucement.price}€</p>
              <p>Adress: {annoucement.adress}</p>
              <p>Type: {annoucement.typeHome}</p>
              <p>Ville: {annoucement.city}</p>
              <p>Taille: {annoucement.size} m2</p>
              <img
                src={annoucement.featured_image.url}
                alt="image du logement"
              />
              <br />
              <Link to={`/annoucement/update/${annoucement.id}`}>
                <ButtonUpdate name="Modifier l'annonce" />
              </Link>
              <ButtonDelete
                action={() => remove(annoucement.id)}
                name="Supprimer mon annonce"
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Profil;
