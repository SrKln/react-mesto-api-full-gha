import { memo } from 'react';
import success from '../images/icon-reg-success.svg';
import fail from '../images/icon-reg-fail.svg';



const InfoTooltip = memo((props) => {

  const iconAuth = props.isSuccess ? success : fail;
  const textAuth = props.isSuccess ? 'Вы успешно зарегистрировались!' : 'Что-то пошло не так!  Попробуйте ещё раз.';

  return (
    <div className={`popup popup_reg-status ${props.isOpen && 'popup_opened'}`} onMouseDown={props.onOverlayClose}>
      <div className="popup__container popup__container_type_auth">
        <button
          className="popup__close-button popup__close-button_image "
          onClick={props.onClose}
          type="button"
        />
        <img
          className="popup__info-image"
          src={iconAuth}
          alt='Иконка статуса регистрации'
        />
        <p className="popup__reg-text">{textAuth}</p>
      </div>
    </div>
  )
});

export default InfoTooltip;
