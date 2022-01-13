import { FormikHelpers } from 'formik';

type errorsType = {
  email?: string
  password?: string
};

type valueType = {
  email: string
  password: string
}

export const handleSubmit = (handleLogin: any) => async (values: valueType, helpers: FormikHelpers<any>) => {
  const errors: errorsType = {};
  helpers.setSubmitting(true);

  if (!values.email) errors.email = 'Обязательное поле';
  if (!values.password) errors.password = 'Обязательное поле';

  if (Object.keys(errors).length) return helpers.setErrors(errors);

  await handleLogin({ variables: { email: values.email, password: values.password } });

  return false;
};