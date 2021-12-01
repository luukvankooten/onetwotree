import * as yup from "yup";

const validator = yup.object({
  comment: yup.string().required(),
});

export default validator;
