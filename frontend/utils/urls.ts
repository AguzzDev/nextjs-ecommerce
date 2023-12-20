export const API_URL: string =
  process.env.NODE_ENV == "development"
    ? "http://localhost:8000/api"
    : "https://api.ecommerce-app.agustin-ribotta.xyz/api";
