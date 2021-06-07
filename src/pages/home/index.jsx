import Search from "antd/lib/transfer/search";
import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import './home.css'
const Home = () => {

    
    const [annoucements, setAnnoucements] = useState([])
    const [city, setCity] = useState('')

    useEffect(() => {
        fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  setAnnoucements(response))
    }, [])

    
    
    
    const search = () => {
        setAnnoucements([])
        annoucements.map(annoucement => annoucement.city === city && setAnnoucements(oldArray => [...oldArray, annoucement]))
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
            {annoucements.map(annoucement => 
                <div key={annoucement.id} className="annoucement">
                    <Link to={`/showAnnoucement/${annoucement.id}`}>{annoucement.title}</Link>
                    <p>{annoucement.description}</p>
                    <p>{annoucement.city}</p>
                    <p>{annoucement.price}</p>
                    <p>{annoucement.size} m2</p>
                </div>
            )}             
        </>
    )
}

export default Home