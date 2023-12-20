import Layout from "components/Layout";
import { Slider } from "components/Slider/Slider";
import { getHistoryUser } from "store/actions/history";
import { getAllProducts } from "store/actions/product";
import { withDispatch } from "hoc/withDispatch";
import { useHistorySelector } from "store/selectors/useHistorySelector";
import { useProductsSelector } from "store/selectors/useProductsSelector";

function Home() {
  const { history } = useHistorySelector();
  const { products } = useProductsSelector();

  const filterProducts = (category: string) => {
    return products.items.filter((p) => p.categories[0] === category);
  };

  return (
    <Layout title="Inicio">
      <section className="py-10">
        <h1 className="mb-5 text-4xl font-bold">Nuestro catalogo</h1>
        <p>Hace un pago de prueba usando estos datos:</p>
        <p>Email: test_user_1829938104@testuser.com</p>
        <p>Contraseña: 12345678</p>
        
        <div className="flex flex-col space-y-2">
          <Slider products={filterProducts("buzo")} title="Buzos" />
          <Slider products={filterProducts("remera")} title="Remeras" />
          {history && (
            <Slider products={history} title="Ultimos productos vistos" />
          )}
        </div>
      </section>
    </Layout>
  );
}

export default withDispatch(Home, {
  actions: [getAllProducts, getHistoryUser],
});
