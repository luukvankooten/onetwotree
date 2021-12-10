import * as yup from "yup";

const validator = yup
  .object({
    rating: yup.number().required().min(0).max(5),
  })
  .required();

export default validator;
