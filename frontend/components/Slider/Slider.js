import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, A11y } from "swiper"
import { priceFormat } from "utils/format"
import Link from "next/link"
import { ButtonFavourite } from "../ButtonFavourite"
import { useRouter } from "next/router"

export const Slider = ({ title, products }) => {
  const router = useRouter()
  const path = router.pathname

  return (
    <div>
      {title ? <h1 className="pb-2">{title}</h1> : null}
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={10}
        slidesPerView={path === "/my_purchases" ? 3 : 5}
        navigation
      >
        {products?.map((product, i) => (
          <SwiperSlide key={i}>
            <Link href={`/products/${product.slug || product.productId}`}>
              <a>
                <div className="border border-gray-300 shadow-xl">
                  <div
                    className={`relative ${
                      path === "/my_purchases" ? "h-[15rem]" : "h-[20rem]"
                    }`}
                  >
                    <Image
                      {...(path !== "/my_purchases"
                        ? { src: product.img[0] }
                        : { src: product.img })}
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 w-full"
                    />
                  </div>
                  <div className="flex flex-col p-2">
                    <h3 className="truncate">{product.title}</h3>
                    {path !== "/my_purchases" ? (
                      <p className="mt-2">{priceFormat(product.price)}</p>
                    ) : null}
                  </div>
                </div>
              </a>
            </Link>
            {path !== "/my_purchases" ? (
              <ButtonFavourite data={product} id="slider" />
            ) : null}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
