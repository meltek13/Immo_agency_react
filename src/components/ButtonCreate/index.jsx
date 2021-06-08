import React from 'react'
import './style.css'

const ButtonCreate = (props) => {
  return (
    <button className="button-create" onClick={props.action}>{props.name}</button>
  )
}

export default ButtonCreate