import { memo, useContext, useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const EditProfilePopup = memo(({ isOpen, onClose, onUpdateUser, onOverlayClose }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleDescriptionChange(evt) {
    setDescription(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      name={'profile'}
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      buttonText="Сохранить"
      onSubmit={handleSubmit}
      onOverlayClose={onOverlayClose}
    >
      <input
        value={name || ''}
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_profile_title"
        id="profile-title-input"
        name="name"
        placeholder="Введите Имя"
        minLength={2}
        maxLength={40}
        required
      />
      <span className="popup__input-error profile-title-input-error" />
      <input
        value={description || ''}
        onChange={handleDescriptionChange}
        type="text"
        className="popup__input popup__input_profile_subtitle"
        id="profile-subtitle-input"
        name="about"
        placeholder="Добавьте пояснение"
        minLength={2}
        maxLength={200}
        required
      />
      <span className="popup__input-error profile-subtitle-input-error" />

    </PopupWithForm>
  );
});

export default EditProfilePopup;
