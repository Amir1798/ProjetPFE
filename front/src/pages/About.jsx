import React from 'react';
import '../styles/About.css'; 
import abt from "../assets/assurance (1).jpeg";

const About = () => {
  return (
    <div className="about">
    <div className="about-text">
      <h1 style={{ color: '#ff6f3d' }}>À propos de nous</h1>
      <p>
        MicroSafe est une société tunisienne spécialisée dans la microassurance. Nous offrons
        une gamme de produits d'assurance abordables et accessibles à tous les Tunisiens.Nous sommes fiers d'être une entreprise tunisienne et de contribuer au développement
        économique de notre pays. Nous sommes engagés à fournir à nos clients un service
        client de qualité et à leur offrir la meilleure expérience possible.
       
      </p>
    </div>
    <div className="about-image">
      <img src={abt} alt="Micro assurance en Tunisie" />
    </div>
  </div>
  )
}  

export default About;