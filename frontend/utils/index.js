export const statusColor = (status) => {
  const colors = {
    red: "#f75959",
    green: "#46f4c0",
    blue: "#5da3f7",
  }
  return status === "Aprobado"
    ? colors.green
    : status === "Rechazado"
    ? colors.red
    : status === "Pendiente"
    ? colors.blue
    : ""
}
export const formatData = (data) => {
  const dataDate = new Date(data)
  const options = { year: "numeric", month: "long", day: "numeric" }
  return dataDate.toLocaleDateString("es-AR", options)
}
