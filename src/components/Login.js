import React from "react";
import Header from "./Header";
import Form from "./Form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Login({ onSubmit, loggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSubmit({ password: password, email: email });
    if (loggedIn) {
      navigate("/");
    }
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
      {loggedIn ? <Navigate to="/" replace /> : null}
      <Header buttonName={"Регистрация"} path="/sign-up" email={""} />
      <div className="login">
        <Form
          title={"Вход"}
          submitTitle={"Войти"}
          onSubmit={handleFormSubmit}
          onChangeEmail={handleChangeEmail}
          onChangePassword={handleChangePassword}
        />
      </div>
    </>
  );
}
