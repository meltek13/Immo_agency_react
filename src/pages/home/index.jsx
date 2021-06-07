import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import './home.css'
const Home = () => {

    
    const [annoucements, setAnnoucements] = useState([])
   
    useEffect(() => {
        fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  setAnnoucements(response))
    }, [])


    return (
        <>


            {annoucements.map(annoucement => 
                <div key={annoucement.id} className="annoucement">
                    <Link to={`/showAnnoucement/${annoucement.id}`}>{annoucement.title}</Link>
                    <p>{annoucement.description}</p>
                    <p>{annoucement.price}</p>
                    <p>{annoucement.size} m2</p>
                </div>
            )}             
        </>
    )
}

export default Home