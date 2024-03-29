import Link from "next/link";

import { PurchaseStatusInterface } from "interfaces";

export const purchasesStatus: PurchaseStatusInterface = {
  "/success": {
    title: "Aprobado",
    message: (
      <>
        Revisa tu compra en <Link href="/my_purchases">Mis Compras</Link>
      </>
    ),
  },
  "/pending": {
    title: "Pendiente",
    message: (
      <>
        Tu compra está en estado pendiente, obtén novedades en{" "}
        <Link href="/my_purchases">Mis Compras</Link>
      </>
    ),
  },
  "/failed": {
    title: "Cancelado",
    message: "Tu compra fue cancelada",
  },
};
