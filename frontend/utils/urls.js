export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000/api"
    : "https://api.ecommerce-app.agustin-ribotta.xyz/api";

export const API_URL_BASE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://api.ecommerce-app.agustin-ribotta.xyz";
