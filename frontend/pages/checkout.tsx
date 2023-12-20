import Layout from "components/Layout";
import { AllSteps } from "components/Steps/allSteps";
import { withAuth } from "hoc/withAuth";

const Checkout = () => {
  return (
    <Layout title="Pago">
      <AllSteps />
    </Layout>
  );
};

export default withAuth(Checkout);
