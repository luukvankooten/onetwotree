import { Link } from "react-router-dom";
import NavItem from "./NavItem";

export default function Nav() {
  return (
    <nav>
      <ul className="flex">
        <NavItem to="/">Home pagina</NavItem>
        <NavItem to="/about">Over</NavItem>
      </ul>
    </nav>
  );
}
