import React, {useState ,useEffect } from "react"
import './home.css'

const Home = () => {

    const [annoucements, setAnnoucements] = useState([])

    useEffect(() => {
        fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  setAnnoucements(response))
    }, [])

    console.log(annoucements)

    return (
        <div>
            <h1>Home</h1>
            {annoucements.map(annoucement => 
            <div key={annoucement.id} className="annoucement">
                <p>{annoucement.title}</p>
                <p>{annoucement.description}</p>
                <p>{annoucement.price}</p>
                <p>{annoucement.size} m2</p>
            </div>
            )}             
        </div>
    )
}

export default Home