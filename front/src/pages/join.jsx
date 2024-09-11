import React, { useState } from "react";
import "../styles/login.css";
import SignInForm from "./login";
import SignUpForm from "./Signup";

function LoginSignup({setIsAuthenticated,setrole}) {
  const [type, setType] = useState("signIn");
  
  const handleOnClick = text => {
    if (text !== type) {
      setType(text);
    }
  };

  const containerClass = "container " + (type === "signUp" ? "right-panel-active" : "");

  return (
    <div className="log">
      <h2>Formulaire de connexion/inscription</h2>
      <div className={containerClass} id="container">
        <SignUpForm />
        <SignInForm setIsAuthenticated={setIsAuthenticated} setrole={setrole}/>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Re-bonjour !</h1>
              <p>Connectez-vous avec vos informations personnelles pour rester en contact avec nous.</p>
              <button className="ghost" id="signIn" onClick={() => handleOnClick("signIn")}>
                Se connecter
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bonjour, ami !</h1>
              <p>Entrez vos informations personnelles et commencez votre voyage avec nous.</p>
              <button className="ghost" id="signUp" onClick={() => handleOnClick("signUp")}>
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
