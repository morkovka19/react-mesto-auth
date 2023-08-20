import { useState } from "react";

export default function Form({
  title,
  submitTitle,
  onSubmit,
  onChangeEmail,
  onChangePassword,
}) {
  const handleOnSubmit = (e) => {
    onSubmit(e);
  };

  return (
    <form className="form" onSubmit={handleOnSubmit}>
      <h2 className="form__title">{title}</h2>
      <fieldset className="form__fieldset">
        <input
          className="form__input"
          type="email"
          placeholder="Email"
          name="email"
          id="email"
          onChange={onChangeEmail}
          required
        />
        <input
          className="form__input"
          type="password"
          placeholder="Пароль"
          name="password"
          id="password"
          onChange={onChangePassword}
          required
        />
      </fieldset>
      <button type="submit" className="form__submit">
        {submitTitle}
      </button>
    </form>
  );
}
