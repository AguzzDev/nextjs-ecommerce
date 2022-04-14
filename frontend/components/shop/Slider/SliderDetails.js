import { A11y, Navigation } from "swiper"
import { Swiper, SwiperSlide } from "swiper/react"
import Image from "next/image"

export const SliderDetails = ({ img, updateSlide }) => {
  return (
    <>
      <Swiper
        modules={[Navigation, A11y]}
        slidesPerView={4}
        spaceBetween={20}
        direction="vertical"
        navigation
        className="swiper-details max-h-[88vh]"
      >
        {img?.map((img, index) => (
          <SwiperSlide
            onClick={() => updateSlide({ currentSlide: index })}
            key={index}
            className="cursor-pointer"
          >
            <Image
              height={200}
              width={200}
              src={img}
              className="object-contain"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
