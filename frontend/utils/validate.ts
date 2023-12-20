import * as yup from "yup";

export const validateLogin = yup.object().shape({
  email: yup.string().email("Email no valido").required("Requerido"),
  password: yup.string().required("Requerido"),
});

export const validateRegister = yup.object().shape({
  email: yup.string().email("Email no valido").required("Requerido"),
  password: yup.string().min(8,"La contraseña debe tener 8 caracteres o mas").required("Requerido"),
  name: yup.string().required("Requerido"),
  surname: yup.string().required("Requerido"),
  address: yup.string().required("Requerido"),
  address_number: yup.string().required("Requerido"),
  city: yup.string().required("Requerido"),
  country: yup.string().required("Requerido"),
  province: yup.string().required("Requerido"),
  postal_code: yup.number().required("Requerido"),
});
