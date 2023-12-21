import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, A11y } from "swiper";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { useRouter } from "next/router";
import { priceFormat } from "utils/format";
import { ButtonFavourite } from "../ButtonFavourite";
import { useMediaQuery } from "hooks/useMediaQuery";
import { SliderInterface } from "interfaces";

export const Slider: React.FC<SliderInterface> = ({ title, products }) => {
  const router = useRouter();
  const path = router.pathname;
  const isMedium = useMediaQuery("(max-width: 800px)");
  const isSmall = useMediaQuery("(max-width: 600px)");

  const itemsView = () => {
    if (isSmall) {
      return 2;
    }
    if (isMedium) {
      return 3;
    }

    return 4;
  };

  return (
    <AnimatePresence>
      {title ? <h2 className="pb-2">{title}</h2> : null}
      <Swiper
        modules={[Navigation, A11y]}
        spaceBetween={10}
        slidesPerView={itemsView()}
        navigation
        className="w-full h-full"
      >
        {products.map((product, i) => (
          <SwiperSlide key={i}>
            <motion.div
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, delay: i * 0.4 }}
              viewport={{ amount: 0.4, once: true }}
            >
              <Link href={`/products/${product.slug}`}>
                <div className="border border-gray-300 shadow-xl">
                  <div
                    className={`relative ${
                      path === "/my_purchases" ? "h-[15rem]" : "h-[20rem]"
                    }`}
                  >
                    <Image
                      src={product.img[0]}
                      layout="fill"
                      objectFit="cover"
                      className="absolute top-0 w-full"
                    />
                  </div>
                  <div className="flex flex-col p-2">
                    <h5 className="truncate">{product.title}</h5>
                    {path !== "/my_purchases" ? (
                      <p className="mt-2">{priceFormat(product.price)}</p>
                    ) : null}
                  </div>
                </div>
              </Link>

              {path !== "/my_purchases" ? (
                <ButtonFavourite data={product._id} id="slider" />
              ) : null}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </AnimatePresence>
  );
};
