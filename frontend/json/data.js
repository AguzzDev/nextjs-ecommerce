const filters = [
  {
    id: "price",
    name: "Precio",
    options: [
      { value: "asc", label: "Mas caro" },
      { value: "desc", label: "Mas barato" },
    ],
  },
  {
    id: "color",
    name: "Color",
    options: [
      { value: "blanco" },
      { value: "negro" },
      { value: "gris" },
      { value: "gris oscuro" },
      { value: "rojo" },
      { value: "naranja" },
      { value: "amarillo" },
      { value: "verde" },
      { value: "azul" },
      { value: "violeta" },
      { value: "rosa" },
      { value: "marron" },
    ],
  },
  {
    id: "category",
    name: "Categorias",
    options: [
      { value: "remera", label: "Remera" },
      { value: "pantalon", label: "Pantalon" },
      { value: "buzo", label: "Buzo" },
      { value: "vestido", label: "Vestido" },
      { value: "zapato", label: "Zapato" },
      { value: "zapatilla", label: "Zapatilla" },
      { value: "sombrero", label: "Sombrero" },
      { value: "bolso", label: "Bolso" },
      { value: "media", label: "Media" },
      { value: "ropa-interior", label: "Ropa Interior" },
      { value: "camisetas", label: "Camisetas" },
    ],
  },
  {
    id: "size",
    name: "Tallas",
    options: [
      { value: "xs", label: "XS" },
      { value: "s", label: "S" },
      { value: "m", label: "M" },
      { value: "l", label: "L" },
      { value: "xl", label: "XL" },
      { value: "xxl", label: "XXL" },
    ],
  },
]

export default filters
