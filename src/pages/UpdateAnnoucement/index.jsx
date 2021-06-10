import React, { useState } from 'react'
import { useParams } from 'react-router'
import Cookies from "js-cookie";
import ButtonUpdate from '../../components/ButtonUpdate'
import Dropdown from 'react-dropdown';

const UpdateAnnoucment = () => {

  let { id } = useParams();
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [adress, setAdress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [size, setSize] = useState('')
  const [type, setType] = useState('Maison')

  const update = () => {
    fetch("https://immo-react-front.herokuapp.com/annoucements/" + id, {
      method: "PUT",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({user_id: Cookies.get("current_user_id") ,title: title, description: description, adress: adress, zip_code: zipCode, city: city, price: price, size: size, typeHome: type})
    })
  }

  const options = [
    'Maison', 'Appartement'
  ];

  const defaultOption = options[0];
  
  const onSelect = (typeHome) => {
    setType(typeHome)
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
        <Dropdown className="dropdown-type-create" options={options} onChange={e => onSelect(e.value)} value={defaultOption} placeholder="Choisi une option" />
        <ButtonUpdate action={update} name="Modifier mon annonce"/>
      </form>
    </div>
  )
}

export default UpdateAnnoucment