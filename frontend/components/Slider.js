import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y } from "swiper"

export const Slider = ({ products }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={5}
        slidesPerView={3}
        navigation
      >
        {products.map((product) => (
          <SwiperSlide>
            <div className="w-full flex justify-center mx-auto">
              <Image
                src={product.img}
                height={150}
                width={130}
                objectFit="cover"
                className="w-full"
              />
            </div>
            <div className="flex flex-col h-[13vh]">
              <h1>{product.title}</h1>
              <div className="flex space-x-1 h-full items-end">
                <p>Cantidad: {product.quantity}</p>
                <p>Talla: <span className="uppercase">{product.size}</span></p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
