"use client"
import Link from 'next/link'
import React from 'react'

const Testimonial = () => {
  return (
    <>
        <section className="testimonial__section section--padding pt-0">
    <div className="container-fluid">
      <div className="row row-cols-xl-2 row-cols-1">
        <div className="col col-lg-order">
          <div className="testimonial__banner--thumbnail">
            <Link className="display-block" href="shop">
              <img
                className="testimonial__banner--thumbnail__img display-block"
                src="/img/banner/banner10.webp"
                alt="banner-img"
              />
            </Link>
          </div>
        </div>
        <div className="col">
          <div className="testimonial__section--inner">
            <div className="section__heading style2 border-bottom mb-50">
              <h2 className="section__heading--maintitle">
                Clints Testimonial
              </h2>
            </div>
            <div className=" testimonial__swiper--activation testimonial__padding swiper">
              <div className="swiper-wrapper">
                <div className="swiper-slide">
                  <div className="testimonial__items">
                    <div className="testimonial__items--topbar d-flex align-items-center">
                      <div className="testimonial__items--thumbnail">
                        <img
                          className="testimonial__items--thumbnail__img display-block"
                          src="/img/other/testimonial-thumb1.webp"
                          alt="testimonial-img"
                        />
                      </div>
                      <div className="testimonial__items--author">
                        <h3 className="testimonial__items--author__title h4">
                          Abdur Razzak
                        </h3>
                        <h4 className="testimonial__items--author__subtitle h5">
                          Ui Ux Designer
                        </h4>
                        <ul className="rating testimonial__rating d-flex">
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="testimonial__items--content">
                      <svg
                        className="testimonial__icon--svg"
                        data-name="Group 546"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.479"
                        height="18.939"
                        viewBox="0 0 21.479 18.939"
                      >
                        <path
                          data-name="Path 131"
                          d="M8.629,11.089A1.033,1.033,0,0,0,9.149,9.7L8.3,7.918a1.036,1.036,0,0,0-1.352-.5A11.937,11.937,0,0,0,3.206,9.841,9.053,9.053,0,0,0,.693,13.809,21.762,21.762,0,0,0,0,19.908v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04v-6.81a1.043,1.043,0,0,0-1.04-1.04H4.592A7.306,7.306,0,0,1,5.8,13.168,6.586,6.586,0,0,1,8.629,11.089Z"
                          transform="translate(0 -7.328)"
                          fill="currentColor"
                        />
                        <path
                          data-name="Path 132"
                          d="M79.312,11.172a1.033,1.033,0,0,0,.52-1.386l-.849-1.767a1.036,1.036,0,0,0-1.352-.5,12.552,12.552,0,0,0-3.725,2.408,9.248,9.248,0,0,0-2.53,3.985,21.47,21.47,0,0,0-.676,6.082v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04V18.5a1.043,1.043,0,0,0-1.04-1.04H75.274a7.307,7.307,0,0,1,1.213-4.211A6.585,6.585,0,0,1,79.312,11.172Z"
                          transform="translate(-58.45 -7.411)"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="testimonial__items--desc">
                        Mum ut perspiciatis unde omnis iste natus ganu error sit
                        voluptatem accusan tium gyauey aykua doloremque sdggsuj
                        jjsiaalji aialadju auoa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__items">
                    <div className="testimonial__items--topbar d-flex align-items-center">
                      <div className="testimonial__items--thumbnail">
                        <img
                          className="testimonial__items--thumbnail__img display-block"
                          src="/img/other/testimonial-thumb2.webp"
                          alt="testimonial-img"
                        />
                      </div>
                      <div className="testimonial__items--author">
                        <h3 className="testimonial__items--author__title h4">
                          James Hamesk
                        </h3>
                        <h4 className="testimonial__items--author__subtitle h5">
                          Manager
                        </h4>
                        <ul className="rating testimonial__rating d-flex">
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="testimonial__items--content">
                      <svg
                        className="testimonial__icon--svg"
                        data-name="Group 546"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.479"
                        height="18.939"
                        viewBox="0 0 21.479 18.939"
                      >
                        <path
                          data-name="Path 131"
                          d="M8.629,11.089A1.033,1.033,0,0,0,9.149,9.7L8.3,7.918a1.036,1.036,0,0,0-1.352-.5A11.937,11.937,0,0,0,3.206,9.841,9.053,9.053,0,0,0,.693,13.809,21.762,21.762,0,0,0,0,19.908v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04v-6.81a1.043,1.043,0,0,0-1.04-1.04H4.592A7.306,7.306,0,0,1,5.8,13.168,6.586,6.586,0,0,1,8.629,11.089Z"
                          transform="translate(0 -7.328)"
                          fill="currentColor"
                        />
                        <path
                          data-name="Path 132"
                          d="M79.312,11.172a1.033,1.033,0,0,0,.52-1.386l-.849-1.767a1.036,1.036,0,0,0-1.352-.5,12.552,12.552,0,0,0-3.725,2.408,9.248,9.248,0,0,0-2.53,3.985,21.47,21.47,0,0,0-.676,6.082v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04V18.5a1.043,1.043,0,0,0-1.04-1.04H75.274a7.307,7.307,0,0,1,1.213-4.211A6.585,6.585,0,0,1,79.312,11.172Z"
                          transform="translate(-58.45 -7.411)"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="testimonial__items--desc">
                        Mum ut perspiciatis unde omnis iste natus ganu error sit
                        voluptatem accusan tium gyauey aykua doloremque sdggsuj
                        jjsiaalji aialadju auoa.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="swiper-slide">
                  <div className="testimonial__items">
                    <div className="testimonial__items--topbar d-flex align-items-center">
                      <div className="testimonial__items--thumbnail">
                        <img
                          className="testimonial__items--thumbnail__img display-block"
                          src="/img/other/testimonial-thumb1.webp"
                          alt="testimonial-img"
                        />
                      </div>
                      <div className="testimonial__items--author">
                        <h3 className="testimonial__items--author__title h4">
                          Abdur Razzak
                        </h3>
                        <h4 className="testimonial__items--author__subtitle h5">
                          Ui Ux Designer
                        </h4>
                        <ul className="rating testimonial__rating d-flex">
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                          <li className="rating__list">
                            <span className="rating__list--icon">
                              <svg
                                className="rating__list--icon__svg"
                                xmlns="http://www.w3.org/2000/svg"
                                width="11.105"
                                height="11.732"
                                viewBox="0 0 10.105 9.732"
                              >
                                <path
                                  data-name="star - Copy"
                                  d="M9.837,3.5,6.73,3.039,5.338.179a.335.335,0,0,0-.571,0L3.375,3.039.268,3.5a.3.3,0,0,0-.178.514L2.347,6.242,1.813,9.4a.314.314,0,0,0,.464.316L5.052,8.232,7.827,9.712A.314.314,0,0,0,8.292,9.4L7.758,6.242l2.257-2.231A.3.3,0,0,0,9.837,3.5Z"
                                  transform="translate(0 -0.018)"
                                  fill="currentColor"
                                />
                              </svg>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="testimonial__items--content">
                      <svg
                        className="testimonial__icon--svg"
                        data-name="Group 546"
                        xmlns="http://www.w3.org/2000/svg"
                        width="21.479"
                        height="18.939"
                        viewBox="0 0 21.479 18.939"
                      >
                        <path
                          data-name="Path 131"
                          d="M8.629,11.089A1.033,1.033,0,0,0,9.149,9.7L8.3,7.918a1.036,1.036,0,0,0-1.352-.5A11.937,11.937,0,0,0,3.206,9.841,9.053,9.053,0,0,0,.693,13.809,21.762,21.762,0,0,0,0,19.908v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04v-6.81a1.043,1.043,0,0,0-1.04-1.04H4.592A7.306,7.306,0,0,1,5.8,13.168,6.586,6.586,0,0,1,8.629,11.089Z"
                          transform="translate(0 -7.328)"
                          fill="currentColor"
                        />
                        <path
                          data-name="Path 132"
                          d="M79.312,11.172a1.033,1.033,0,0,0,.52-1.386l-.849-1.767a1.036,1.036,0,0,0-1.352-.5,12.552,12.552,0,0,0-3.725,2.408,9.248,9.248,0,0,0-2.53,3.985,21.47,21.47,0,0,0-.676,6.082v5.319a1.043,1.043,0,0,0,1.04,1.04h6.81a1.043,1.043,0,0,0,1.04-1.04V18.5a1.043,1.043,0,0,0-1.04-1.04H75.274a7.307,7.307,0,0,1,1.213-4.211A6.585,6.585,0,0,1,79.312,11.172Z"
                          transform="translate(-58.45 -7.411)"
                          fill="currentColor"
                        />
                      </svg>
                      <p className="testimonial__items--desc">
                        Mum ut perspiciatis unde omnis iste natus ganu error sit
                        voluptatem accusan tium gyauey aykua doloremque sdggsuj
                        jjsiaalji aialadju auoa.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="testimonial__pagination swiper-pagination" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Testimonial
