import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";

initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_KEY!, {
  locale: "es-AR",
});

const PaymentComponent: React.FC<{ orderId: string }> = ({ orderId }) => {
  return <Wallet initialization={{ preferenceId: orderId }} />;
};

export default PaymentComponent;
