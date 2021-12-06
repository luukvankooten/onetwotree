import * as yup from "yup";

type Return<T> = [null, T] | [yup.ValidationError];

export default async function <T extends yup.AnyObjectSchema>(
  yup: T,
  schema: any
): Promise<Return<ReturnType<typeof yup.validateSync>>> {
  try {
    return [null, yup.validateSync(schema)];
  } catch (err) {
    return [err as yup.ValidationError];
  }
}
