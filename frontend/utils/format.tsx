import { TitleFilterEnum } from "interfaces";

export const descFormat = (data: string): string | Array<JSX.Element> => {
  return data?.includes("\n") ? data.split("\n").map((p) => <p>{p}</p>) : data;
};

export const titleFilter = (state: number): string | null => {
  return TitleFilterEnum[state];
};

export const cardBrand = (type: string): string => {
  return type === "visa" ? "/visa.svg" : "/mastercard.svg";
};

export const dateMonthFormat = (date: Date): string => {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export const priceFormat = (price: number): string =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    price
  );

export const colorType = (color: string): string => {
  const types = {
    blanco: "rgb(255,255,255)",
    negro: "rgb(0 0 0)",
    gris: "rgb(209 213 219)",
    "gris oscuro": "rgb(75 85 99)",
    rojo: "rgb(239 68 68)",
    naranja: "rgb(245 158 11)",
    amarillo: "rgb(245 158 11)",
    verde: "rgb(34 197 94)",
    azul: "rgb(37 99 235)",
    violeta: "rgb(192 132 252)",
    rosa: "rgb(244 114 182",
    marron: "rgb(120 53 15)",
  };
  return types[color as keyof typeof types];
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString("es-AR", {
    day: "numeric",
    month: "long",
    weekday: "short",
    year: "numeric",
  });
};
