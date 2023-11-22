import { useDispatch } from "react-redux"
import { useContext, useMemo, useState } from "react"
import InnerImageZoom from "react-inner-image-zoom"
import ReactSlidy from "react-slidy"
import useSWR from "swr"
import axios from "axios"

import { colorType, priceFormat, descFormat } from "utils/format"
import { addToCart } from "store/actions/cart"
import Layout from "components/Layout"
import ModalContext from "context/Modal/ModalContext"
import UserContext from "context/User/UserContext"
import { API_URL } from "utils/urls"
import { DisclosureProducts } from "components/Disclosure/DisclosureProducts"
import { SliderDetails } from "components/Slider/SliderDetails"
import { setHistory } from "store/actions/history"
import { Slider } from "components/Slider/Slider"

export default function Slug({ slug }) {
  const [actualSlide, setActualSlide] = useState(0)
  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide)
  }
  const { data } = useSWR(`${API_URL}/products/${slug}`)
  const product = data?.data

  const { openModal } = useContext(ModalContext)
  const { userId } = useContext(UserContext)

  const [errors, setErrors] = useState("")
  const [color, setColor] = useState([])
  const [size, setSize] = useState("")
  const [quantity, setQuantity] = useState(0)
  const dispatch = useDispatch()

  const dataQuantity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const handleQuantity = (quantity) => {
    setQuantity(quantity)
  }
  const handleSize = (size) => {
    setSize(size)
  }

  const addCart = (product) => {
    if (userId) {
      if (color.length === 0 && size.length === 0 && quantity === 0) {
        setErrors("Completa las opciones")
      } else if (color.length === 0) {
        setErrors("Indica el color")
      } else if (size.length === 0) {
        setErrors("Indica la talla")
      } else if (quantity === 0) {
        setErrors("Indica la cantidad")
      } else {
        setErrors("")
        dispatch(addToCart({ product, quantity, color, size }))
      }
    } else {
      return openModal()
    }
  }

  useMemo(() => {
    if (product) {
      dispatch(setHistory(product?._id))
    }
  }, [product])

  return (
    <Layout title={`${product?.title}`}>
      <div className="flex flex-col w-full pt-5 md:flex-row md:pt-10">
        <>
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
                    : product?.img?.map((src) => (
                        <InnerImageZoom
                          key={src}
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

            <>{descFormat(product?.desc)}</>

            <p className="md:text-xl">{priceFormat(product?.price)}</p>

            <div className="flex flex-col space-y-5">
              <div>
                <p>Color</p>
                <div className="flex space-x-3">
                  {product?.color?.map((c) => (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: colorType(c) }}
                      className={`${
                        color === c && "border-black"
                      } w-7 h-7 rounded-full  border-2 `}
                    />
                  ))}
                </div>
              </div>

              <DisclosureProducts
                title="Elige talla"
                data={product?.size}
                dataHandle={size}
                handle={handleSize}
              />
              <DisclosureProducts
                title="Elige cantidad"
                data={dataQuantity}
                dataHandle={quantity}
                handle={handleQuantity}
              />

              {!errors ? null : <p>{errors}</p>}
              <button
                onClick={() => addCart(product)}
                className="py-2 text-white bg-black rounded-sm w-52"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </>
      </div>

      {/* <section className="py-10">
        <h1 className="my-2">Articulos relacionados</h1>
        <Slider products={product} />
      </section> */}
    </Layout>
  )
}
export const getStaticPaths = async () => {
  const data = await axios.get(`${API_URL}/products`).then((res) => res.data)

  return {
    paths: data.data.map((d) => ({
      params: {
        slug: d.slug,
      },
    })),
    fallback: false,
  }
}
export const getStaticProps = async ({ params: { slug } }) => {
  return {
    props: {
      slug,
    },
  }
}
