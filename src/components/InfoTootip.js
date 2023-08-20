import ImagePopup from "./ImagePopup";
import SuccessImage from "../images/icon/success.svg";
import NoSuccessImage from "../images/icon/no-success.svg";
import closeIcon from "../images/icon/close-icon-min.svg";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function InfoTootip({ isOpen, success, onClose }) {
  const handleCloseOn = () => {
    onClose();
  };

  return (
    <section
      className={`popup popup_type_success ${isOpen ? "popup_opened" : ""}`}
      id={`popup-${success ? "success" : "unsuccess"}`}
    >
      <div className="popup__container info-tootip__container">
        <button className="popup__btn" onClick={handleCloseOn} type="reset">
          <img className="popup__icon" src={closeIcon} alt="иконка крестик" />
        </button>
        <div className="info-tootip">
          <img
            className="info-tootip__img"
            src={success ? SuccessImage : NoSuccessImage}
          />
          <p className="info-tootip__text">
            {success
              ? "Вы успешно зарегистрировались!"
              : "Что-то пошло не так! Попробуйте ещё раз."}
          </p>
        </div>
      </div>
    </section>
  );
}
