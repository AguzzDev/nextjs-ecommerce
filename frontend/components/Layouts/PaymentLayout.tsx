import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "components/Layout";
import { StepsHeader } from "../Steps/stepsHeader";
import { purchasesStatus } from "utils/purchasesStatus";
import { PaymentInterface } from "interfaces";

const PaymentLayout: React.FC<PaymentInterface> = ({ title, step }) => {
  const router = useRouter();

  return (
    <Layout title={title}>
      <section className="flex justify-center py-8 space-x-8">
        <div className="w-4/6 p-5 bg-white h-[80vh] px-10">
          <div className="flex justify-between w-full relative">
            <StepsHeader title="Dirección" num="1" value="step1" act={step} />
            <StepsHeader title="Pago" num="2" value="step2" act={step} />
            <StepsHeader title="¡Hecho!" num="3" value="step3" act={step} />
          </div>

          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <h1>Pago {purchasesStatus[router.pathname].title}</h1>

            <p>{purchasesStatus[router.pathname].message}</p>

            <Link href="/" className="button">
              Volver a la tienda
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PaymentLayout;
