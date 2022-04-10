import React, { useState } from "react";
import { newUserValidatorObject } from "@12tree/validation";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Element from "../components/Form/Element";
import FormOutlet from "../components/Form/FormOutlet";
import SubmitButton from "../components/Form/SubmitButton";
import ApiFetch from "../utils/apiFetch";
import { Navigate } from "react-router-dom";
import { ButtonLoading } from "../components/Button/ButtonLoading";
import { useAppDispatch } from "../app/hooks";
import { add } from "../features/error/errorSlice";

type RegisterData = ReturnType<typeof newUserValidatorObject.validateSync>;

export default function Register() {
  const [isLoading, setLoading] = useState(false);
  const [isRegistered, setRegister] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<RegisterData>({
    resolver: yupResolver(newUserValidatorObject),
  });

  const onSubmit = form.handleSubmit(async (data) => {
    setLoading(true);

    try {
      await ApiFetch<RegisterData & { id: string }>(
        "",
        "/auth/register",
        { method: "POST", body: JSON.stringify(data) },
        ""
      );
    } catch (err) {
      console.log(err);
      dispatch(add(err));
      return;
    }

    setRegister(true);
  });

  if (isRegistered) {
    return <Navigate to="/login" />;
  }

  return (
    <FormOutlet title="Registeren" onSubmit={onSubmit}>
      <React.Fragment>
        <Element labelText="Naam" name="name" type="text" formHook={form} />
        <Element
          labelText="Gebruikers naam"
          name="username"
          type="text"
          formHook={form}
        />
        <Element labelText="Email" name="email" type="email" formHook={form} />
        <Element
          labelText="Wachtwoord"
          name="password"
          type="password"
          formHook={form}
        />
        {isLoading ? <ButtonLoading /> : <SubmitButton text="Registeren" />}
      </React.Fragment>
    </FormOutlet>
  );
}
