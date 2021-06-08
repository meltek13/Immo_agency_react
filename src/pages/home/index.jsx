import Search from "antd/lib/transfer/search";
import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './home.css'
const Home = () => {

    
    const [annoucements, setAnnoucements] = useState([])
    const [city, setCity] = useState('')
    const [data, setData] = useState([])
    const picHouses = ['https://images.unsplash.com/photo-1567428485548-c499e4931c10?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    'https://images.unsplash.com/photo-1565721219423-c8cd193201c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    ]

    
   
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
                        {annoucement.typeHome === "Maison"?(
                            <img className='img-type' src={picHouses[0]} alt="maison" />
                        ):(<img className='img-type' src={picHouses[1]} alt="Appartement" />)}
                        <div>
                            <h3>{annoucement.title}</h3>
                            <p>{annoucement.description}</p>
                            <p>{annoucement.city}</p>
                            <p>{annoucement.typeHome}</p>
                            <p>{annoucement.price} €</p>
                            <p>{annoucement.size} m2</p>
                        </div>
                        <Link to={`/showAnnoucement/${annoucement.id}`}><button className="btn">Voir l'annonce</button></Link>
                    </div>
                </div>
            )}             
        </>
    )
}

export default Home