// SubscriptionCard.js
import React from 'react';
import "../styles/subscription.css"
import { Link } from 'react-router-dom';

const SubscriptionCard = ({ title, image, details }) => {
  let formPath = '';
  if (title === 'Voiture') {
    formPath = '/Voiture';
  } else if (title === 'Habitation') {
    formPath = '/Habitation';
  } else if (title === 'Projet Personnelle') {
    formPath = '/Projet';
  } else if (title === 'Santé') {
    formPath = '/sante';
  }
  else if (title === 'Retraite') {
    formPath = '/retraite';
  }
  return (
    <div className="subscription-card">
      <img className="subscription-image" src={image} alt={title} />
      <h3 className="subscription-title">{title}</h3>
      <p className="subscription-details">{details}</p>
      <Link to={formPath}>
        <button className="subscription-button">Subscribe</button>
      </Link>
    </div>
  );
};

export default SubscriptionCard;
