"use client";
import { getApiData, getWithToken } from "@/Helper/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Acordition from "./Acordition";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from '@chakra-ui/react';


const Navbar = () => {
  const { carts } = useSelector((state) => state.allCart);
  const [token, setToken] = useState(null);
  const [mobileMenu, setMobileMenu] = useState("close");
  const [mobileSubMenu, setMobileSubMenu] = useState("active");
  const [category, setCategory] = useState([]);
  const [loginCarts, setLoginCarts] = useState([]);
  const [wishProducts, setWishProducts] = useState([]);
  // const token1 = localStorage.getItem("token");
  const token1 =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // localstorage
  const cart1 = useSelector((state) => state.allCart1.cartItems);
  // local storage
  const wish1 = useSelector((state) => state.allWish1.wishItems);

  const loginCount = useSelector((state) => state.allCart.carts);
  const afterLoginCount = loginCount.length + cart1.length;

  const wishCount = useSelector((state) => state.allWish.wish);

  const afterLoginWishCount = wish1.length + wishCount.length;

  // @Des get All List Cart api calling ...

  const loginCart = async () => {
    try {
      const data = await getWithToken("cart-list");
      if (data.error == false) {
        setLoginCarts(data.result);
      } else {
        setLoginCarts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // @Des get All List Wishlist api calling ...
  const WishListProducts = async () => {
    try {
      const data = await getWithToken("wishlist-product-list");
      if (data.error == false) {
        setWishProducts(data.result);
      } else {
        setWishProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  const [categories, setCategories] = useState("");

  const fetchCategories = async () => {
    try {
      const data = await getApiData("categorylist");
      setCategories(data.result);
    } catch (error) {
      console.log("error");
    }
  };

  

  useEffect(() => {
    fetchCategories();
    loginCart();
    WishListProducts();
  }, []);

  const [isAccordionVisible, setAccordionVisible] = useState(false);

  const toggleAccordion = () => {
    setAccordionVisible(!isAccordionVisible);
  };

  return (
    <>
      <div className={`offcanvas-header ${mobileMenu} `} tabIndex={-1}>
        <div className="offcanvas__inner">
          <div className="offcanvas__logo">
            <Link className="offcanvas__logo_link" href="/">
              <img src="img/logo/nav-log.webp" alt="YATAS Logo" />
            </Link>
            <button
              onClick={(e) => setMobileMenu("close")}
              className="offcanvas__close--btn"
              aria-label="offcanvas close btn"
            >
              close
            </button>
          </div>
          <nav
            // onClick={(e) => setMobileMenu("close")}
            className="offcanvas__menu"
          >
            <ul className="offcanvas__menu_ul">
              <li className="offcanvas__menu_li">
                <Link className="offcanvas__menu_item" href="/">
                  Home
                </Link>
              </li>
              <li className={`offcanvas__menu_li`}>
      <Link className="offcanvas__menu_item" href="#">
        Shops
      </Link>
      {isAccordionVisible &&  

      <>
       <div style={{ paddingBottom: "30px", paddingTop: "10px" }}>
    <Accordion allowToggle>
    {categories && categories.length > 0 ? (
      categories.map((item, index) => (
        <AccordionItem key={index}>
          <h2>
            <AccordionButton>
              <Box as="span" flex='1' textAlign='left'>
            
                <label className="widget__categories--menu__label d-flex align-items-center">
                <Link  href={`/shop/${item.slug}`}>
                  <img
                   onClick={(e) => setMobileMenu("close")}
                    className="widget__categories--menu__img"
                    src={item.image}
                    alt="categories-img"
                  />
                  </Link>
                  <Link  href={`/shop/${item.slug}`}>
                  <span onClick={(e) => setMobileMenu("close")}  style={{ fontSize: "15px" }} className="widget__categories--menu__text">
                    {item.name}
                  </span>
                  </Link>
                 
                  <svg
                    className="widget__categories--menu__arrowdown--icon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="12.355"
                    height="8.394"
                  >
                    <path
                      d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                      transform="translate(-6 -8.59)"
                      fill="currentColor"
                    />
                  </svg>
                </label>
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel pb={4}>
            {item.child && item.child.length>0 ? (
                item.child.map((item2, index)=>(
                    <li className="widget__categories--sub__menu--list">
                    <Link style={{paddingLeft:"20px"}}  href={`/shop/${item2.slug}`}
                      className="widget__categories--sub__menu--link d-flex align-items-center"
                    >
                      <img 
                       onClick={(e) => setMobileMenu("close")}
                        className="widget__categories--sub__menu--img"
                        src={item2.image}
                        alt="categories-img"
                      />
                      <span onClick={(e) => setMobileMenu("close")} className="widget__categories--sub__menu--text">
                       {item2.name}
                      </span>
                    </Link>
                  </li>
                ))
            ):(
             null
            )}
          </AccordionPanel>
        </AccordionItem>
      ))
    ) : null}
  </Accordion>
    </div>
      </>
      }
      <button
        onClick={toggleAccordion}
        className="offcanvas__sub_menu_toggle"
      />
    </li>
              <li 
               onClick={(e) => setMobileMenu("close")}
               className="offcanvas__menu_li">
                <Link className="offcanvas__menu_item" href="/blog">
                  Blog
                </Link>
              </li>

              <li
               onClick={(e) => setMobileMenu("close")}
               className="offcanvas__menu_li">
                <Link className="offcanvas__menu_item" href="/about">
                  About
                </Link>
              </li>
              <li
               onClick={(e) => setMobileMenu("close")}
               className="offcanvas__menu_li">
                <Link className="offcanvas__menu_item" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <header className="header__section header__transparent">
        <div className="main__header header__sticky sticky">
          <div className="container-fluid">
            <div className="main__header--inner position__relative d-flex justify-content-between align-items-center">
              <div className="offcanvas__header--menu__open ">
                <button
                  onClick={(e) => setMobileMenu("open")}
                  className="offcanvas__header--menu__open--btn"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="ionicon offcanvas__header--menu__open--svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeMiterlimit={10}
                      strokeWidth={32}
                      d="M80 160h352M80 256h352M80 352h352"
                    />
                  </svg>
                  <span className="visually-hidden">Offcanvas Menu Open</span>
                </button>
              </div>
              <div className="main__logo">
                <h1 className="main__logo--title">
                  <Link className="main__logo--link" href="/">
                    <img
                      className="main__logo--img"
                      src="https://res.cloudinary.com/dfpanyr0i/image/upload/v1702893780/nav-log_t6ysun.webp"
                      alt="logo-img"
                    />
                  </Link>
                </h1>
              </div>
              <div className="header__menu d-none d-lg-block">
                <nav className="header__menu--navigation">
                  <ul className="d-flex">
                    <li className="header__menu--items">
                      <Link className="header__menu--link" href="/">
                        Home
                      </Link>
                    </li>
                    {/* <li className="header__menu--items mega__menu--items">
                      <Link className="header__menu--link" href="/shop">
                        Shop
                      </Link>
                    </li> */}
                    <li className="header__menu--items">
                      <Link className="header__menu--link" href="/about">
                        About US{" "}
                      </Link>
                    </li>

                    <li className="header__menu--items">
                      <Link className="header__menu--link" href="/blog">
                        Blog
                      </Link>
                    </li>

                    <li className="header__menu--items mega__menu--items">
                      <a className="header__menu--link" href="">
                        Shop <span className="menu__plus--icon">+</span>
                      </a>
                      <ul className="header__mega--menu d-flex">
                        {categories && categories.length > 0
                          ? categories.map((item, index) => (
                              <li className="header__mega--menu__li">
                                
                                <span className="header__mega--subtitle">
                                  
                                <label className="widget__categories--menu__label d-flex align-items-center">
                <Link  href={`/shop/${item.slug}`}>
                  <img
                    className="widget__categories--menu__img"
                    src={item.image}
                    alt="categories-img"
                  />
                  </Link>
                  <Link  href={`/shop/${item.slug}`}>
                  <span style={{ fontSize: "15px" }} className="widget__categories--menu__text">
                    {item.name}
                  </span>
                  </Link>
                 
                 
                </label>
                                </span>
                                <ul className="header__mega--sub__menu">
                                  {item.child && item.child.length > 0
                                    ? item.child.map((item2, index) => (
                                      <li className="widget__categories--sub__menu--list">
                                      <Link   href={`/shop/${item2.slug}`}
                                        className="widget__categories--sub__menu--link d-flex align-items-center"
                                      
                                      >
                                        <img
                                          className="widget__categories--sub__menu--img"
                                          src={item2.image}
                                          alt="categories-img"
                                        />
                                        <span className="widget__categories--sub__menu--text">
                                         {item2.name}
                                        </span>
                                      </Link>
                                    </li>
                                      ))
                                    : null}
                                </ul>
                              </li>
                            ))
                          : null}
                      </ul>
                    </li>

                    <li className="header__menu--items">
                      <Link className="header__menu--link" href="/contact">
                        Contact{" "}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
              <div className="header__account">
                <ul className="d-flex">
                  {token ? (
                    <li className="header__account--items">
                      <Link className="header__account--btn" href="/my-account">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26.51"
                          height="23.443"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={32}
                          />
                          <path
                            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit={10}
                            strokeWidth={32}
                          />
                        </svg>
                        <span className="visually-hidden">My Account</span>
                      </Link>
                    </li>
                  ) : (
                    <li className="header__account--items">
                      <Link className="header__account--btn" href="/login">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="26.51"
                          height="23.443"
                          viewBox="0 0 512 512"
                        >
                          <path
                            d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={32}
                          />
                          <path
                            d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                            fill="none"
                            stroke="currentColor"
                            strokeMiterlimit={10}
                            strokeWidth={32}
                          />
                        </svg>
                        <span className="visually-hidden">Login</span>
                      </Link>
                    </li>
                  )}

                  {token1 ? (
                    <>
                      <li className="header__account--items d-md-none">
                        <Link className="header__account--btn" href="/wishlist">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24.526"
                            height="21.82"
                            viewBox="0 0 24.526 21.82"
                          >
                            <path
                              d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                              transform="translate(0 0)"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="items__count wishlist">
                            {afterLoginWishCount}
                          </span>
                        </Link>
                      </li>
                      <li className="header__account--items">
                        <Link
                          className="header__account--btn minicart__open--btn"
                          href="/cart"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18.897"
                            height="21.565"
                            viewBox="0 0 18.897 21.565"
                          >
                            <path
                              d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
                              transform="translate(-2.667 -1.366)"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="items__count">
                            {afterLoginCount}
                          </span>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="header__account--items d-md-none">
                        <Link className="header__account--btn" href="/wishlist">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24.526"
                            height="21.82"
                            viewBox="0 0 24.526 21.82"
                          >
                            <path
                              d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                              transform="translate(0 0)"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="items__count wishlist">
                            {wish1.length}
                          </span>
                        </Link>
                      </li>
                      <li className="header__account--items">
                        <Link
                          className="header__account--btn minicart__open--btn"
                          href="/cart"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18.897"
                            height="21.565"
                            viewBox="0 0 18.897 21.565"
                          >
                            <path
                              d="M16.84,8.082V6.091a4.725,4.725,0,1,0-9.449,0v4.725a.675.675,0,0,0,1.35,0V9.432h5.4V8.082h-5.4V6.091a3.375,3.375,0,0,1,6.75,0v4.691a.675.675,0,1,0,1.35,0V9.433h3.374V21.581H4.017V9.432H6.041V8.082H2.667V21.641a1.289,1.289,0,0,0,1.289,1.29h16.32a1.289,1.289,0,0,0,1.289-1.29V8.082Z"
                              transform="translate(-2.667 -1.366)"
                              fill="currentColor"
                            />
                          </svg>
                          <span className="items__count">{cart1.length}</span>
                        </Link>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* End main header */}
        {/* Start Offcanvas header menu */}
        <div className="offcanvas-header" tabIndex={-1}>
          <div className="offcanvas__inner">
            <div className="offcanvas__logo">
              <Link className="offcanvas__logo_link" href="/">
                <img src="img/logo/nav-log.webp" alt="YATAS Logo" />
              </Link>
              <button
                className="offcanvas__close--btn"
                aria-label="offcanvas close btn"
              >
                close
              </button>
            </div>
            <nav className="offcanvas__menu">
              <ul className="offcanvas__menu_ul">
                <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/">
                    Home
                  </Link>
                </li>
                <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/shop">
                    Shop
                  </Link>
                </li>
                <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/blog">
                    Blog
                  </Link>
                </li>
                <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/about">
                    About
                  </Link>
                </li>
                <li className="offcanvas__menu_li">
                  <Link className="offcanvas__menu_item" href="/contact">
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="offcanvas__account--items">
                <Link
                  className="offcanvas__account--items__btn d-flex align-items-center"
                  href="/login"
                >
                  <span className="offcanvas__account--items__icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20.51"
                      height="19.443"
                      viewBox="0 0 512 512"
                    >
                      <path
                        d="M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={32}
                      />
                      <path
                        d="M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z"
                        fill="none"
                        stroke="currentColor"
                        strokeMiterlimit={10}
                        strokeWidth={32}
                      />
                    </svg>
                  </span>
                  <span className="offcanvas__account--items__label">
                    Login / Register
                  </span>
                </Link>
              </div>
            </nav>
          </div>
        </div>
        {/* End Offcanvas header menu */}
        {/* Start Offcanvas stikcy toolbar */}
        <div className="offcanvas__stikcy--toolbar" tabIndex={-1}>
          <ul className="d-flex justify-content-between">
            <li className="offcanvas__stikcy--toolbar__list">
              <Link className="offcanvas__stikcy--toolbar__btn" href="/">
                <span className="offcanvas__stikcy--toolbar__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    width="21.51"
                    height="21.443"
                    viewBox="0 0 22 17"
                  >
                    <path
                      fill="currentColor"
                      d="M20.9141 7.93359c.1406.11719.2109.26953.2109.45703 0 .14063-.0469.25782-.1406.35157l-.3516.42187c-.1172.14063-.2578.21094-.4219.21094-.1406 0-.2578-.04688-.3515-.14062l-.9844-.77344V15c0 .3047-.1172.5625-.3516.7734-.2109.2344-.4687.3516-.7734.3516h-4.5c-.3047 0-.5742-.1172-.8086-.3516-.2109-.2109-.3164-.4687-.3164-.7734v-3.6562h-2.25V15c0 .3047-.11719.5625-.35156.7734-.21094.2344-.46875.3516-.77344.3516h-4.5c-.30469 0-.57422-.1172-.80859-.3516-.21094-.2109-.31641-.4687-.31641-.7734V8.46094l-.94922.77344c-.11719.09374-.24609.14062-.38672.14062-.16406 0-.30468-.07031-.42187-.21094l-.35157-.42187C.921875 8.625.875 8.50781.875 8.39062c0-.1875.070312-.33984.21094-.45703L9.73438.832031C10.1094.527344 10.5312.375 11 .375s.8906.152344 1.2656.457031l8.6485 7.101559zm-3.7266 6.50391V7.05469L11 1.99219l-6.1875 5.0625v7.38281h3.375v-3.6563c0-.3046.10547-.5624.31641-.7734.23437-.23436.5039-.35155.80859-.35155h3.375c.3047 0 .5625.11719.7734.35155.2344.211.3516.4688.3516.7734v3.6563h3.375z"
                    />
                  </svg>
                </span>
                <span className="offcanvas__stikcy--toolbar__label">Home</span>
              </Link>
            </li>

            {token ? (
              <>
                <li className="offcanvas__stikcy--toolbar__list">
                  <Link
                    className="offcanvas__stikcy--toolbar__btn minicart__open--btn"
                    href="/cart"
                  >
                    <span className="offcanvas__stikcy--toolbar__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.51"
                        height="15.443"
                        viewBox="0 0 18.51 15.443"
                      >
                        <path
                          d="M79.963,138.379l-13.358,0-.56-1.927a.871.871,0,0,0-.6-.592l-1.961-.529a.91.91,0,0,0-.226-.03.864.864,0,0,0-.226,1.7l1.491.4,3.026,10.919a1.277,1.277,0,1,0,1.844,1.144.358.358,0,0,0,0-.049h6.163c0,.017,0,.034,0,.049a1.277,1.277,0,1,0,1.434-1.267c-1.531-.247-7.783-.55-7.783-.55l-.205-.8h7.8a.9.9,0,0,0,.863-.651l1.688-5.943h.62a.936.936,0,1,0,0-1.872Zm-9.934,6.474H68.568c-.04,0-.1.008-.125-.085-.034-.118-.082-.283-.082-.283l-1.146-4.037a.061.061,0,0,1,.011-.057.064.064,0,0,1,.053-.025h1.777a.064.064,0,0,1,.063.051l.969,4.34,0,.013a.058.058,0,0,1,0,.019A.063.063,0,0,1,70.03,144.853Zm3.731-4.41-.789,4.359a.066.066,0,0,1-.063.051h-1.1a.064.064,0,0,1-.063-.051l-.789-4.357a.064.064,0,0,1,.013-.055.07.07,0,0,1,.051-.025H73.7a.06.06,0,0,1,.051.025A.064.064,0,0,1,73.76,140.443Zm3.737,0L76.26,144.8a.068.068,0,0,1-.063.049H74.684a.063.063,0,0,1-.051-.025.064.064,0,0,1-.013-.055l.973-4.357a.066.066,0,0,1,.063-.051h1.777a.071.071,0,0,1,.053.025A.076.076,0,0,1,77.5,140.448Z"
                          transform="translate(-62.393 -135.3)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="offcanvas__stikcy--toolbar__label">
                      Cart
                    </span>
                    <span className="items__count">{afterLoginCount}</span>
                  </Link>
                </li>
                <li className="offcanvas__stikcy--toolbar__list">
                  <Link
                    className="offcanvas__stikcy--toolbar__btn"
                    href="/wishlist"
                  >
                    <span className="offcanvas__stikcy--toolbar__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.541"
                        height="15.557"
                        viewBox="0 0 18.541 15.557"
                      >
                        <path
                          d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z"
                          transform="translate(-62.498 -132.915)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="offcanvas__stikcy--toolbar__label">
                      Wishlist
                    </span>
                    <span className="items__count wishlist__count">
                      {afterLoginWishCount}
                    </span>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="offcanvas__stikcy--toolbar__list">
                  <Link
                    className="offcanvas__stikcy--toolbar__btn minicart__open--btn"
                    href="/cart"
                  >
                    <span className="offcanvas__stikcy--toolbar__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.51"
                        height="15.443"
                        viewBox="0 0 18.51 15.443"
                      >
                        <path
                          d="M79.963,138.379l-13.358,0-.56-1.927a.871.871,0,0,0-.6-.592l-1.961-.529a.91.91,0,0,0-.226-.03.864.864,0,0,0-.226,1.7l1.491.4,3.026,10.919a1.277,1.277,0,1,0,1.844,1.144.358.358,0,0,0,0-.049h6.163c0,.017,0,.034,0,.049a1.277,1.277,0,1,0,1.434-1.267c-1.531-.247-7.783-.55-7.783-.55l-.205-.8h7.8a.9.9,0,0,0,.863-.651l1.688-5.943h.62a.936.936,0,1,0,0-1.872Zm-9.934,6.474H68.568c-.04,0-.1.008-.125-.085-.034-.118-.082-.283-.082-.283l-1.146-4.037a.061.061,0,0,1,.011-.057.064.064,0,0,1,.053-.025h1.777a.064.064,0,0,1,.063.051l.969,4.34,0,.013a.058.058,0,0,1,0,.019A.063.063,0,0,1,70.03,144.853Zm3.731-4.41-.789,4.359a.066.066,0,0,1-.063.051h-1.1a.064.064,0,0,1-.063-.051l-.789-4.357a.064.064,0,0,1,.013-.055.07.07,0,0,1,.051-.025H73.7a.06.06,0,0,1,.051.025A.064.064,0,0,1,73.76,140.443Zm3.737,0L76.26,144.8a.068.068,0,0,1-.063.049H74.684a.063.063,0,0,1-.051-.025.064.064,0,0,1-.013-.055l.973-4.357a.066.066,0,0,1,.063-.051h1.777a.071.071,0,0,1,.053.025A.076.076,0,0,1,77.5,140.448Z"
                          transform="translate(-62.393 -135.3)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="offcanvas__stikcy--toolbar__label">
                      Cart
                    </span>
                    <span className="items__count">{cart1.length}</span>
                  </Link>
                </li>
                <li className="offcanvas__stikcy--toolbar__list">
                  <Link
                    className="offcanvas__stikcy--toolbar__btn"
                    href="wishlist"
                  >
                    <span className="offcanvas__stikcy--toolbar__icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18.541"
                        height="15.557"
                        viewBox="0 0 18.541 15.557"
                      >
                        <path
                          d="M71.775,135.51a5.153,5.153,0,0,1,1.267-1.524,4.986,4.986,0,0,1,6.584.358,4.728,4.728,0,0,1,1.174,4.914,10.458,10.458,0,0,1-2.132,3.808,22.591,22.591,0,0,1-5.4,4.558c-.445.282-.9.549-1.356.812a.306.306,0,0,1-.254.013,25.491,25.491,0,0,1-6.279-4.8,11.648,11.648,0,0,1-2.52-4.009,4.957,4.957,0,0,1,.028-3.787,4.629,4.629,0,0,1,3.744-2.863,4.782,4.782,0,0,1,5.086,2.447c.013.019.025.034.057.076Z"
                          transform="translate(-62.498 -132.915)"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className="offcanvas__stikcy--toolbar__label">
                      Wishlist
                    </span>
                    <span className="items__count wishlist__count">
                      {wish1.length}
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        {/* End Offcanvas stikcy toolbar */}
      </header>
    </>
  );
};

export default Navbar;
