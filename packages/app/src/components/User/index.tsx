import * as domain from "@12tree/domain";
import useToggle from "../../hooks/useToggle";
import Edit from "./Edit";
import Info from "./Info";

interface UserProps {
  user: domain.User;
  editMode: boolean;
}

export default function User({ user, editMode }: UserProps) {
  if (editMode) {
    return <Edit />;
  }

  return <Info user={user} />;
}
