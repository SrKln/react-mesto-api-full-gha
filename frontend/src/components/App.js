import { useState, useEffect } from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { api } from '../utils/api';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import * as auth from '../utils/auth';

function App() {

  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isPopupPictureOpen, setIsPopupPictureOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);


  const [cards, setCards] = useState([]);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isRegStatPopupOpen, setIsRegStatPopupOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    handleTokenCheck();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleTokenCheck = () => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');
      auth.checkToken(token).then((res) => {
        if (res) {
          setLoggedIn(true);
          setEmail(res.data.email);
          navigate("/", { replace: true })
        }

      })
        .catch(err => console.log(err));
    }
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userInfo, initialCards]) => {
          setCurrentUser(userInfo);
          setCards(initialCards);
        })
        .catch(err => alert(err));
    }
  }, [loggedIn]);

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => alert(err));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(err => alert(err));
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => alert(err));
  }

  function handleUpdateAvatar(avatar) {
    api.setAvatar(avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(err => alert(err));
  }

  function handleAddPlace(data) {
    api.addCard(data.name, data.link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => alert(err));
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsPopupPictureOpen(true);
  };

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsPopupPictureOpen(false);
    setIsRegStatPopupOpen(false);
  };

  const closeAllPopupsByOverlay = (evt) => {
    if (evt.target === evt.currentTarget) {
      closeAllPopups()
    }
  };

  const handleSignOut = () => {
    setLoggedIn(false);
    setEmail('');
    localStorage.removeItem('token');
    navigate('/', { replace: true });
  }

  const handleSignin = () => {
    handleTokenCheck();
  }

  const handleRegister = (statReg) => {
    setIsSuccess(statReg);
    setIsRegStatPopupOpen(true);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <Header email={email} onSignOut={handleSignOut} />

        <Routes>
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" replace />} />
          <Route path="/" element={
            <ProtectedRoute
              element={Main}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              cards={cards}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />}
          />
          <Route path="/signup" element={<Register
            onRegister={handleRegister}
          />} />
          <Route path="/signin" element={<Login
            onLogin={handleSignin}
          />} />
        </Routes>



        <Footer />


        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          onOverlayClose={closeAllPopupsByOverlay}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          onOverlayClose={closeAllPopupsByOverlay}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
          onOverlayClose={closeAllPopupsByOverlay}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isPopupPictureOpen}
          onClose={closeAllPopups}
          onOverlayClose={closeAllPopupsByOverlay}
        />

        <InfoTooltip
          isOpen={isRegStatPopupOpen}
          onClose={closeAllPopups}
          isSuccess={isSuccess}
          onOverlayClose={closeAllPopupsByOverlay}
        />


      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
