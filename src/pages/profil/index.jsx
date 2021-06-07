import React from 'react'
import './index.scss'
const Profil = () => {

  return(
    <>
      <div id="container-profil">
        <h1>Profil User</h1>
        <div id="box-infos">
          <p className='firstname'>Boris</p>
          <p className='lastname'>La frappe</p>
          <p className='email'>sddsds@yahoo.fr</p>
          <p className='count-immo'>5</p>
        </div>
        <div className="pictures-immo">
          <h2>Nombre de biens:</h2>
          <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80" alt="" />
        </div>
      </div>
    </>
  )
}

export default Profil