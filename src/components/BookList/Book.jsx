import React from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context"; // Importa el contexto
import "./BookList.css";
import StarRating from "../Stars/StarRating";

const Book = ({
  cover_img,
  title,
  averageRating,
  page_count,
  rating_count,
  id,
}) => {
  const { addToCart } = useGlobalContext(); // Accede a la función para agregar al carrito

  const handleAddToCart = () => {
    const book = { id, title, cover_img, averageRating, page_count, price: 200 }; // Establecemos un precio fijo de $200
    addToCart(book); // Llama a la función con la información del libro
  };

  return (
    <div className="book-item flex flex-column flex-sb">
      <div className="book-item-img">
        <img src={cover_img} alt="cover" />
      </div>
      <div className="book-item-info text-center">
        <Link to={`/navadobooks-react/book/${id}`}>
          <div className="book-item-info-item title fw-7 fs-18">
            <span>{title}</span>
          </div>
        </Link>

        <div className="book-item-info-item price fs-15">
          <span className="text-capitalize fw-7">Page Count: </span>
          <span>{page_count ? page_count : "N/A"}</span>
        </div>

        <div className="book-item-info-item rating fs-15">
          <span className="text-capitalize fw-7">Rating: </span>
          <StarRating rating={averageRating} ratingCount={rating_count} />
        </div>

        {/* Botón para agregar al carrito */}
        <button className="btn-add-cart" onClick={handleAddToCart}>
          Agregar al carrito
        </button>
      </div>
    </div>
  );
};

export default Book;
