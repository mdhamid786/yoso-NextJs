"use client";
import React from "react";
import "./success.css";
import Link from "next/link";
import success from "../../../public/payment.png";
import Image from "next/image";

const Page = () => {

    const paymentId = typeof window !== 'undefined' ? localStorage.getItem("paymentId") : null;

    const removePaymentId = ()=>{
      if (typeof window !== "undefined") {
        localStorage.removeItem("paymentId");
      }
    }

  return (
    <>
      {/* <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: "300px", width: "auto" }}
                    src={success}
                    alt="Empty Cart Image"
                  />
                </div>
                <div style={{ marginTop: "30px" }} className="contant_box_404">
                  <h3 className="h2">Your Order is Confirmed</h3>
                  <p>
                    We have received your order and are processing it. Below are
                    the details of your purchase:
                  </p>
                  {paymentId ? (
                <p>Payment ID: {paymentId}</p>
                  ):null}
                

                  <Link onClick={removePaymentId} href="/my-account" className="link_404">
                    Check Status
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}


<section className="error__section section--padding">
  <div className="container">
    <div className="row row-cols-1">
      <div className="col">
        <div className="error__content text-center">
        <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ height: "300px", width: "auto" }}
                    src={success}
                    alt="Empty Cart Image"
                  />
                </div>
          <h2 className="error__content--title">
          Your Order is Confirmed!
          </h2>
          <p className="error__content--desc">
          We have received your order and are processing it. Below are
                    the details of your purchase
          </p>
          {paymentId ? (
                <p>Payment ID: {paymentId}</p>
                  ):null}
          <Link onClick={removePaymentId} className="error__content--btn primary__btn" href="/my-account">
          Check Status
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

    </>
  );
};

export default Page;
