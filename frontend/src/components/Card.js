import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

const Card = (props) => {
  const currentUser = useContext(CurrentUserContext);

  const card = props.card;
  const isOwn = (card.owner._id || card.owner) === currentUser._id;
  const isLiked = card.likes.some(like => like._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked && 'element__like_active'}`
  );

  function handleClick() {
    props.onCardClick(card);
  }

  function handleLikeClick() {
    props.onCardLike(card);
  }

  function handleDeleteClick() {
    props.onCardDelete(card);
  }

  return (
    <li className="element">
      <img
        onClick={handleClick}
        className="element__image"
        src={card.link}
        alt={card.name}
      />
      <div className="element__info">
        <h2 className="element__title">{card.name}</h2>
        {isOwn &&
          <button
            className="element__delete"
            onClick={handleDeleteClick}
            type="button"
          />
        }
        <div className="element__likes">
          <button
            className={cardLikeButtonClassName}
            onClick={handleLikeClick}
            type="button"
          />
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  )
};

export default Card;



