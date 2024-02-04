"use client";
import Link from "next/link";
import React from "react";

const BreadcrumbWish = () => {
  return (
    <>
      <section className="breadcrumb__section breadcrumb__bg">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content">
                <h1 className="breadcrumb__content--title text-white mb-10">
                  Wishlist
                </h1>
                <ul className="breadcrumb__content--menu d-flex">
                  <li className="breadcrumb__content--menu__items">
                    <Link className="text-white" href="/">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb__content--menu__items">
                    <span className="text-white">Wishlist</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BreadcrumbWish;
