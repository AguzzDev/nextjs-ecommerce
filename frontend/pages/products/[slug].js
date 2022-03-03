import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import { MinusIcon, PlusIcon } from "@heroicons/react/outline"
import { useContext } from "react"
import { Carousel } from "react-responsive-carousel"
import InnerImageZoom from "react-inner-image-zoom"
import axios from "axios"
import ReactSlidy from "react-slidy"

import { colorType, priceFormat } from "utils/format"
import { IconXS } from "components/Icons"
import { addToCart } from "store/actions/cart"
import Layout from "components/Layout"
import ModalContext from "context/Modal/ModalContext"
import UserContext from "context/User/UserContext"
import { API_URL } from "utils/urls"

export default function Slug({ data }) {
  const [actualSlide, setActualSlide] = useState(0)

  const updateSlide = ({ currentSlide }) => {
    setActualSlide(currentSlide)
  }

  const { openModal } = useContext(ModalContext)
  const { userId } = useContext(UserContext)

  const { repeated } = useSelector((state) => state.cart)
  const [errors, setErrors] = useState("")
  const [products, setProduct] = useState([])
  const [color, setColor] = useState([])
  const [size, setSize] = useState([])
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const { title, img, size: sizeA, color: colorA, price } = data

  const handleQuantity = (type) => {
    if (type === "asc") {
      setQuantity(quantity + 1)
    } else {
      if (quantity > 1) {
        setQuantity(quantity - 1)
      }
    }
  }
  const handleSize = (e) => {
    setSize(e.target.value)
  }
  const addCart = (product) => {
    if (userId) {
      if (repeated) {
        setErrors("Este producto ya esta en el carrito")
      } else if (color.length === 0 && size.length === 0) {
        setErrors("Indica el color y la talla")
      } else if (color.length === 0) {
        setErrors("Indica el color")
      } else if (size.length === 0) {
        setErrors("Indica la talla")
      } else {
        setErrors("")
        setProduct(Array.from(new Set([product])))
        dispatch(addToCart({ userId, product, quantity, color, size }))
      }
    } else {
      return openModal()
    }
  }

  return (
    <Layout title={`${data.title} | Nike Clon`}>
      <div className="flex w-full h-screen pt-10">
        <>
          <div className="w-2/4">
            <div className="flex flex-col lg:flex-row-reverse">
              <div className="lg:w-3/4 ml-3">
                <ReactSlidy doAfterSlide={updateSlide} slide={actualSlide}>
                  <InnerImageZoom
                    className="h-full w-full object-cover"
                    src={img}
                    zoomSrc={img}
                  />
                </ReactSlidy>
              </div>
              <div className="w-1/4 h-32">
                <img src={img} className="h-full w-full object-contain" />
              </div>
            </div>
          </div>

          <div className="px-5 flex flex-col space-y-2 w-2/4">
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="text-xl">{priceFormat(price)}</p>

            <div className="flex flex-col space-y-5">
              <div>
                <h1>Color</h1>
                <div className="flex space-x-3">
                  {colorA?.map((c) => (
                    <button
                      onClick={() => setColor(c)}
                      style={{ backgroundColor: colorType(c) }}
                      className={`${
                        color === c && "border-black"
                      } w-7 h-7 rounded-full  border-2 `}
                    />
                  ))}
                </div>
              </div>
              <div className="flex space-x-3">
                {sizeA?.map((s) => (
                  <button
                    value={s}
                    onClick={(e) => handleSize(e)}
                    className={`${
                      size === s && "border-black"
                    } border-2 bg-gray-200 rounded-md py-3 w-32 uppercase`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <div className="flex bg-gray-200 rounded-xl py-3 w-max">
                <button className="px-3" onClick={() => handleQuantity("asc")}>
                  <IconXS Icon={PlusIcon} />
                </button>
                <div className="border-x-2 px-3 border-gray-400">
                  {quantity}
                </div>
                <button className="px-3" onClick={() => handleQuantity("desc")}>
                  <IconXS Icon={MinusIcon} />
                </button>
              </div>
              <p>{errors}</p>
              <button
                onClick={() => addCart(data)}
                className="bg-black rounded-sm py-2 text-white w-52"
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </>
      </div>
    </Layout>
  )
}
export const getStaticPaths = async () => {
  const data = await axios
    .get(`${API_URL}/products`)
    .then((res) => res.data)

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
  const data = await axios.get(`${API_URL}/products/${slug}`)

  return {
    props: {
      data: data.data,
    },
    revalidate: 100,
  }
}
