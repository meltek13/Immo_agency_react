import React, { useState } from "react";
import "./annoucement.css";
import Cookies from "js-cookie";
import Dropdown from "react-dropdown";
import ButtonCreate from "../../components/ButtonCreate";
import ButtonUpdate from "components/ButtonUpdate";
import Addhome from 'assets/img/add_home.svg'
const CreateAnnoucement = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adress, setAdress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [type, setType] = useState("Maison");
  const [featuredImage, setFeaturedImage] = useState("");

  const create = (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("user_id", Cookies.get("current_user_id"));
    formData.append("title", title);
    formData.append("description", description);
    formData.append("adress", adress);
    formData.append("zip_code", zipCode);
    formData.append("city", city);
    formData.append("price", price);
    formData.append("size", size);
    formData.append("typeHome", type);
    formData.append("featured_image", featuredImage);

    fetch("https://immo-react.herokuapp.com/annoucements", {
      method: "POST",
      body: formData,
    }).catch((error) => console.log(error));
  };

  const options = ["Maison", "Appartement"];

  const defaultOption = options[0];

  const onSelect = (typeHome) => {
    setType(typeHome);
  };

  return (
    <div className="content-input">
      <h2 className="h2-addhome">Se connecter</h2>
      <img className="svg-addhome" src={Addhome} alt="illustration" />
      <form>
        <input
          className="form"
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Titre"
        />
        <input
          className="form"
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <input
          className="form"
          onChange={(event) => setAdress(event.target.value)}
          placeholder="Adress"
        />
        <input
          className="form"
          onChange={(event) => setZipCode(event.target.value)}
          placeholder="Code postal"
        />
        <input
          className="form"
          onChange={(event) => setCity(event.target.value)}
          placeholder="Ville"
        />
        <input
          className="form"
          onChange={(event) => setPrice(event.target.value)}
          placeholder="Prix"
        />
        <input
          className="form"
          onChange={(event) => setSize(event.target.value)}
          placeholder="Taille"
        />
        <Dropdown
          className="dropdown-type-create"
          options={options}
          onChange={(e) => onSelect(e.value)}
          value={defaultOption}
          placeholder="Choisi une option"
        />
        <input
          type="file"
          accept="image/*"
          multiple={false}
          onChange={(event) => setFeaturedImage(event.target.files[0])}
        />
      </form>
      <ButtonCreate action={create} name="Créer l'annonce" />

    </div>
  );
};

export default CreateAnnoucement;
