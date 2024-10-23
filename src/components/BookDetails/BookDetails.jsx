import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loader/Loader";
import coverImg from "../../images/CoverNotAvailable.jpg";
import "./BookDetails.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const URL = "https://www.googleapis.com/books/v1/volumes/";
const API_KEY = "AIzaSyDzfiCMdEHjMAQL3KOzXd-7T989k5h6Tes";

const BookDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [book, setBook] = useState(null);
  const [relatedBooks, setRelatedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    async function getBookDetails() {
      try {
        const response = await fetch(`${URL}${id}?key=${API_KEY}`);
        const data = await response.json();
        
        if (data) {
          const volumeInfo = data.volumeInfo;
          const {
            description,
            title,
            authors,
            publishedDate,
            categories,
            imageLinks,
          } = volumeInfo;

          const newBook = {
            description: description || "No description found",
            title: title || "Title not found",
            authors: authors ? authors.join(", ") : "Authors not found",
            publishedDate: publishedDate || "Date not found",
            categories: categories
              ? categories.join(", ")
              : "No categories found",
            cover_img: imageLinks ? imageLinks.thumbnail : coverImg,
          };

          setBook(newBook);
          fetchRelatedBooks(title); // Llama a la función para obtener libros relacionados
        } else {
          setBook(null);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    getBookDetails();
  }, [id]);

 // Función para obtener libros relacionados utilizando el título del libro
const fetchRelatedBooks = async (title) => {
  setLoading(true);
  try {
      const response = await fetch(`${URL}?q=${encodeURIComponent(title)}&maxResults=20&key=${API_KEY}`);
      const data = await response.json();
      
      if (data.items) {
          const books = data.items.map(item => ({
              id: item.id,
              title: item.volumeInfo.title,
              authors: item.volumeInfo.authors || ['Unknown Author'],
              cover: item.volumeInfo.imageLinks?.thumbnail || coverImg,
          }));
          setRelatedBooks(books);
      }
  } catch (error) {
      console.error('Error fetching related books:', error);
  } finally {
      setLoading(false);
  }
};

  if (loading) return <Loading />;

  return (
    <section className="book-details">
      <div className="container">
        <button
          type="button"
          className="flex flex-c back-btn"
          onClick={() => navigate("/navadobooks-react/book")}
        >
          <FaArrowLeft size={22} />
          <span className="fs-18 fw-6">Go Back</span>
        </button>

        <div className="book-details-content grid">
          <div className="book-details-img">
            <img src={book?.cover_img} alt="cover img" />
          </div>
          <div className="book-details-info">
            <div className="book-details-item title">
              <span className="fw-6 fs-24">{book?.title}</span>
            </div>
            <div className="book-details-item description">
              <div dangerouslySetInnerHTML={{ __html: book?.description }} />
            </div>
            <div className="book-details-item">
              <span className="fw-6">Authors: </span>
              <span>{book?.authors}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Published Date: </span>
              <span>{book?.publishedDate}</span>
            </div>
            <div className="book-details-item">
              <span className="fw-6">Categories: </span>
              <span>{book?.categories}</span>
            </div>
          </div>
        </div>

        {/* Sección de libros relacionados */}
        <div className="related-books">
          <h2>Libros Relacionados</h2>
          <div className="related-books-list">
            {relatedBooks
              .filter((relatedBook) => relatedBook.id !== id) // Excluye el libro actual
              .map((relatedBook) => (
                <div
                  className="related-book"
                  key={relatedBook.id}
                  onClick={() => navigate(`/navadobooks-react/book/${relatedBook.id}`)}
                >
                  <img src={relatedBook.cover} alt={relatedBook.title} />
                  <h3>{relatedBook.title}</h3>
                  <p>{relatedBook.authors.join(", ")}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookDetails;