"use client"
import NewsLetter from '@/components/NewsLetter'
import Teams from '@/components/Teams'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <>
     <Head>
        <title> About YATAS</title>
        <meta
          name="description"
          content="Amazing Jewellery by YATAS . The most beautiful range of Jewellery. Boundless wonders of the world are translated into rare and exquisite jewellery. Enquire online. Stunning Jewellery."
        />
        <meta
          name="keywords"
          content="jewelry, fashion, jewellery, handmade, earJewellery, accessories, necklace, gold, handmadejewelry, love, style, jewelrydesigner, silver, jewelryaddict, ring, bracelet, jewelrydesign, jewels, Jewellery, bracelets, diamonds, design, diamond, beautiful, instagood, art, instajewelry, gemstones, luxury, jewelrygram"
        />
      </Head>
      <main className="main__content_wrapper">
  {/* Start breadcrumb section */}
  <section className="breadcrumb__section breadcrumb__bg">
    <div className="container">
      <div className="row row-cols-1">
        <div className="col">
          <div className="breadcrumb__content">
            <h1 className="breadcrumb__content--title text-white mb-10">
              About Us
            </h1>
            <ul className="breadcrumb__content--menu d-flex">
              <li className="breadcrumb__content--menu__items">
                <Link className="text-white" href="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb__content--menu__items">
                <span className="text-white">About Us</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End breadcrumb section */}
  {/* Start about section */}
  <section className="about__section section--padding mb-95">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="about__thumbnail d-flex">
            <div className="about__thumbnail--items">
              <img
                className="about__thumbnail--img border-radius-5 display-block"
                src="/img/other/about-thumb-list1.webp"
                alt="about-thumbnail"
              />
            </div>
            <div className="about__thumbnail--items position__relative">
              <img
                className="about__thumbnail--img border-radius-5 display-block"
                src="/img/other/about-thumb-list2.webp"
                alt="about-thumbnail"
              />
              <div className="banner__bideo--play about__thumbnail--play">
                <Link
                  className="bideo__play--icon glightbox"
                  href="https://vimeo.com/115041822"
                  data-gallery="video"
                >
                  <svg
                    id="play"
                    xmlns="http://www.w3.org/2000/svg"
                    width="46.302"
                    height="46.302"
                    viewBox="0 0 46.302 46.302"
                  >
                    <g
                      id="Group_193"
                      data-name="Group 193"
                      transform="translate(0 0)"
                    >
                      <path
                        id="Path_116"
                        data-name="Path 116"
                        d="M39.521,6.781a23.151,23.151,0,0,0-32.74,32.74,23.151,23.151,0,0,0,32.74-32.74ZM23.151,44.457A21.306,21.306,0,1,1,44.457,23.151,21.33,21.33,0,0,1,23.151,44.457Z"
                        fill="currentColor"
                      />
                      <g
                        id="Group_188"
                        data-name="Group 188"
                        transform="translate(15.588 11.19)"
                      >
                        <g id="Group_187" data-name="Group 187">
                          <path
                            id="Path_117"
                            data-name="Path 117"
                            d="M190.3,133.213l-13.256-8.964a3,3,0,0,0-4.674,2.482v17.929a2.994,2.994,0,0,0,4.674,2.481l13.256-8.964a3,3,0,0,0,0-4.963Zm-1.033,3.435-13.256,8.964a1.151,1.151,0,0,1-1.8-.953V126.73a1.134,1.134,0,0,1,.611-1.017,1.134,1.134,0,0,1,1.185.063l13.256,8.964a1.151,1.151,0,0,1,0,1.907Z"
                            transform="translate(-172.366 -123.734)"
                            fill="currentColor"
                          />
                        </g>
                      </g>
                      <g
                        id="Group_190"
                        data-name="Group 190"
                        transform="translate(28.593 5.401)"
                      >
                        <g id="Group_189" data-name="Group 189">
                          <path
                            id="Path_118"
                            data-name="Path 118"
                            d="M328.31,70.492a18.965,18.965,0,0,0-10.886-10.708.922.922,0,1,0-.653,1.725,17.117,17.117,0,0,1,9.825,9.664.922.922,0,1,0,1.714-.682Z"
                            transform="translate(-316.174 -59.724)"
                            fill="currentColor"
                          />
                        </g>
                      </g>
                      <g
                        id="Group_192"
                        data-name="Group 192"
                        transform="translate(22.228 4.243)"
                      >
                        <g id="Group_191" data-name="Group 191">
                          <path
                            id="Path_119"
                            data-name="Path 119"
                            d="M249.922,47.187a19.08,19.08,0,0,0-3.2-.27.922.922,0,0,0,0,1.845,17.245,17.245,0,0,1,2.889.243.922.922,0,1,0,.31-1.818Z"
                            transform="translate(-245.801 -46.917)"
                            fill="currentColor"
                          />
                        </g>
                      </g>
                    </g>
                  </svg>
                  <span className="visually-hidden">Play</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="about__content">
            <span className="about__content--subtitle text__secondary mb-20">
              {" "}
              Why Choose us
            </span>
            <h2 className="about__content--maintitle mb-25">
              We do not buy from the open market &amp; traders.
            </h2>
            <p className="about__content--desc mb-20">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit
              illo, est repellendus are quia voluptate neque reiciendis ea
              placeat labore maiores cum, hic ducimus ad a dolorem soluta
              consectetur adipisci. Perspiciatis quas ab quibusdam is.
            </p>
            <p className="about__content--desc mb-25">
              Itaque accusantium eveniet a laboriosam dolorem? Magni suscipit
              est corrupti explicabo non perspiciatis, excepturi ut asperiores
              assumenda rerum? Provident ab corrupti sequi, voluptates
              repudiandae eius odit aut.
            </p>
            <div className="about__author position__relative">
              <h4 className="about__author--name">Bruce Sutton</h4>
              <span className="about__author--rank">Spa Manager</span>
              <img
                className="about__author--signature"
                src="/img/icon/signature.webp"
                alt="signature"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End about section */}
  {/* Start counterup banner section */}
  <div
    className="counterup__banner--section counterup__banner__bg2"
    id="funfactId"
  >
    <div className="container">
      <div className="row row-cols-1 align-items-center">
        <div className="col">
          <div className="counterup__banner--inner position__relative d-flex align-items-center justify-content-between">
            <div className="counterup__banner--items text-center">
              <p className="counterup__banner--items__text text-white">
                YEARS OF <br /> FOUNDATION
              </p>
              <span
                className="counterup__banner--items__number js-counter text-white"
                data-count={50}
              >
                0
              </span>
            </div>
            <div className="counterup__banner--items text-center">
              <p className="counterup__banner--items__text text-white">
                SKILLED TEAM <br /> MEMBERS{" "}
              </p>
              <span
                className="counterup__banner--items__number js-counter text-white"
                data-count={100}
              >
                0
              </span>
            </div>
            <div className="counterup__banner--items text-center">
              <p className="counterup__banner--items__text text-white">
                HAPPY <br /> CUSTOMERS
              </p>
              <span
                className="counterup__banner--items__number js-counter text-white"
                data-count={80}
              >
                0
              </span>
            </div>
            <div className="counterup__banner--items text-center">
              <p className="counterup__banner--items__text text-white">
                MONTHLY <br /> ORDERS
              </p>
              <span
                className="counterup__banner--items__number js-counter text-white"
                data-count={70}
              >
                0
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End counterup banner section */}
  {/* Start team members section */}
<Teams/>
  <NewsLetter/>
  {/* End Newsletter banner section */}
  {/* Start brand logo section */}
  <div className="brand__logo--section bg__secondary section--padding">
    <div className="container-fluid">
      <div className="row row-cols-1">
        <div className="col">
          <div className="brand__logo--section__inner d-flex justify-content-center align-items-center">
            <div className="brand__logo--items">
              <img
                className="brand__logo--items__thumbnail--img"
                src="/img/logo/brand-logo1.webp"
                alt="brand logo"
              />
            </div>
            <div className="brand__logo--items">
              <img
                className="brand__logo--items__thumbnail--img"
                src="/img/logo/brand-logo2.webp"
                alt="brand logo"
              />
            </div>
            <div className="brand__logo--items">
              <img
                className="brand__logo--items__thumbnail--img"
                src="/img/logo/brand-logo3.webp"
                alt="brand logo"
              />
            </div>
            <div className="brand__logo--items">
              <img
                className="brand__logo--items__thumbnail--img"
                src="/img/logo/brand-logo4.webp"
                alt="brand logo"
              />
            </div>
            <div className="brand__logo--items">
              <img
                className="brand__logo--items__thumbnail--img"
                src="/img/logo/brand-logo5.webp"
                alt="brand logo"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* End brand logo section */}
</main>

    </>
  )
}

export default Page
