import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/navadobooks-react/book");
    } catch (err) {
      setError("Error al iniciar sesión. Verifica tus datos.");
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <h2>Inicia Sesión</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-btn">
          Iniciar Sesión
        </button>
      </form>
      <p className="signup-message">
        ¿Aún no tienes cuenta?{" "}
        <Link to="/navadobooks-react/signup" className="signup-link">
          Regístrate
        </Link>
      </p>
    </div>
  );
};

export default Login;
