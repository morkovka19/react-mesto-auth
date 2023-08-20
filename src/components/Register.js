import { Link, useNavigate } from "react-router-dom";
import Form from "./Form";
import Header from "./Header";
import { useState } from "react";
import InfoTootip from "./InfoTootip";

export default function Register({ onSubmit, success }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleClosePopup = () => {
    setIsOpen(false);
    if (success) {
      navigate("/sign-in");
    } else {
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ password: password, email: email });
    setIsOpen(true);
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return (
    <>
      <InfoTootip
        isOpen={isOpen}
        success={success}
        onClose={handleClosePopup}
      />
      <Header buttonName={"Войти"} path="/sign-in" email={""} />
      <div className="register">
        <Form
          title={"Регистрация"}
          submitTitle={"Зарегистрироваться"}
          onSubmit={handleFormSubmit}
          onChangeEmail={handleChangeEmail}
          onChangePassword={handleChangePassword}
          onClose={handleClosePopup}
        />
        <Link to="/sign-in" className="register__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </>
  );
}
