export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : "https://ecommerce-app-nextjs.herokuapp.com/api"

export const API_URL_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://ecommerce-app-nextjs.herokuapp.com"
