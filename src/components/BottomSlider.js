"use client";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "./styles.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

export default function App({ item }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={20}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {item
          ? item.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.img} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={40}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper"
      >
        {item
          ? item.map((item, index) => (
              <SwiperSlide key={index}>
                <img src={item.img} />
              </SwiperSlide>
            ))
          : null}
      </Swiper>
    </>
  );
}
