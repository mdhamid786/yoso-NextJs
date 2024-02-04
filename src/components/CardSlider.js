"use client";
import React from "react";
import ReactCardSlider from "react-card-slider-component";
import CardSlide from "./CardSlide";

const slides = [
  {
    image: "https://picsum.photos/200/300",
    title: "This is a title",
    description: "This is a description",
  },

  {
    image: "https://picsum.photos/200/300",
    title: "This is a title",
    description: "This is a description",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "This is a title",
    description: "This is a description",
  },
  {
    image: "https://picsum.photos/200/300",
    title: "This is a title",
    description: "This is a description",
  },
];

const CardSlider = () => {
  return (
    <div style={{ marginTop: "5em" }}>
      <section className="product__section section--padding">
        <div className="container">
          <div className="section__heading text-center mb-40">
            <h2 className="section__heading--maintitle">You may also like</h2>
          </div>
          <div className="product__section--inner product__swiper--column4 swiper">
            {/* Use the CardSlide component within the map function */}
            <ReactCardSlider slides={slides} slideComponent={CardSlide} />
          </div>
        </div>
      </section>
    </div>
  );
};

export default CardSlider;
