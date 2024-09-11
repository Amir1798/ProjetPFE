import React, { useState } from 'react';
import '../styles/slider.css';
import Voiture from '../assets/voiture3.jpg';
import Habitation from '../assets/maison.jpg';
import ProjetPersonnelle from '../assets/projet1.jpg';
import Sante from '../assets/santé.jpeg';
import Retraite from '../assets/retraite.jpg';

const Slider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { title: "Assurance Voiture", image: Voiture, description: "Protégez votre voiture avec notre assurance complète." },
        { title: "Assurance Habitation", image: Habitation, description: "Assurez votre maison contre les imprévus." },
        { title: "Projet Personnel", image: ProjetPersonnelle, description: "Assurance pour vos projets personnels." },
        { title: "Assurance Santé", image: Sante, description: "Prenez soin de votre santé avec notre assurance." },
        { title: "Assurance Retraite", image: Retraite, description: "Préparez votre retraite en toute sérénité." },
    ];

    const totalSlides = slides.length;

    const nextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    };

    const prevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
    };

    return (
        <div className="slider">
            <button className="left-arrow" onClick={prevSlide}>&#10094;</button>
            <div className="slide">
                <img src={slides[currentSlide].image} alt={slides[currentSlide].title} />
                <h2>{slides[currentSlide].title}</h2>
                <p>{slides[currentSlide].description}</p>
            </div>
            <button className="right-arrow" onClick={nextSlide}>&#10095;</button>
        </div>
    );
};

export default Slider;
