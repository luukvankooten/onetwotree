import * as yup from "yup";
import helper from "./helper";

const user = {
  id: yup.string().uuid().required(),
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().email().required(),
};

const validator = yup
  .object({
    ...user,
    token: yup.object({
      accessToken: yup.string().required(),
      refreshToken: yup.string().required(),
      expiresIn: yup.number().required(),
      createdAt: yup.number().required(),
    }),
    friends: yup.array().of(yup.object(user)).default([]),
  })
  .required();

export const newUserValidatorObject = yup
  .object({
    name: yup.string().required(),
    username: yup.string().required().min(5).max(255),
    email: yup.string().email().required(),
    password: yup.string().required().min(8).max(255),
  })
  .required();

export async function validateRegisterUser(value: any) {
  return helper(newUserValidatorObject, value);
}

export async function validateToken(value: any) {
  return helper(yup.object(user).required(), value);
}

export default (value: any) => helper(validator, value);
