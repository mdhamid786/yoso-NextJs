"use client";
import Link from "next/link";
import React from "react";

const Banner = () => {
  return (
    <>
      <section className="banner__section section--padding">
        <div className="container-fluid">
          <div className="row mb--n28">
            <div className="col-lg-6 col-md-6 col-sm-6 mb-28">
              <div className="banner__items">
                <img
                  className="banner__items--thumbnail__img"
                  src="/img/banner/banner1.webp"
                  alt="banner-img"
                />
                <div className="banner__items--content one"></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-28">
              <div className="banner__items">
                <img
                  className="banner__items--thumbnail__img"
                  src="/img/banner/banner2.webp"
                  alt="banner-img"
                />
                <div className="banner__items--content two"></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-28">
              <div className="banner__items">
                <img
                  className="banner__items--thumbnail__img"
                  src="/img/banner/banner3.webp"
                  alt="banner-img"
                />
                <div className="banner__items--content three"></div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 mb-28">
              <div className="banner__items mb-25">
                <img
                  className="banner__items--thumbnail__img"
                  src="/img/banner/banner4.webp"
                  alt="banner-img"
                />
                <div className="banner__items--content four"></div>
              </div>
              <div className="banner__items">
                <img
                  className="banner__items--thumbnail__img"
                  src="/img/banner/banner5.webp"
                  alt="banner-img"
                />
                <div className="banner__items--content five"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Banner;
