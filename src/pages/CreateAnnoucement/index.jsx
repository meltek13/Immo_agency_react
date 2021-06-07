import React, { useState } from 'react'
import './annoucement.css'
import Cookies from "js-cookie";

const CreateAnnoucement = () => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [adress, setAdress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [type, setType] = useState('')

  const create = () => {
    fetch("http://localhost:3000/annoucements", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: Cookies.get("current_user_id") ,title: title, description: description, adress: adress, zip_code: zipCode, city: city, price: price, size: size, typeHome: type})
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
  }


  return (
    <div className="content-input">
      <form>
        <input className="form" onChange={event => setTitle(event.target.value)} placeholder="Titre"/>
        <input className="form" onChange={event => setDescription(event.target.value)} placeholder="Description"/>
        <input className="form" onChange={event => setAdress(event.target.value)} placeholder="Adress"/>
        <input className="form" onChange={event => setZipCode(event.target.value)} placeholder="Code postal"/>
        <input className="form" onChange={event => setCity(event.target.value)} placeholder="Ville"/>
        <input className="form" onChange={event => setPrice(event.target.value)} placeholder="Prix"/>
        <input className="form" onChange={event => setSize(event.target.value)} placeholder="Taille"/>
        <input className="form" onChange={event => setType(event.target.value)} placeholder="appartement ou maison"/>
        <button className="form" onClick={create}>Creer une annonce</button>
      </form>
    </div>
  )
}


export default CreateAnnoucement