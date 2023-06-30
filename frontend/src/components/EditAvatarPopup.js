import { memo, useRef } from 'react';
import PopupWithForm from './PopupWithForm';

const EditAvatarPopup = memo(({ isOpen, onClose, onUpdateAvatar, onOverlayClose }) => {
  const avatarRef = useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }
  return (
    <PopupWithForm
      name={'edit-avatar'}
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onOverlayClose={onOverlayClose}
      buttonText="Cохранить"
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        className="popup__input popup__input_avatar"
        id="popup__input-error_avatar"
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        required
      />
      <span className="popup__input-error popup__input-error_avatar-error" />

    </PopupWithForm>
  );
});

export default EditAvatarPopup;
