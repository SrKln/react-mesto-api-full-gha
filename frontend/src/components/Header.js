
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <div className="header__logo" title="Mesto Россия" />
      <div className="header__user-info">

        <Routes>
          <Route
            path="/signin"
            element={
              <Link className="header__link" to="/signup">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/signup"
            element={
              <Link className="header__link" to="/signin">
                Войти
              </Link>
            }
          />
          <Route
            path="/"
            element={
              <>
                <p className="header__email-user">{email}</p>
                <button
                  className="header__button-out"
                  onClick={onSignOut}
                >
                  Выйти
                </button>
              </>
            }
          />
        </Routes>
      </div>

    </header>
  );
}

export default Header;
