import { useSelector } from "react-redux";
import { getUser } from "../../features/auth/authSlice";
import NavItem from "./NavItem";

export default function Nav() {
  const user = useSelector(getUser);

  return (
    <nav className="mb-6">
      <ul className="flex">
        <NavItem to="/">Home pagina</NavItem>
        <NavItem to="/about">Over</NavItem>
        <NavItem to={`/users/${user.id}`}>Mijn account</NavItem>
      </ul>
    </nav>
  );
}
