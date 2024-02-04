"use client";
import { postApiData } from "@/Helper/common";
import Link from "next/link";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Footer = () => {
  const [email, setEmail] = useState("");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // @Des newsLatter api calling ...
  const newsLatterSubsFun = async (event) => {
    const apiData = JSON.stringify({ email });
    event.preventDefault();

    try {
      const data = await postApiData("newsletter-subscribe", apiData);
      if (data.error == false) {
        setEmail("");
        toast.success(data.message, {
          position: "top-left",
        });
      } else {
        toast.error(data.message, {
          position: "top-left",
        });
      }
    } catch (errorData) {
      toast.error(errorData.message, {
        position: "top-left",
      });
    }
  };

  const [isAccordionVisible, setAccordionVisible] = useState(false);

  const toggleAccordion = () => {
    setAccordionVisible(!isAccordionVisible);
  };

  const [isAccordionVisible1, setAccordionVisible1] = useState(false);

  const toggleAccordion1 = () => {
    setAccordionVisible1(!isAccordionVisible1);
  };

  const [isAccordionVisible2, setAccordionVisible2] = useState(false);

  const toggleAccordion2 = () => {
    setAccordionVisible2(!isAccordionVisible2);
  };

  const [isAccordionVisible3, setAccordionVisible3] = useState(false);

  const toggleAccordion3 = () => {
    setAccordionVisible3(!isAccordionVisible3);
  };

  return (
    <>
      <footer className="footer__section footer__bg">
        <div className="container-fluid">
          <div className="main__footer">
            <div className="row">
              {/* about */}
              <div className="col-lg-3 col-md-6">
                <div  className={`footer__widget`}>
                  <h2 className="footer__widget--title d-none d-md-block">
                    About Us{" "}
                    {isAccordionVisible && (
                      <>
                          <div className="">
                    <Link className="footer__logo" href="index">
                      <img src="/img/logo/nav-log.webp" alt="footer-logo" />
                    </Link>
                    <p className="footer__widget--desc">
                      We YATAS INDIA Jewellery design studio , with a huge range
                      of designer Jewellery,
                    </p>
                    <div className="footer__social">
                      <ul className="social__shear d-flex">
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.facebook.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11.239"
                              height="20.984"
                              viewBox="0 0 11.239 20.984"
                            >
                              <path
                                id="Icon_awesome-facebook-f"
                                data-name="Icon awesome-facebook-f"
                                d="M11.575,11.8l.583-3.8H8.514V5.542A1.9,1.9,0,0,1,10.655,3.49h1.657V.257A20.2,20.2,0,0,0,9.371,0c-3,0-4.962,1.819-4.962,5.112V8.006H1.073v3.8H4.409v9.181H8.514V11.8Z"
                                transform="translate(-1.073)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Facebook</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://twitter.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height="19.492"
                              viewBox="0 0 24 19.492"
                            >
                              <path
                                id="Icon_awesome-twitter"
                                data-name="Icon awesome-twitter"
                                d="M21.533,7.112c.015.213.015.426.015.64A13.9,13.9,0,0,1,7.553,21.746,13.9,13.9,0,0,1,0,19.538a10.176,10.176,0,0,0,1.188.061,9.851,9.851,0,0,0,6.107-2.1,4.927,4.927,0,0,1-4.6-3.411,6.2,6.2,0,0,0,.929.076,5.2,5.2,0,0,0,1.294-.167A4.919,4.919,0,0,1,.975,9.168V9.107A4.954,4.954,0,0,0,3.2,9.731,4.926,4.926,0,0,1,1.675,3.152,13.981,13.981,0,0,0,11.817,8.3,5.553,5.553,0,0,1,11.7,7.173a4.923,4.923,0,0,1,8.513-3.365A9.684,9.684,0,0,0,23.33,2.619,4.906,4.906,0,0,1,21.167,5.33,9.861,9.861,0,0,0,24,4.569a10.573,10.573,0,0,1-2.467,2.543Z"
                                transform="translate(0 -2.254)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Twitter</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.instagram.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19.497"
                              height="19.492"
                              viewBox="0 0 19.497 19.492"
                            >
                              <path
                                id="Icon_awesome-instagram"
                                data-name="Icon awesome-instagram"
                                d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z"
                                transform="translate(0.004 -1.492)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Instagram</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.linkedin.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19.419"
                              height="19.419"
                              viewBox="0 0 19.419 19.419"
                            >
                              <path
                                id="Icon_awesome-linkedin-in"
                                data-name="Icon awesome-linkedin-in"
                                d="M4.347,19.419H.321V6.454H4.347ZM2.332,4.686A2.343,2.343,0,1,1,4.663,2.332,2.351,2.351,0,0,1,2.332,4.686ZM19.415,19.419H15.4V13.108c0-1.5-.03-3.433-2.093-3.433-2.093,0-2.414,1.634-2.414,3.325v6.42H6.869V6.454H10.73V8.223h.056A4.23,4.23,0,0,1,14.6,6.129c4.075,0,4.824,2.683,4.824,6.168v7.122Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Linkedin</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                      </>
                    )}
                    <svg
                      onClick={toggleAccordion}
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </h2>
                  <div className="footer__widget--inner">
                    <Link className="footer__logo" href="index">
                      <img src="/img/logo/nav-log.webp" alt="footer-logo" />
                    </Link>
                    <p className="footer__widget--desc">
                      We YATAS INDIA Jewellery design studio , with a huge range
                      of designer Jewellery,
                    </p>
                    <div className="footer__social">
                      <ul className="social__shear d-flex">
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.facebook.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11.239"
                              height="20.984"
                              viewBox="0 0 11.239 20.984"
                            >
                              <path
                                id="Icon_awesome-facebook-f"
                                data-name="Icon awesome-facebook-f"
                                d="M11.575,11.8l.583-3.8H8.514V5.542A1.9,1.9,0,0,1,10.655,3.49h1.657V.257A20.2,20.2,0,0,0,9.371,0c-3,0-4.962,1.819-4.962,5.112V8.006H1.073v3.8H4.409v9.181H8.514V11.8Z"
                                transform="translate(-1.073)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Facebook</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://twitter.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={24}
                              height="19.492"
                              viewBox="0 0 24 19.492"
                            >
                              <path
                                id="Icon_awesome-twitter"
                                data-name="Icon awesome-twitter"
                                d="M21.533,7.112c.015.213.015.426.015.64A13.9,13.9,0,0,1,7.553,21.746,13.9,13.9,0,0,1,0,19.538a10.176,10.176,0,0,0,1.188.061,9.851,9.851,0,0,0,6.107-2.1,4.927,4.927,0,0,1-4.6-3.411,6.2,6.2,0,0,0,.929.076,5.2,5.2,0,0,0,1.294-.167A4.919,4.919,0,0,1,.975,9.168V9.107A4.954,4.954,0,0,0,3.2,9.731,4.926,4.926,0,0,1,1.675,3.152,13.981,13.981,0,0,0,11.817,8.3,5.553,5.553,0,0,1,11.7,7.173a4.923,4.923,0,0,1,8.513-3.365A9.684,9.684,0,0,0,23.33,2.619,4.906,4.906,0,0,1,21.167,5.33,9.861,9.861,0,0,0,24,4.569a10.573,10.573,0,0,1-2.467,2.543Z"
                                transform="translate(0 -2.254)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Twitter</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.instagram.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19.497"
                              height="19.492"
                              viewBox="0 0 19.497 19.492"
                            >
                              <path
                                id="Icon_awesome-instagram"
                                data-name="Icon awesome-instagram"
                                d="M9.747,6.24a5,5,0,1,0,5,5A4.99,4.99,0,0,0,9.747,6.24Zm0,8.247A3.249,3.249,0,1,1,13,11.238a3.255,3.255,0,0,1-3.249,3.249Zm6.368-8.451A1.166,1.166,0,1,1,14.949,4.87,1.163,1.163,0,0,1,16.115,6.036Zm3.31,1.183A5.769,5.769,0,0,0,17.85,3.135,5.807,5.807,0,0,0,13.766,1.56c-1.609-.091-6.433-.091-8.042,0A5.8,5.8,0,0,0,1.64,3.13,5.788,5.788,0,0,0,.065,7.215c-.091,1.609-.091,6.433,0,8.042A5.769,5.769,0,0,0,1.64,19.341a5.814,5.814,0,0,0,4.084,1.575c1.609.091,6.433.091,8.042,0a5.769,5.769,0,0,0,4.084-1.575,5.807,5.807,0,0,0,1.575-4.084c.091-1.609.091-6.429,0-8.038Zm-2.079,9.765a3.289,3.289,0,0,1-1.853,1.853c-1.283.509-4.328.391-5.746.391S5.28,19.341,4,18.837a3.289,3.289,0,0,1-1.853-1.853c-.509-1.283-.391-4.328-.391-5.746s-.113-4.467.391-5.746A3.289,3.289,0,0,1,4,3.639c1.283-.509,4.328-.391,5.746-.391s4.467-.113,5.746.391a3.289,3.289,0,0,1,1.853,1.853c.509,1.283.391,4.328.391,5.746S17.855,15.705,17.346,16.984Z"
                                transform="translate(0.004 -1.492)"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Instagram</span>
                          </Link>
                        </li>
                        <li className="social__shear--list">
                          <Link
                            className="social__shear--list__icon"
                            target="_blank"
                            href="https://www.linkedin.com"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="19.419"
                              height="19.419"
                              viewBox="0 0 19.419 19.419"
                            >
                              <path
                                id="Icon_awesome-linkedin-in"
                                data-name="Icon awesome-linkedin-in"
                                d="M4.347,19.419H.321V6.454H4.347ZM2.332,4.686A2.343,2.343,0,1,1,4.663,2.332,2.351,2.351,0,0,1,2.332,4.686ZM19.415,19.419H15.4V13.108c0-1.5-.03-3.433-2.093-3.433-2.093,0-2.414,1.634-2.414,3.325v6.42H6.869V6.454H10.73V8.223h.056A4.23,4.23,0,0,1,14.6,6.129c4.075,0,4.824,2.683,4.824,6.168v7.122Z"
                                fill="currentColor"
                              />
                            </svg>
                            <span className="visually-hidden">Linkedin</span>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>


              {/* Quick Links */}
              <div className="col-lg-3 col-md-6">
                <div className="footer__widget">
                  <h2 className="footer__widget--title ">
                    Quick Links{" "}

                    {isAccordionVisible1 && (
                      <>
                         <ul className="footer__widget--menu ">
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/about"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="wishlist"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="contact"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/term-condition"
                      >
                        Term & Condition
                      </Link>
                    </li>
                  </ul>
                      </>
                       )}
                    <svg
                     onClick={toggleAccordion1}
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </h2>
                  <ul className="footer__widget--menu footer__widget--inner">
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/about"
                      >
                        About Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="wishlist"
                      >
                        Wishlist
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="contact"
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/privacy-policy"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/information/term-condition"
                      >
                        Term & Condition
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/*  Account Info */}
              <div className="col-lg-3 col-md-6">
                <div className="footer__widget">
                  <h2 className="footer__widget--title ">
                    Account Info{" "}
                    {isAccordionVisible2 && (
                      <>
                     <ul className="">
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/my-account"
                      >
                        My Account
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" href="cart">
                        Shopping Cart
                      </Link>
                    </li>
                    {token ? null : (
                      <>
                        <li className="footer__widget--menu__list">
                          <Link
                            className="footer__widget--menu__text"
                            href="/login"
                          >
                            Login
                          </Link>
                        </li>
                        <li className="footer__widget--menu__list">
                          <Link
                            className="footer__widget--menu__text"
                            href="/register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}

                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="checkout"
                      >
                        Checkout
                      </Link>
                    </li>
                  </ul>
                      </>
                    )}
                    {/* <button
                      className="footer__widget--button"
                      aria-label="footer widget button"
                    /> */}
                    <svg
                    onClick={toggleAccordion2}
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </h2>
                  <ul className="footer__widget--menu footer__widget--inner">
                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="/my-account"
                      >
                        My Account
                      </Link>
                    </li>
                    <li className="footer__widget--menu__list">
                      <Link className="footer__widget--menu__text" href="cart">
                        Shopping Cart
                      </Link>
                    </li>
                    {token ? null : (
                      <>
                        <li className="footer__widget--menu__list">
                          <Link
                            className="footer__widget--menu__text"
                            href="/login"
                          >
                            Login
                          </Link>
                        </li>
                        <li className="footer__widget--menu__list">
                          <Link
                            className="footer__widget--menu__text"
                            href="/register"
                          >
                            Register
                          </Link>
                        </li>
                      </>
                    )}

                    <li className="footer__widget--menu__list">
                      <Link
                        className="footer__widget--menu__text"
                        href="checkout"
                      >
                        Checkout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div className="footer__widget">
                  <h2 className="footer__widget--title ">
                    Newsletter{" "}
                    {isAccordionVisible3 && (
                      <>
                       <div className="footer__newsletter ">
                    <p className="footer__newsletter--desc">
                      Get updates by subscribe our weekly newsletter
                    </p>
                    <form
                      onSubmit={newsLatterSubsFun}
                      className="newsletter__subscribe--form__style position__relative"
                      action="#"
                    >
                      <label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="footer__newsletter--input newsletter__subscribe--input"
                          placeholder="Enter your email address"
                          type="email"
                        />
                      </label>
                      <button
                        className="footer__newsletter--button newsletter__subscribe--button primary__btn"
                        type="submit"
                      >
                        Subscribe
                        <svg
                          className="newsletter__subscribe--button__icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="9.159"
                          height="7.85"
                          viewBox="0 0 9.159 7.85"
                        >
                          <path
                            data-name="Icon material-send"
                            d="M3,12.35l9.154-3.925L3,4.5,3,7.553l6.542.872L3,9.3Z"
                            transform="translate(-3 -4.5)"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                      </>
                       )}
                  
                    <svg
                    onClick={toggleAccordion3}
                      className="footer__widget--title__arrowdown--icon"
                      xmlns="http://www.w3.org/2000/svg"
                      width="12.355"
                      height="8.394"
                      viewBox="0 0 10.355 6.394"
                    >
                      <path
                        d="M15.138,8.59l-3.961,3.952L7.217,8.59,6,9.807l5.178,5.178,5.178-5.178Z"
                        transform="translate(-6 -8.59)"
                        fill="currentColor"
                      />
                    </svg>
                  </h2>
                  <div className="footer__newsletter footer__widget--inner">
                    <p className="footer__newsletter--desc">
                      Get updates by subscribe our weekly newsletter
                    </p>
                    <form
                      onSubmit={newsLatterSubsFun}
                      className="newsletter__subscribe--form__style position__relative"
                      action="#"
                    >
                      <label>
                        <input
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="footer__newsletter--input newsletter__subscribe--input"
                          placeholder="Enter your email address"
                          type="email"
                        />
                      </label>
                      <button
                        className="footer__newsletter--button newsletter__subscribe--button primary__btn"
                        type="submit"
                      >
                        Subscribe
                        <svg
                          className="newsletter__subscribe--button__icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="9.159"
                          height="7.85"
                          viewBox="0 0 9.159 7.85"
                        >
                          <path
                            data-name="Icon material-send"
                            d="M3,12.35l9.154-3.925L3,4.5,3,7.553l6.542.872L3,9.3Z"
                            transform="translate(-3 -4.5)"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__bottom d-flex justify-content-between align-items-center">
            <p className="copyright__content  m-0">
              Copyright © 2024{" "}
              <Link className="copyright__content--link" href="index">
                YATAS
              </Link>{" "}
              . All Rights Reserved.Design By YATAS
            </p>
            <div className="footer__payment text-right">
              <img
                className="footer__payment--visa__card display-block"
                src="/img/other/payment-visa-card.webp"
                alt="visa-card"
              />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
