import React, { useRef, useState } from "react";
import { Virtual, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./productSlide.css";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useEffect } from "react";
import ProductItems from "./ProductItems";
import { getApiData } from "@/Helper/common";
import RelatedProductList from "./RelatedProductList";

const ProductSlider = () => {
  const [swiperRef, setSwiperRef] = useState(null);
  const [loading, setLoading] = useState(true);
  const [slides, setSlides] = useState([]);
  const appendNumber = useRef(500);
  const prependNumber = useRef(1);

  // Des Top Selling Product api calling ....
  const TopsellingProducts = async () => {
    try {
      const data = await getApiData(
        "new-product?pincode=444601&type=top_selling"
      );
      if (!data.error) {
        setLoading(false);
        setSlides(
          data.result.map((item, index) => (
            <ProductItems key={index} item={item} />
          ))
        );
      }
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    TopsellingProducts();
  }, []);

  const prepend = () => {
    setSlides([
      `Slide ${prependNumber.current - 2}`,
      `Slide ${prependNumber.current - 1}`,
      ...slides,
    ]);
    prependNumber.current = prependNumber.current - 2;
    swiperRef.slideTo(swiperRef.activeIndex + 2, 0);
  };

  const append = () => {
    setSlides([...slides, "Slide " + ++appendNumber.current]);
  };

  const slideTo = (index) => {
    swiperRef.slideTo(index - 1, 0);
  };

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Swiper
          modules={[Virtual, Navigation, Pagination]}
          onSwiper={setSwiperRef}
          slidesPerView={5}
          // centeredSlides={true}
          spaceBetween={20}
          navigation={true}
          virtual
          breakpoints={{
            768: {
              slidesPerView: 5,
            },

            600: {
              slidesPerView: 3,
            },

            480: {
              slidesPerView: 2,
            },
            320: {
              slidesPerView: 2,
            },

            300: {
              slidesPerView: 2,
            },
          }}
        >
          {slides.map((slideContent, index) => (
            <SwiperSlide className="slider1" key={index} virtualIndex={index}>
              {slideContent}
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default ProductSlider;
