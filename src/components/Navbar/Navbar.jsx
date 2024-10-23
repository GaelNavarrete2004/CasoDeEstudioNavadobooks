import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import logoIMG from "../../images/logoIMG.png";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import SearchForm from "../SearchForm/SearchForm";
import { useGlobalContext } from "../../context";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [showOptions, setShowOptions] = useState(false); // Controla el menú del usuario
  const { user, logout } = useGlobalContext(); // Obtenemos el usuario del contexto
  const navigate = useNavigate();

  const handleNavbar = () => setToggleMenu(!toggleMenu);

  const handleUserClick = () => {
    setShowOptions(!showOptions); // Alterna la visibilidad del menú de opciones del usuario
  };

  const handleLogout = async () => {
    try {
      await logout(); // Cierra sesión
      navigate("/CasoDeEstudioNavadobooks/login"); // Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <nav className="navbar" id="navbar">
      <div className="container navbar-content flex">
        <div className="brand-and-toggler flex flex-sb">
          <Link to="/CasoDeEstudioNavadobooks/book" className="navbar-brand flex">
            <img src={logoIMG} alt="site logo" />
            <span className="text-uppercase fw-7 fs-24 ls-1">NavadoBooks</span>
          </Link>
          <button
            type="button"
            className="navbar-toggler-btn"
            onClick={handleNavbar}
          >
            <HiOutlineMenuAlt3
              size={35}
              style={{ color: `${toggleMenu ? "#fff" : "#010101"}` }}
            />
          </button>
        </div>

        <SearchForm />

        <div
          className={
            toggleMenu
              ? "navbar-collapse show-navbar-collapse"
              : "navbar-collapse"
          }
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/CasoDeEstudioNavadobooks/book"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/CasoDeEstudioNavadobooks/about"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to="/CasoDeEstudioNavadobooks/cart"
                className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
              >
                <i className="fa-solid fa-cart-shopping"></i>
              </Link>
            </li>

            <li className="nav-item">
              {user ? (
                <div className="user-info">
                  <span
                    className="nav-link user-name"
                    onClick={handleUserClick}
                    style={{ cursor: "pointer" }}
                  >
                    {user.displayName ? user.displayName : "Usuario"}{" "}
                    {/* Muestra el nombre del usuario */}
                  </span>

                  {/* Muestra opciones de usuario cuando se hace clic en el nombre */}
                  {showOptions && (
                    <div className="user-options">
                      <Link
                        to="/CasoDeEstudioNavadobooks/profile"
                        className="menu-btn"
                      >
                        Ver perfil
                      </Link>
                      <li className="menu-btn" onClick={handleLogout}>Cerrar sesión</li>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/CasoDeEstudioNavadobooks/login"
                  className="nav-link text-uppercase text-white fs-22 fw-6 ls-1"
                >
                  <i className="fa-solid fa-user"></i>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
