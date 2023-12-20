import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import { createPayment } from "store/actions/payment";
import { priceFormat } from "utils/format";
import { StepAsideInterface } from "interfaces";

const PaymentComponent = dynamic(() => import("./PaymentComponent"), {
  ssr: false,
});

export const StepAside: React.FC<StepAsideInterface> = ({
  cart,
  navigation,
  formData,
  orderId = "",
  stepId,
}) => {
  const { sending } = formData;
  const dispatch = useDispatch();

  return (
    <div className="sticky top-20 flex flex-col bg-white p-5 w-full md:w-2/6 mt-5 md:mt-0 overflow-hidden">
      {stepId === "step1" ? (
        <>
          <h1 className="text-2xl">Detalles</h1>
          <div className="flex flex-col justify-end mb-5 h-full space-y-3">
            <p>Total: {priceFormat(cart.total)}</p>
            <button
              onClick={async () => {
                await dispatch(createPayment());
                navigation!.next();
              }}
              className="w-full px-5 py-3 text-white bg-black rounded-md"
            >
              Pagar
            </button>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-2xl">Total</h1>

          <div className="flex justify-end flex-col h-full">
            <p>Total: {priceFormat(cart.total)}</p>

            <PaymentComponent orderId={orderId} />
          </div>
        </>
      )}
    </div>
  );
};
