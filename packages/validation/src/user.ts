import * as yup from "yup";
import helper from "./helper";

const name = yup.string().required();
const username = yup.string().required();
const email = yup.string().email().required();
const password = yup.string().required();

const user = {
  id: yup.string().uuid().required(),
  name,
  username,
  email,
};

const validatorObject = yup
  .object({
    ...user,
    token: yup
      .object({
        accessToken: yup.string().required(),
        refreshToken: yup.string().required(),
        expiresIn: yup.number().required(),
        createdAt: yup.number().required(),
      })
      .required(),
    friends: yup.array().of(yup.object(user)).default([]),
  })
  .required();

export const newUserValidatorObject = yup
  .object({
    name,
    username: username.min(5).max(255),
    email,
    password: password.min(8).max(255),
  })
  .required();

export const loginUserValidatorObject = yup
  .object({
    email,
    password,
  })
  .required();

export async function validateRegisterUser(value: any) {
  return helper(newUserValidatorObject, value);
}

export async function validateLoginUser(value: any) {
  return helper(loginUserValidatorObject, value);
}

export function validateToken(value: any) {
  return helper(yup.object(user).required(), value);
}

export default (value: any) => helper(validatorObject, value);
