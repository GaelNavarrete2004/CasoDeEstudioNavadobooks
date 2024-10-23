import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebaseConfig";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import "./SignUp.css";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // Crear usuario con correo y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Actualizar el perfil con el nombre de usuario
      await updateProfile(userCredential.user, {
        displayName: displayName,
      });

      // Redireccionar a la página de libros después de registrarse
      navigate("/CasoDeEstudioNavadobooks/book");
    } catch (err) {
      setError("Error al registrar. Verifica los datos.");
      console.error(err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Regístrate</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          required
        />
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
        <button type="submit" className="signup-btn">
          Crear Cuenta
        </button>
      </form>
    </div>
  );
};

export default SignUp;
