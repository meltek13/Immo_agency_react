import React, { useState } from 'react'
import './annoucement.css'

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
      // replace 2 to cookies(user.id)
      body: JSON.stringify({user_id: 2 ,title: title, description: description, adress: adress, zip_code: zipCode, city: city, price: price, size: size, typeHome: type})
    })
    .then((response) => response.json())
    .then((response) => console.log(response))
  }

  return (
    <div className="form">
      <input onChange={event => setTitle(event.target.value)} placeholder="Titre"/>
      <input onChange={event => setDescription(event.target.value)} placeholder="Description"/>
      <input onChange={event => setAdress(event.target.value)} placeholder="Adress"/>
      <input onChange={event => setZipCode(event.target.value)} placeholder="Code postal"/>
      <input onChange={event => setCity(event.target.value)} placeholder="Ville"/>
      <input onChange={event => setPrice(event.target.value)} placeholder="Prix"/>
      <input onChange={event => setSize(event.target.value)} placeholder="Taille"/>
      <input onChange={event => setType(event.target.value)} placeholder="apparttement ou maison"/>
      <button onClick={create}>Creer une annonce</button>
    </div>
  )
}


export default CreateAnnoucement