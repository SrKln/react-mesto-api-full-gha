function ImagePopup(props) {
  const card = props.card;
  return (
    <div className={`popup popup_open-image ${props.isOpen && 'popup_opened'}`} onMouseDown={props.onOverlayClose}>
      <div className="popup__image-container">
        <img
          className="popup__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <p className="popup__image-text">{card ? card.name : ""}</p>
        <button
          className="popup__close-button popup__close-button_image"
          onClick={props.onClose}
          type="button"
        />
      </div>
    </div>
  );
}

export default ImagePopup;
