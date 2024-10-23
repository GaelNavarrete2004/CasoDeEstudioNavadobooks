import React, { useState, useEffect } from 'react';
import { auth, storage } from "../../firebaseConfig"; // Importar la configuración de Firebase
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './UserProfile.css';
import lordOfTheRings from '../../images/lord.webp';
import oneHundredDays from '../../images/100.webp';

const UserProfile = () => {
  const [user, setUser] = useState({
    displayName: '',
    email: '',
    photoURL: '/placeholder.svg?height=128&width=128',
    booksPurchased: [],
  });
  const [isEditing, setIsEditing] = useState(false); // Nuevo estado para controlar si se está editando
  const [uploading, setUploading] = useState(false);
  const [newDisplayName, setNewDisplayName] = useState(''); // Estado para el nuevo nombre
  const [newPhotoURL, setNewPhotoURL] = useState(''); // Estado para la nueva foto

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName || 'Usuario',
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL || '/placeholder.svg?height=128&width=128',
          booksPurchased: [
            { title: 'El señor de los anillos', cover: lordOfTheRings },
            { title: 'Cien años de soledad', cover: oneHundredDays },
          ],
        });
        setNewDisplayName(firebaseUser.displayName || ''); // Inicializar el nuevo nombre
        setNewPhotoURL(firebaseUser.photoURL || '/placeholder.svg?height=128&width=128'); // Inicializar la nueva foto
      }
    });

    return () => unsubscribe();
  }, []);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const storageRef = ref(storage, `profilePictures/${auth.currentUser.uid}`);
      setUploading(true);

      try {
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setNewPhotoURL(downloadURL); // Actualizar la nueva URL localmente
      } catch (error) {
        console.error('Error al subir la imagen: ', error);
        alert('Hubo un error al subir la imagen.');
      } finally {
        setUploading(false);
      }
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true); // Habilitar el modo de edición
  };

  const handleSaveChanges = async () => {
    try {
      // Actualizar el perfil del usuario en Firebase Authentication
      await updateProfile(auth.currentUser, {
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      });

      // Actualizar el estado local del usuario
      setUser((prevUser) => ({
        ...prevUser,
        displayName: newDisplayName,
        photoURL: newPhotoURL,
      }));

      setIsEditing(false); // Desactivar el modo de edición
      alert('Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error al actualizar el perfil: ', error);
      alert('Hubo un error al actualizar el perfil.');
    }
  };

  const handleCancelEdit = () => {
    // Restaurar los valores originales si el usuario cancela la edición
    setNewDisplayName(user.displayName);
    setNewPhotoURL(user.photoURL);
    setIsEditing(false);
  };

  const handleLogout = () => {
    alert('Sesión cerrada.');
  };

  return (
    <div className="user-profile">
      <h2 className="profile-title">Perfil de Usuario</h2>
      <div className="profile-content">
        <div className="profile-image">
          <img src={isEditing ? newPhotoURL : user.photoURL} alt={user.displayName} className="avatar" />
          {isEditing && (
            <label htmlFor="picture" className="change-photo-label">
              {uploading ? 'Subiendo...' : 'Cambiar foto'}
              <input
                id="picture"
                type="file"
                accept="image/*"
                className="hidden-input"
                onChange={handleFileChange}
                disabled={uploading}
              />
            </label>
          )}
        </div>
        <div className="profile-info">
          <div className="info-group">
            <label htmlFor="name">Nombre</label>
            {isEditing ? (
              <input
                id="name"
                value={newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="info-input"
              />
            ) : (
              <input id="name" value={user.displayName} readOnly className="info-input" />
            )}
          </div>
          <div className="info-group">
            <label htmlFor="email">Correo electrónico</label>
            <input id="email" value={user.email} readOnly className="info-input" />
          </div>
          <div className="info-group">
            <label>Libros comprados</label>
            <div className="books-list">
              {user.booksPurchased.map((book, index) => (
                <div key={index} className="book-item">
                  <img src={book.cover} alt={book.title} className="book-cover" />
                  <span>{book.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="profile-footer">
        {isEditing ? (
          <>
            <button className="save-changes-button" onClick={handleSaveChanges}>
              Guardar cambios
            </button>
            <button className="cancel-edit-button" onClick={handleCancelEdit}>
              Cancelar
            </button>
          </>
        ) : (
          <>
            <button className="edit-profile-button" onClick={handleEditProfile}>
              Editar perfil
            </button>
            <button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
