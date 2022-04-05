import * as domain from "@12tree/domain";
import { updateUservalidatorObject } from "@12tree/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Element from "../Form/Element";
import Outlet from "./Outlet";
import Button from "../Button/Button";
import { useSelector } from "react-redux";
import { getAccessToken } from "../../features/auth/authSlice";
import { updateUser } from "../../features/user/userApi";

interface UserProps {
  user: domain.User;
  editMode: boolean;
  toggle: () => void;
}

interface EditUserData {
  name?: string;
  username?: string;
  email?: string;
  password?: string;
}

export default function User({ user, editMode, toggle }: UserProps) {
  const cToken = useSelector(getAccessToken);

  const form = useForm<EditUserData>({
    resolver: yupResolver(updateUservalidatorObject),
    defaultValues: {
      name: user.name,
      username: user.username,
      email: user.email,
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    user.name = data.name ?? user.name;
    user.email = data.email ?? user.email;
    user.username = data.username ?? user.username;

    toggle();

    await updateUser(user, cToken);
  });

  const edit = {
    name: editMode ? (
      <Element name="name" value={user.name} formHook={form} />
    ) : (
      user.name
    ),
    email: editMode ? (
      <Element name="email" value={user.email} formHook={form} />
    ) : (
      user.email
    ),
    username: editMode ? (
      <Element name="username" value={user.username} formHook={form} />
    ) : (
      user.username
    ),
    password: editMode ? (
      <Element name="password" type="password" formHook={form} />
    ) : undefined,
  };

  const outlet = (
    <Outlet
      username={edit.username}
      email={edit.email}
      name={edit.name}
      password={edit.password}
    />
  );

  if (editMode) {
    return (
      <form onSubmit={onSubmit}>
        {outlet}
        <Button type="submit">Opslaan</Button>
      </form>
    );
  }

  return outlet;
}
