import * as yup from "yup";

const validator = yup
  .object({
    comment: yup.string().required(),
  })
  .required();

export default validator;
