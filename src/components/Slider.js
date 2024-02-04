"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "./styles.css";
import { Navigation } from "swiper/modules";
import { getApiData } from "@/Helper/common";
import HomeSliderSkeleton from "./HomeSliderSkeleton";

export default function App() {
  const [slider, setSlider] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define your API call function
  const fetchSliderData = async () => {
    try {
      const data = await getApiData("slider-list");
      setSlider(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching slider:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliderData();
  }, []);

  return (
    <>
      {loading ? (
        <HomeSliderSkeleton />
      ) : slider && slider.length > 0 ? (
        <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
          {slider.map((item, index) => (
            <SwiperSlide key={index}>
              <img src={item.image} alt={`slide-${index}`} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </>
  );
}
