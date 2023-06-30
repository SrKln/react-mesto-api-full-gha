import { memo, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const AddPlacePopup = memo(({ isOpen, onClose, onAddPlace, onOverlayClose }) => {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleNameChange(evt) {
    setName(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    onAddPlace({
      name,
      link
    });
  }

  return (
    <PopupWithForm
      name={'add-element'}
      title="Новое место"
      onOverlayClose={onOverlayClose}
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}

    >
      <input
        onChange={handleNameChange}
        type="text"
        className="popup__input popup__input_element-title"
        id="element-title-input"
        name="name"
        placeholder="Название"
        minLength={2}
        maxLength={30}
        value={name || ''}
        required
      />
      <span className="popup__input-error element-title-input-error" />
      <input
        onChange={handleLinkChange}
        type="url"
        className="popup__input popup__input_element-image"
        id="element-image-input"
        name="link"
        placeholder="Ссылка на картинку"
        value={link || ''}
        required
      />
      <span className="popup__input-error element-image-input-error" />

    </PopupWithForm>
  );
});

export default AddPlacePopup;
