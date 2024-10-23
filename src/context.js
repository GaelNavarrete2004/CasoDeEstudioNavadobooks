import React, { useState, useContext, useEffect, useCallback } from "react";
import { auth } from "./firebaseConfig"; // Importa Firebase auth
import { onAuthStateChanged, signOut } from "firebase/auth";

const URL = "https://www.googleapis.com/books/v1/volumes?q=";
const API_KEY = "AIzaSyDzfiCMdEHjMAQL3KOzXd-7T989k5h6Tes";
const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("harry potter");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultTitle, setResultTitle] = useState("");
  const [user, setUser] = useState(null); // Nuevo estado para el usuario
  const [cart, setCart] = useState([]);

  // Agregar un libro al carrito
  const addToCart = (book) => {
    setCart([...cart, { ...book, price: 200 }]); // Asignamos precio fijo de 200
  };

  // Detecta cambios en el estado del usuario autenticado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${URL}${searchTerm}&key=${API_KEY}&maxResults=20`
      );
      const data = await response.json();
      const { items } = data;

      if (items) {
        const newBooks = items.slice(0, 20).map((bookSingle) => {
          const { id, volumeInfo, saleInfo } = bookSingle;
          const {
            authors,
            imageLinks,
            title,
            publishedDate,
            pageCount,
            ratingsCount,
            averageRating,
          } = volumeInfo;

          const price =
            saleInfo?.retailPrice?.amount ||
            saleInfo?.listPrice?.amount ||
            "N/A";

          return {
            id,
            author: authors ? authors.join(", ") : "N/A",
            cover_id: imageLinks?.thumbnail,
            title,
            first_publish_year: publishedDate,
            page_count: pageCount || "N/A",
            rating_count: ratingsCount || "N/A",
            averageRating: averageRating || "N/A",
            price,
          };
        });

        setBooks(newBooks);
        setResultTitle(
          newBooks.length > 1 ? "Your Search Result" : "No Search Result Found!"
        );
      } else {
        setBooks([]);
        setResultTitle("No Search Result Found!");
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [searchTerm, fetchBooks]);

  // Cerrar sesión
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        books,
        setSearchTerm,
        resultTitle,
        setResultTitle,
        user, // Exponemos el usuario
        logout, // Exponemos la función de logout
        cart,
        addToCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider };
