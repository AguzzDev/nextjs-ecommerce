export const descFormat = (data) => {
  return data?.includes("\n") ? data.split("\n").map((p) => <p>{p}</p>) : data
}
export const titleFilter = (state) => {
  return state === 0
    ? "Todos"
    : state === 1
    ? "Últimos 30 dias"
    : state === 3
    ? "Más de 3 meses"
    : state === 6
    ? "Más de 6 meses"
    : state === 12
    ? "Más de 12 meses"
    : null
}
export const cardBrand = (type) => {
  return type === "visa" ? "/visa.svg" : "/mastercard.svg"
}
export const dateMonthFormat = (date) => {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}
export const priceFormat = (price) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price
  )
export const colorType = (color) => {
  const types = {
    Blanco: "rgb(255,255,255)",
    Negro: "rgb(0 0 0)",
    Gris: "rgb(209 213 219)",
    GrisOscuro: "rgb(75 85 99)",
    Rojo: "rgb(239 68 68)",
    Naranja: "rgb(245 158 11)",
    Amarillo: "rgb(245 158 11)",
    Verde: "rgb(34 197 94)",
    Azul: "rgb(37 99 235)",
    Violeta: "rgb(192 132 252)",
    Rosa: "rgb(244 114 182",
    Marron: "rgb(120 53 15)",
  }
  return color === "blanco"
    ? types.Blanco
    : color === "negro"
    ? types.Negro
    : color === "gris"
    ? types.Gris
    : color === "gris oscuro"
    ? types.GrisOscuro
    : color === "rojo"
    ? types.Rojo
    : color === "naranja"
    ? types.Naranja
    : color === "amarillo"
    ? types.Amarillo
    : color === "verde"
    ? types.Verde
    : color === "azul"
    ? types.Azul
    : color === "violeta"
    ? types.Violeta
    : color === "rosa"
    ? types.Rosa
    : color === "marron"
    ? types.Marron
    : null
}
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    weekday: "short",
    year: "numeric",
  })
}
