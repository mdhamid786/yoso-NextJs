
import Link from "next/link";
import React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Head from "next/head";

const page = () => {
  return (
    <>
    <Head>
    <title>YATAS Jewellery</title>
    <meta
    name="description"
    content="Amazing Jewellery by YATAS .
    The most beautiful range of Jewellery.
    Boundless wonders of the world are translated into rare and exquisite jewellery.
    Enquire online. Stunning Jewellery."
        />
        <meta
          name="keywords"
          content="jewelry, fashion, jewellery,
          handmade, earJewellery, accessories,
          necklace, gold, handmadejewelry, love, style,
          jewelrydesigner, silver, jewelryaddict, ring,
          bracelet, jewelrydesign, jewels, Jewellery,
          bracelets, diamonds, design, diamond, beautiful,
          instagood, art, instajewelry, gemstones, luxury,
          jewelrygram"
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
                    Blog Grid
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex">
                    <li className="breadcrumb__content--menu__items">
                      <Link className="text-white" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Blog Grid</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start blog section */}
        <section className="blog__section section--padding">
          <div className="container">
            <div className="section__heading text-center mb-40">
              <h2 className="section__heading--maintitle">
                Latest Post From Blog
              </h2>
            </div>
            <div className="blog__section--inner p-0">
              <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb--n30">
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col mb-30">
                  <div className="blog__items">
                    <div className="blog__thumbnail">
                      <Link
                        className="blog__thumbnail--link display-block"
                        href="#"
                      >
                        <img
                          className="blog__thumbnail--img display-block"
                          src="/img/blog/blog5.webp"
                          alt="blog-img"
                        />
                      </Link>
                    </div>
                    <div className="blog__content">
                      <ul className="blog__content--meta d-flex">
                        <li className="blog__content--meta__text">
                          <AccountCircleIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          James Hames
                        </li>
                        <li className="blog__content--meta__text">
                          <CalendarMonthIcon
                            style={{ color: "red", marginRight: "10px" }}
                          />
                          February 05, 2022
                        </li>
                      </ul>
                      <h3 className="blog__content--title h4">
                        <Link href="/#">
                          Top 10 Best Furniture Company History you Should Know
                        </Link>
                      </h3>
                      <p className="blog__content--desc">
                        Mum ut perspiciatis unde omnis iste natus error sit
                        voluptatem…..
                      </p>
                      <Link
                        className="blog__content--btn primary__btn"
                        href="/#"
                      >
                        Read more{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End blog section */}
        {/* Start Newsletter banner section */}

        {/* End Newsletter banner section */}
      </main>
    </>
  );
};

export default page;
