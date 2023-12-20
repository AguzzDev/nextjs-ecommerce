import { useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import InnerImageZoom from "react-inner-image-zoom";
import ReactSlidy from "react-slidy";
import axios from "axios";

import { API_URL } from "utils/urls";
import { colorType, priceFormat, descFormat } from "utils/format";
import { addToCart } from "store/actions/cart";
import Layout from "components/Layout";
import ModalContext from "context/Modal/ModalContext";
import { DisclosureProducts } from "components/Disclosure/DisclosureProducts";
import { SliderDetails } from "components/Slider/SliderDetails";
import { setHistory } from "store/actions/history";
import { Slider } from "components/Slider/Slider";
import { useUser } from "context/User/UserProvider";
import { getProduct, getAllProducts } from "store/actions/product";
import { useProductsSelector } from "store/selectors/useProductsSelector";
import { ProductInterface, ProductOptionsValuesInterface } from "interfaces";
import { GetStaticProps } from "next";

export default function SlugComponent({ slug }: { slug: string }) {
  const dispatch = useDispatch();
  const [sending, setSending] = useState(false);
  const [relationProducts, setRelationProducts] = useState<
    ProductInterface[] | null
  >(null);
  const [actualSlide, setActualSlide] = useState(0);
  const updateSlide = ({ currentSlide }: { currentSlide: number }) => {
    setActualSlide(currentSlide);
  };

  const { products, product } = useProductsSelector();

  const { openModal } = useContext(ModalContext);
  const { user, loading } = useUser();

  const [errors, setErrors] = useState<string>("");
  const [productValues, setProductValues] =
    useState<ProductOptionsValuesInterface>({
      size: null,
      quantity: null,
      color: null,
    });

  const dataQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const addCart = async (id: string) => {
    if (!user) return openModal();
    const { quantity, size } = productValues;

    setSending(true);

    if (!size && !quantity) {
      setErrors("Completa las opciones");
      return setSending(false);
    } else if (!size) {
      setErrors("Indica la talla");
      return setSending(false);
    } else if (!quantity) {
      setErrors("Indica la cantidad");
      return setSending(false);
    }

    try {
      await dispatch(addToCart({ id, product: productValues }));
      setErrors("");
      setSending(false);
    } catch (error) {
      setErrors(error as string);
      setSending(false);
    }
  };

  useEffect(() => {
    if (product) {
      setProductValues((prev) => ({ ...prev, color: product.color[0] }));
      dispatch(setHistory(product._id));
    }
  }, [product]);

  useEffect(() => {
    if (product && products.items.length > 0) {
      setRelationProducts(
        products.items.filter(({ _id }) => !_id.includes(product._id))
      );
    }
  }, [product, products]);

  useEffect(() => {
    dispatch(getProduct(slug));
    dispatch(getAllProducts());
  }, [slug]);

  return !loading && product ? (
    <Layout title={`${product.title}`}>
      <div className="flex flex-col w-full pt-5 md:flex-row md:pt-10">
        <div className="md:w-2/4">
          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:ml-3 lg:w-3/4 xl:w-full">
              <ReactSlidy
                showArrows={false}
                doAfterSlide={updateSlide}
                slide={actualSlide}
              >
                {!product?.img
                  ? null
                  : product?.img?.map((src, i) => (
                      <InnerImageZoom
                        key={i}
                        className="z-50 w-full h-full"
                        src={src}
                        zoomSrc={src}
                        zoomType="hover"
                      />
                    ))}
              </ReactSlidy>
            </div>
            <div className="flex-col hidden w-5/6 text-left md:flex lg:w-1/4 xl:w-2/6">
              <SliderDetails updateSlide={updateSlide} img={product?.img} />
            </div>
          </div>
        </div>

        <div className="flex flex-col mt-10 space-y-2 md:px-5 md:w-2/4 md:mt-0">
          <h1 className="text-xl font-bold md:text-3xl">{product?.title}</h1>

          <>{descFormat(product.desc)}</>

          <p className="md:text-xl">{priceFormat(product.price)}</p>

          <div className="flex flex-col space-y-5">
            <div>
              <p>Color</p>
              <div className="flex space-x-3">
                {product?.color?.map((c, i) => (
                  <button
                    key={i}
                    onClick={() =>
                      setProductValues((prev) => ({ ...prev, color: c }))
                    }
                    style={{ backgroundColor: colorType(c) }}
                    className={`${
                      productValues.color === c && "border-black"
                    } w-7 h-7 rounded-full  border-2 `}
                  />
                ))}
              </div>
            </div>

            <DisclosureProducts
              title={!productValues.size ? "Elige talla" : productValues.size}
              data={product.size}
              handle={(value) =>
                setProductValues((prev) => ({
                  ...prev,
                  size: value as string,
                }))
              }
            />
            <DisclosureProducts
              title={
                !productValues.quantity
                  ? "Elige cantidad"
                  : productValues.quantity
              }
              data={dataQuantity}
              handle={(value) => {
                setProductValues((prev) => ({
                  ...prev,
                  quantity: value as number,
                }));
              }}
            />

            {!errors ? null : <p className="text-red-500 text-xs">{errors}</p>}

            <button
              disabled={sending}
              onClick={() => addCart(product._id)}
              className="py-2 text-white bg-black rounded-sm w-52"
            >
              Añadir al carrito
            </button>
          </div>
        </div>
      </div>

      <section className="py-10">
        {relationProducts ? (
          <Slider title="Productos relacionados" products={relationProducts} />
        ) : null}
      </section>
    </Layout>
  ) : null;
}

export const getStaticPaths = async () => {
  const data = await axios.get(`${API_URL}/products`).then((res) => res.data);

  return {
    paths: data.data.map((d: any) => ({
      params: {
        slug: d.slug,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  return {
    props: {
      slug: ctx.params!.slug,
    },
  };
};
