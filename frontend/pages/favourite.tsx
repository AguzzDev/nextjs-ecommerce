import { useRouter } from "next/router";

import Layout from "components/Layout";
import { ProductsItems } from "components/ProductsItems";
import { getFavourite } from "store/actions/favourite";
import { withAuthAndDispatch } from "hoc/withAuthAndDispatch";
import { useFavouriteSelector } from "store/selectors/useFavouriteSelector";

function Favourite() {
  const { favourite } = useFavouriteSelector();

  const router = useRouter();

  return (
    <Layout title="Tus favoritos">
      <section>
        <h1 className="my-3 text-3xl">Tus articulos favoritos</h1>
        {favourite.length === 0 ? (
          <div className="mt-5">
            <h1 className="mb-3 text-xl">No tienes productos favoritos</h1>
            <button
              onClick={() => router.push("/catalogue")}
              className="px-5 py-3 font-medium text-white bg-black rounded-sm"
            >
              Ve nuestros productos
            </button>
          </div>
        ) : (
          <div className="grid w-full grid-cols-3 gap-5 sm:grid-cols-4 lg:grid-cols-5 place-items-start">
            {favourite.map((product, i) => (
              <ProductsItems product={product} i={i} id="favourites" />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default withAuthAndDispatch(Favourite, { actions: getFavourite });
