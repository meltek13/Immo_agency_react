import Search from "antd/lib/transfer/search";
import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import Dropdown from 'react-dropdown';
import './home.css'
import IntegerStepMin from "components/SlideBarPriceMin"
import IntegerStepMax from "components/SlideBarPriceMax"
import {ControlOutlined} from '@ant-design/icons'

const Home = () => {

    
    const [annoucements, setAnnoucements] = useState([])
    const [city, setCity] = useState('')
    const [data, setData] = useState([])

    const [inputValueMin, setInputValueMin] = useState(1)
    const [inputValueMax, setInputValueMax] = useState(1000000)
    const [type, setType] = useState("Type")

    console.log(inputValueMin)
    console.log(inputValueMax)
    const onChangeMin = (e) => {
        setInputValueMin(e)
    
    };

    const onChangeMax = (e) => {
        setInputValueMax(e)
       
    };
    const result = (e) => {
        e.preventDefault()
        console.log(e)
       
    };
    
const openFilter = () => {
    const Filter = document.querySelector(".FormFilter form")
 if (Filter.classList.value === "Invisible") {
     Filter.classList.remove("Invisible")
 } else {
    Filter.classList.add("Invisible")
 }
 
}


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
    

    const onSelect = (e) => {
        e.preventDefault()
        setAnnoucements([])
        type === "Type" ? (
            fetch('http://localhost:3000/annoucements')
            .then((response) => response.json())
            .then((response) =>  setAnnoucements(response))
        ) : (
            data.map(annoucement => annoucement.typeHome === type && setAnnoucements(oldArray => [...oldArray, annoucement]))  
        )
    }
    
    
    const search = (e) => {
        e.preventDefault()
        setAnnoucements([])
        data.map(annoucement => annoucement.city === city && setAnnoucements(oldArray => [...oldArray, annoucement]))
        city === '' && fetch('http://localhost:3000/annoucements')
        .then((response) => response.json())
        .then((response) =>  setAnnoucements(response))
    }


    return (
        <>
 <form>
        <input
            onChange={event => setCity(event.target.value)}
            className="SearchBar"
            type="search"
            placeholder=" Paris, Singapour, Tokyo ..."
        />
        <button className="buttonSearch" onClick={search}>Chercher</button>
    </form>

    <div className="Filter" onClick={openFilter}>
        <span className="filtre-icon"><ControlOutlined /></span>
    </div>  
    <div className="FormFilter">
    <form className="Invisible">
        <Dropdown className="dropdown-type" options={options} onChange={event => setType(event.value)} value={type} placeholder="Choisis une option" />
    <div className="slideBar">
        <IntegerStepMin onchange={event => setInputValueMin(event)} value={inputValueMin}/>
        <IntegerStepMax onchange={event => setInputValueMax(event)} value={inputValueMax}/>
    </div>
        <button className="buttonSearch" onClick={onSelect}>Chercher</button>
    </form>
  </div>

            {annoucements.map(annoucement => 
                <div key={annoucement.id} >
                    <div className="container">
                        {annoucement.typeHome === "Maison"?(
                            <img className='img-type' src={picHouses[0]} alt="maison" />
                        ):(<img className='img-type' src={picHouses[1]} alt="Appartement" />)}
                        <div className="box-infos">
                            <h3 className="infos-profil">{annoucement.title}</h3>
                            <p className="infos-profil">{annoucement.description}</p>
                            <p className="infos-profil">{annoucement.city}</p>
                            <p className="infos-profil">{annoucement.typeHome}</p>
                            <p className="infos-profil">{annoucement.price} €</p>
                            <p className="infos-profil">{annoucement.size} m2</p>
                        </div>
                        <Link to={`/showAnnoucement/${annoucement.id}`}><button className="btn">Voir l'annonce</button></Link>
                    </div>
                </div>
            )}             
        </>
    )
}

export default Home