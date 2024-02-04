"use client";
import Link from "next/link";
import React from "react";

const TermCondition = ({ term }) => {
  return (
    <div>
      <section className="breadcrumb__section breadcrumb__bg">
        <div className="container">
          <div className="row row-cols-1">
            <div className="col">
              <div className="breadcrumb__content">
                <h1 className="breadcrumb__content--title text-white mb-10">
                  term.title
                </h1>
                <ul className="breadcrumb__content--menu d-flex">
                  <li className="breadcrumb__content--menu__items">
                    <Link className="text-white" href="index.html">
                      Home
                    </Link>
                  </li>
                  <li className="breadcrumb__content--menu__items">
                    <span className="text-white">term.title</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="faq__section section--padding">
        <div className="container">
          <div className="faq__section--inner">
            <div className="face__step one border-bottom" id="accordionExample">
              <h3 className="face__step--title mb-30">term.title</h3>
            </div>
            <h3 className="face__step--title mb-30">Description</h3>
            <p style={{ textAlign: "justify" }}>term.description</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermCondition;
