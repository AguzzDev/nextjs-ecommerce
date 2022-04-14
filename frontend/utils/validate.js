import * as yup from "yup"

export const validateLogin = yup.object().shape({
  email: yup.string().email("Email no valido").required("Email es requerido"),
  password: yup.string().required("Contraseña es requerida"),
})

export const validateRegister = yup.object().shape({
  email: yup.string().email("Email no valido").required("Email es requerido"),
  password: yup.string().required("Requerido"),
  username: yup.string().required("Requerido"),
  password: yup.string().required("Requerido"),
})

export const validateAddress = yup.object().shape({
  address: yup.string().required("Requerido"),
  city: yup.string().required("Requerido"),
  country: yup.string().required("Requerido"),
  province: yup.string().required("Requerido"),
  postal_code: yup.number().required("Requerido"),
})
