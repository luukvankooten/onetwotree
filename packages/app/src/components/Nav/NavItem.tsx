import { Link } from "react-router-dom";

type NavItemProps = {
  to: string;
  children: JSX.Element | string;
};

export default function NavItem({ to, children }: NavItemProps) {
  return (
    <li className="mr-6">
      <Link className="text-blue-500 hover:text-blue-800" to={to}>
        {children}
      </Link>
    </li>
  );
}
