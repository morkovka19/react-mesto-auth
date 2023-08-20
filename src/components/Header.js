import HeaderLogo from "../images/icon/Vector-min.svg";
import React from "react";
import { Link } from "react-router-dom";

export default function Header({ children, email, path, buttonName, onClick }) {
  return (
    <header className="header root__container-center">
      <img className="header__logo" src={HeaderLogo} alt="логотип место" />
      {children}
      <div className="header__block-info">
        <span className="header__email">{email}</span>
        <Link to={path} className="header__link" onClick={onClick}>
          {buttonName}
        </Link>
      </div>
    </header>
  );
}
