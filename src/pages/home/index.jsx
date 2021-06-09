
import React, {useState ,useEffect } from "react"
import { Link } from 'react-router-dom';
import './home.css'
import IntegerStepMin from "components/SlideBarPriceMin"
import IntegerStepMax from "components/SlideBarPriceMax"
import {ControlOutlined, DownOutlined} from '@ant-design/icons'
import { InputNumber, Menu, Dropdown } from 'antd';
import welcome_svg from 'assets/img/welcome.svg'

const Home = () => {

    const [annoucements, setAnnoucements] = useState([])
    const [city, setCity] = useState("")
    const [data, setData] = useState([])
    const [sizeMin, setSizeMin] = useState(1)
    const [sizeMax, setSizeMax] = useState(1000)
    const [inputValueMin, setInputValueMin] = useState(1)
    const [inputValueMax, setInputValueMax] = useState(1000000)
    const [type, setType] = useState("")


    const menu = (
        <Menu >
          <Menu.Item key="Appartement" onClick={e => setType("Appartement")}>
             <div   value="Appartement" >
                <span value="Appartement">Appartement</span>
             </div>
          </Menu.Item>
          <Menu.Item key="Maison" onClick={e => setType("Maison")}>
             <div  value="Maison">
                Maison
             </div>
          </Menu.Item>
          <Menu.Item key="reset" onClick={e => setType("")}>
             <div  value="reset">
                reinitialiser
             </div>
          </Menu.Item>
        </Menu>
     );
    
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
    
    const search = (e) => {
        e.preventDefault()
        setAnnoucements([])
        if (city !== "" & type !==""){
            data.map(annoucement => 
                annoucement.price > inputValueMin && annoucement.price < inputValueMax && annoucement.size > sizeMin && annoucement.size < sizeMax  && annoucement.city === city && annoucement.typeHome === type && 
                setAnnoucements(oldArray => [...oldArray, annoucement]))  
        }else if (city !== "" & type ===""){
            data.map(annoucement => 
                annoucement.price > inputValueMin && annoucement.price < inputValueMax && annoucement.size > sizeMin && annoucement.size < sizeMax  && annoucement.city === city &&
                setAnnoucements(oldArray => [...oldArray, annoucement]))  
        }else if (city === "" & type !==""){
            data.map(annoucement => 
                annoucement.price > inputValueMin && annoucement.price < inputValueMax && annoucement.size > sizeMin && annoucement.size < sizeMax  && annoucement.typeHome === type && 
                setAnnoucements(oldArray => [...oldArray, annoucement]))  
        } else  {
            data.map(annoucement => 
                annoucement.price > inputValueMin && annoucement.price < inputValueMax && annoucement.size > sizeMin && annoucement.size < sizeMax  && 
                setAnnoucements(oldArray => [...oldArray, annoucement]))  
        }          
    }

    return (
        <>
        <img className="svg-welcome" src={welcome_svg} alt="maisons" />
        <h2 className="titleWhere">Où cherchez-vous ?</h2>
        <h4 className="tileLocality">LOCALITÉS</h4>
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
        <span><span className="filtre-icon"><ControlOutlined /></span> Plus de critère <span className="circle"><DownOutlined /></span></span>
    </div> 

    <div className="FormFilter">
        <form className="Invisible"> 

            <div className="someOptionsForSearch">  
                <div className="someOptionInput1">
                     <h5>TYPE DE BIEN :</h5>
                </div> 
                <div className="someOptionInput1">
                     <h5>SURFACE MIN (m²)</h5>
                </div> 
                <div className="someOptionInput1">
                     <h5>SURFACE MAX (m²)</h5>
                </div> 
            </div>
    
            <div className="someOptionsForSearch">  
                <div className="someOptionInput2">
                    <Dropdown overlay={menu}>
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                             {type === "" ? "Que voulez vous acheter ? " : type} <DownOutlined />
                        </a>
                    </Dropdown>
                </div>
        
                <div className="someOptionInput2">
                    <InputNumber min={1} max={1000} defaultValue={1}  onChange={event => setSizeMin(event)} /> 
                </div>
                <div className="someOptionInput2">
                    <InputNumber min={1} max={1000} defaultValue={999} onChange={event => setSizeMax(event)} /> 
                </div>
            </div> 
     
            <div className="slideBar">
                 <h5>BUDGET :</h5>
                 <IntegerStepMin onchange={event => setInputValueMin(event)} value={inputValueMin}/>
                 <IntegerStepMax onchange={event => setInputValueMax(event)} value={inputValueMax}/>
            </div>
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