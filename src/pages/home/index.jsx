import Search from "antd/lib/transfer/search";
import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './home.css'
const Home = () => {

    
    const [annoucements, setAnnoucements] = useState([])
    const [city, setCity] = useState('')

    const [data, setData] = useState([])
   
    useEffect(() => {
        fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  {
                setAnnoucements(response)
                setData(response)
            })
    }, [])


    const options = [
        'Type','Maison', 'Appartement'
    ];

    const defaultOption = options[0];

    const onSelect = (type) => {
        setAnnoucements([])
        type === "Type" ? (
            fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  setAnnoucements(response))
        ) : (
            data.map(annoucement => annoucement.typeHome === type && setAnnoucements(oldArray => [...oldArray, annoucement]))  
        )
    }
    
    
    const search = () => {
        setAnnoucements([])
        data.map(annoucement => annoucement.city === city && setAnnoucements(oldArray => [...oldArray, annoucement]))
        city === '' && fetch('http://localhost:3000/annoucements')
        .then((response) => response.json())
        .then((response) =>  setAnnoucements(response))
    }


    return (
        <>

            <div className="search-city">
                <input onChange={event => setCity(event.target.value)} placeholder="Ta ville"/>
                <button onClick={search}>Chercher</button>
            </div>

  <Dropdown className="dropdown-type" options={options} onChange={e => onSelect(e.value)} value={defaultOption} placeholder="Choisi une option" />

            {annoucements.map(annoucement => 
                <div key={annoucement.id} className="annoucement">
                    <div className="container">
                        <h3>{annoucement.title}</h3>
                        <p>{annoucement.description}</p>
                        <p>{annoucement.city}</p>
                        <p>{annoucement.price}</p>
                        <p>{annoucement.size} m2</p>
                        <Link to={`/showAnnoucement/${annoucement.id}`}><button className="btn">Voir l'annonce</button></Link>
                    </div>
                </div>
            )}             
        </>
    )
}

export default Home