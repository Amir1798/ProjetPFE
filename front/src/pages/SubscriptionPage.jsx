import React, { useState } from 'react';
import SubscriptionCard from './SubscriptionCard';
import "../styles/subscription.css";
import Voiture from "../assets/voiture1.png";
import Habit from "../assets/habitaion.png";
import Proj from "../assets/images.png";
import san from "../assets/san.png";
import Ret from "../assets/ret.png";

const SubscriptionsPage = () => {
  const [currentCard, setCurrentCard] = useState(0);

  const cards = [
    { title: "Voiture", image: Voiture, details: "Access to basic features" },
    { title: "Habitation", image: Habit, details: "Access to basic features" },
    { title: "Projet Personnelle", image: Proj, details: "Access to basic features" },
    { title: "Santé", image: san, details: "Access to basic features" },
    { title: "Retraite", image: Ret, details: "Access to basic features" }
  ];

  const totalCards = cards.length;

  const nextCard = () => {
    setCurrentCard((prevCard) => (prevCard + 1) % totalCards);
  };

  const prevCard = () => {
    setCurrentCard((prevCard) => (prevCard - 1 + totalCards) % totalCards);
  };

  return (
    <div className="subscriptions-page">
      <div className="subscription-container">
        <SubscriptionCard
          image={cards[currentCard].image}
          title={cards[currentCard].title}
          details={cards[currentCard].details}
        />
        <div className="arrow left-arrow" onClick={prevCard}>
          &#8592;
        </div>
        <div className="arrow right-arrow" onClick={nextCard}>
          &#8594;
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;
