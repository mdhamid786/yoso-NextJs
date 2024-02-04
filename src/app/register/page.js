"use client"
import Register from "@/components/Register";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <>
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <section className="breadcrumb__section breadcrumb__bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content">
                  <h1 className="breadcrumb__content--title text-white mb-10">
                    Account Page
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex">
                    <li className="breadcrumb__content--menu__items">
                      <Link className="text-white" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">Account Page</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* Start login section  */}
        <div className="login__section section--padding">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <Register />
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Page;
