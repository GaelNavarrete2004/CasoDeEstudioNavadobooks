import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Booklist from "./components/BookList/BookList";
import BookDetails from "./components/BookDetails/BookDetails";
import Login from './pages/Login/Login'; // Importa el componente de Login
import SignUp from './pages/SignUp/SignUp';
import UserProfile from './components/UserProfile/UserProfile'; // Importa el componente de UserProfile
import { AppProvider } from "./context";
import Cart from "./components/Cart/Cart";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppProvider>
    <BrowserRouter>
    <Routes>
      <Route path="/CasoDeEstudioNavadobooks" element={<Home />}>
        <Route path="/CasoDeEstudioNavadobooks/about" element={<About />} />
        <Route path="/CasoDeEstudioNavadobooks/book" element={<Booklist />} />
        <Route path="/CasoDeEstudioNavadobooks/book/:id" element={<BookDetails />} />
        <Route path="/CasoDeEstudioNavadobooks/profile" element={<UserProfile />} />
        <Route path="/CasoDeEstudioNavadobooks/cart" element={<Cart />} />
      </Route>
      <Route path="/CasoDeEstudioNavadobooks/login" element={<Login />} /> {/* Nueva ruta de login */}
      <Route path="/CasoDeEstudioNavadobooks/signup" element={<SignUp />} /> {/* Nueva ruta de registro */}
    </Routes>
    </BrowserRouter>
  </AppProvider>
);
