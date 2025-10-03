import { Link } from "react-router";
import logo from "../assets/pill_logo.png";
import "./Header.css";

export function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__branding">
          <img className="header__logo" src={logo} />
          <h1 className="header__logo-text">
            <span>Drug</span>
            <span>Library</span>
          </h1>
        </Link>
        <div className="header__search">
          <input
            className="header__search-bar"
            type="text"
            placeholder="Search a drug"
          />
          <button className="header__search-button">
            <span>{">"}</span>
          </button>
        </div>
        <div className="header__misc">
          <button className="header__sign-in-button">
            <span>Sign In</span>
          </button>
        </div>
      </div>
    </header>
  );
}
