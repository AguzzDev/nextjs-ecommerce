import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

import { StepAside } from "./StepAside";
import { StepsHeader } from "./stepsHeader";
import { getPaymentOrder } from "store/actions/payment";
import { StepInterface } from "interfaces";
import { useCartSelector } from "store/selectors/useCartSelector";

export const Step2: React.FC<StepInterface> = ({ stepId, formData }) => {
  const [orderId, setOrderId] = useState<string | null>(null);

  const dispatch = useDispatch();
  const cart = useCartSelector();

  const { sendingPrice, iva } = formData;
  const total = cart.total + iva + sendingPrice;

  const { sending } = formData;

  useEffect(() => {
    (async () => {
      try {
        const order = (await dispatch(getPaymentOrder())) as unknown;

        setOrderId(order as string);
      } catch (error) {
        return;
      }
    })();
  }, []);

  return (
    <section className="flex flex-col md:flex-row my-8 md:space-x-8">
      <div className="md:w-4/6 bg-white md:h-[80vh] p-5">
        <div className="relative">
          <div className="flex justify-between w-full px-10 ">
            <StepsHeader title="Dirección" num="1" value="step1" act={stepId} />
            <StepsHeader title="Pago" num="2" value="step2" act={stepId} />
            <StepsHeader title="¡Hecho!" num="3" value="step3" act={stepId} />
          </div>
        </div>

        <div className="mt-3">
          {sending ? (
            <h2>Detalles de Envio</h2>
          ) : (
            <h2>Detalles de Envio: Retiras en el local</h2>
          )}

          <div className="flex flex-col mt-3 space-y-3">
            {sending ? (
              <>
                <div className="px-5 py-2 border border-gray-300 rounded-md">
                  {formData.address}
                </div>
                <div className="flex space-x-5">
                  <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                    {formData.country}
                  </div>
                  <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                    {formData.province}
                  </div>
                </div>
                <div className="flex space-x-5">
                  <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                    {formData.city}
                  </div>
                  <div className="w-full px-5 py-2 border border-gray-300 rounded-md">
                    {formData.postal_code}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>

      {orderId ? (
        <StepAside
          cart={cart}
          formData={formData}
          stepId={stepId}
          orderId={orderId}
        />
      ) : null}
    </section>
  );
};
