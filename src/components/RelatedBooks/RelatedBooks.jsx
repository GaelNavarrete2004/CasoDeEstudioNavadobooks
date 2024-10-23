// src/components/RelatedBooks/RelatedBooks.jsx

import React, { useEffect, useState } from 'react';
import './RelatedBooks.css';

const RelatedBooks = ({ title, categories, authors }) => {
  const [relatedBooks, setRelatedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const URL = 'https://www.googleapis.com/books/v1/volumes?q=';

  useEffect(() => {
    async function fetchRelatedBooks() {
      setLoading(true);
      try {
        // Crea una consulta combinando categorías y autores
        const categoryQuery = categories ? `subject:${encodeURIComponent(categories[0])}` : '';
        const authorQuery = authors ? `inauthor:${encodeURIComponent(authors[0])}` : '';
        
        // Usa un query que combine ambas búsquedas
        const query = `${categoryQuery} ${authorQuery}`.trim().replace(/\s+/g, '+');

        const response = await fetch(`${URL}${query}`);
        const data = await response.json();
        if (data.items) {
          const books = data.items.map(item => ({
            id: item.id,
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors || ['Unknown Author'],
            cover: item.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/128x200',
          }));
          setRelatedBooks(books);
        }
      } catch (error) {
        console.error('Error fetching related books:', error);
      } finally {
        setLoading(false);
      }
    }

    if (title) {
      fetchRelatedBooks();
    }
  }, [title, categories, authors]);

  if (loading) return <div>Loading related books...</div>;

  return (
    <div className="related-books">
      <h2>Related Books</h2>
      <div className="related-books-list">
        {relatedBooks.length > 0 ? (
          relatedBooks.map(book => (
            <div key={book.id} className="related-book">
              <img src={book.cover} alt={book.title} />
              <h3>{book.title}</h3>
              <p>{book.authors.join(', ')}</p>
            </div>
          ))
        ) : (
          <p>No related books found.</p>
        )}
      </div>
    </div>
  );
};

export default RelatedBooks;
