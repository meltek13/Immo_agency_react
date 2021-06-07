import React from "react"
import Cookies from "js-cookie";
import { useSelector } from "react-redux";

const Home =()=>{
    const loged = useSelector((state) => state.loged);

    return (
    <div>
         <h1>Home</h1>
         { loged ? ( <p>connected</p> ) : (<p>not connected</p>)}
    </div>
       
    )
}

export default Home