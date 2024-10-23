import React from 'react';
import { useGlobalContext } from '../../context';
import Book from "../BookList/Book";
import Loading from "../Loader/Loader";
import coverImg from "../../images/CoverNotAvailable.jpg";
import "./BookList.css";

const BookList = () => {
  const { books, loading, resultTitle } = useGlobalContext();

  const booksWithCovers = books.map((singleBook) => {
    return {
      id: singleBook.id || "No ID available", // Usamos el ID directamente
      title: singleBook.title || "Title not found", // Accedemos directamente al título
      author: singleBook.author || "Author not found", // Accedemos directamente al autor
      first_publish_year: singleBook.first_publish_year || "Year not found", // Accedemos directamente al año de publicación
      averageRating: singleBook.averageRating || "No rating available", // Extraemos el rating
      page_count: singleBook.page_count || "N/A", // Accedemos directamente al número de páginas
      rating_count: singleBook.rating_count || "N/A", // Accedemos directamente al número de ratings
      cover_img: singleBook.cover_id || coverImg, // Usamos el cover_id directamente como URL de la imagen
    };
  });

  console.log(books);

  if (loading) return <Loading />;

  return (
    <section className='booklist'>
      <div className='container'>
        <div className='section-title'>
          <h2>{resultTitle}</h2>
        </div>
        <div className='booklist-content grid'>
          {booksWithCovers.length > 0 ? (
            booksWithCovers.slice(0, 30).map((item, index) => {
              return (
                <Book key={index} {...item} />
              );
            })
          ) : (
            <p>No books found</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default BookList;
