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
 <form className="form" action="">
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