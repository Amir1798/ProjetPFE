import React from 'react'
import logo from "../assets/testlog.png";
import { Button } from "react-bootstrap";
import { Link } from 'react-router-dom';
import "../styles/loggedNav.css";

function loggedNav({onLogoutClick}) {
return (
<div className='loggedNav'>
  <a href="/" className='siteTitle'>MicroSafe</a>
  <div className="logo-container">
    <Link to="/">
    <img className='sitelog' src={logo} />
    </Link>
  </div>
  <ul className='log_menu'>
    <li className='log_elements'> <a className='acc' href="/profile">Profil</a></li>
    <li className='log_elements'> <a className='acc' href="/user-sinistres">Sinistre</a> </li>
    <li className='log_elements'> <a className='acc' href="/userInsurances">Mes assurances</a> </li>
    <li className='log_elements'> <a className='acc' href="/subscription">S'assurer</a> </li>


    <Button onClick={onLogoutClick} className='decon'>Se déconnecter</Button>
  </ul>
</div>
)
}
export default loggedNav