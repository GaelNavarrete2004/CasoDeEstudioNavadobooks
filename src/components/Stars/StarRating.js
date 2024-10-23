import React from 'react';
import './StarRating.css';

const StarRating = ({ rating, ratingCount }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 !== 0; // Si hay un decimal, significa que hay una media estrella
  const totalStars = 5; // Total de estrellas que deseas mostrar

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        if (index < fullStars) {
          return <span key={index} className="star"><i className="fas fa-star"></i></span>; // Estrella llena
        } else if (halfStar && index === fullStars) {
          return <span key={index} className="star half-filled"><i className="fas fa-star-half-alt"></i></span>; // Media estrella
        } else {
          return <span key={index} className="star"><i className="far fa-star"></i></span>; // Estrella vacía
        }
      })}

      {/* Agregar el rating count al lado de las estrellas */}
      {ratingCount && (
        <span className="rating-count"> ({ratingCount})</span>
      )}
    </div>
  );
};

export default StarRating;

