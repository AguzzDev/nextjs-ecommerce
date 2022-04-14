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
      { value: "blanco", label: "Blanco" },
      { value: "negro", label: "Negro" },
      { value: "gris", label: "Gris" },
      { value: "gris oscuro", label: "Gris oscuro" },
      { value: "rojo", label: "Rojo" },
      { value: "naranja", label: "Naranja" },
      { value: "amarillo", label: "Amarillo" },
      { value: "verde", label: "Verde" },
      { value: "azul", label: "Azul" },
      { value: "violeta", label: "Violeta" },
      { value: "rosa", label: "Rosa" },
      { value: "marron", label: "Marron" },
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
      { value: "camisa", label: "Camisa" },
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
  {
    id: "size2",
    name: "Tallas",
    options: [
      { value: "36", label: "36" },
      { value: "37", label: "37" },
      { value: "38", label: "38" },
      { value: "39", label: "39" },
      { value: "40", label: "40" },
      { value: "41", label: "41" },
    ],
  },
]

export default filters
