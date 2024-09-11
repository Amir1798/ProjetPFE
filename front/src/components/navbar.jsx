import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/navbar.css";
import { Button } from "react-bootstrap";
import logo from "../assets/testlog.png";
function navbar() {
  return (
<div className='nav'>
    <a href="/" className='siteTitle'>MicroSafe</a>
    <div className="logo-container">
      <Link to="/">
    <img className='sitelog' src={logo}/>
    </Link>
    </div>
    <ul className='nav_menu'>
        <li className='nav_elements'>
            <a href="/" className='acc'>Accueil</a></li>
    
                        <Link to="/join">
                        <Button className='navbut'>Joindre</Button>
                    </Link>
                    </ul>
</div>
  )
}

export default navbar
