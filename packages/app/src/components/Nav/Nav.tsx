import NavItem from "./NavItem";

export default function Nav() {
  return (
    <nav>
      <ul className="flex">
        <NavItem to="/">Home pagina</NavItem>
        <NavItem to="/about">Over</NavItem>
        <NavItem to="/rate-track">rate-track</NavItem>
      </ul>
    </nav>
  );
}
