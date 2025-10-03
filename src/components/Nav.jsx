import { Link } from "react-router";
import "./Nav.css";

export function Nav() {
  return (
    <nav className="nav">
      <ul className="nav__menu underline">
        <li className="nav__menu-item">
          <Link to="/">Drugs</Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/">Drug Target Search</Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/">Drug Interaction Search</Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/">Symptom Checker</Link>
        </li>
        <li className="nav__menu-item">
          <Link to="/">About</Link>
        </li>
      </ul>
    </nav>
  );
}
