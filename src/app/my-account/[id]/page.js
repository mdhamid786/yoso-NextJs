"use client";
import { postWithToken } from "@/Helper/common";
import OrderHistory from "@/components/OrderHistory";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Page = () => {
  const [subOrder, setSubOrder] = useState();
  const [subOrder1, setSubOrder1] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState();

  const id = params.id;

  const Suborder = async () => {
    const id = params.id;
    const apiData = JSON.stringify({ id });
    try {
      const data = await postWithToken("sub-order", apiData);
      if (data.error == false) {
        setSubOrder(data.result);

        setSubOrder1(data.result.orderDetails);
        setLoading(false);
      } else {
        setSubOrder([]);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    Suborder();
  }, []);


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
                    My Account
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex">
                    <li className="breadcrumb__content--menu__items">
                      <Link className="text-white" href="index">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">My Account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* my account section start */}
        <section className="my__account--section section--padding">
          <div className="container">
            {/* <p className="account__welcome--text">
              Hello, welcome to your dashboard!
            </p> */}
            <div className="my__account--section__inner border-radius-10 d-flex">
              <Sidebar />
              <div className="account__wrapper">
                <div className="account__content">
                  <h3 className="account__content--title mb-20">
                    Orders Details
                  </h3>
                  {/* <div className="account__table--area"> */}
                  {/* <div> */}

                  {/* dvvdvdv */}
                  <div className="modal-body">
                    <div className="quickview__inner">
                      <div className="row ">
                        <div className="table-responsive ">
                        <div className="table-responsive">
      <table
        id="dataTableExample1"
        className="table table-bordered table-striped table-hover cw-cart-table col-lg-12"
      >
        <thead className="cw-cart-table thead-dark">
          <tr className="cw-cart-table">
            <th className="product-price cw-align has-title">S.N.</th>
            <th className="product-price cw-align has-title">Image</th>
            <th className="product-price cw-align has-title">Product</th>
            <th className="product-price cw-align has-title">Quantity</th>
            <th className="product-price cw-align has-title">Order Status</th>
            <th className="product-price cw-align has-title">Payment Status</th>
            <th className="product-price cw-align has-title">Total Price</th>
          </tr>
        </thead>
        {subOrder1 && subOrder1.length > 0 ? (
          <tbody style={{ textAlign: 'center' }} className="cw-cart-table">
            {subOrder1.map((data, index) => (
              <tr key={index} className="product-price cw-align has-title">
                <td>{index + 1}</td>
                <td>
                  <img
                    style={{ height: 60 }}
                    src={data.product_image}
                    className="img-fluid display-block border-radius-5"
                    alt="product"
                  />
                </td>
                <td>{data.product_name}</td>
                <td>{data.qty}</td>
                <td>{data.order_status}</td>
                <td>{data.payment_status}</td>
                <td>₹{data.sub_total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        ) : null}

        <tfoot style={{ paddingTop: '20px' }} className="product-price cw-align has-title">
          <tr className="product-price cw-align has-title">
            <th colSpan={5} />
            <th className="product-price cw-align has-title">Sub Total</th>
            <th>₹{subOrder?.sub_total}</th>
          </tr>
          {subOrder?.shipping>0 ? (
             <tr className="product-price cw-align has-title">
             <th colSpan={5} />
             <th className="product-price cw-align has-title">Shipping Charge</th>
             <th>₹{subOrder?.shipping}</th>
           </tr> 
              ):null}
          

          {subOrder?.discount>0 ? (
 <tr className="product-price cw-align has-title">
 <th colSpan={5} />
 <th className="product-price cw-align has-title"> Discount Amount</th>
 <th>₹{subOrder?.discount}</th>
</tr>
          ):null}
         
          {subOrder?.couponcode_amount > 0? (
            <tr className="product-price cw-align has-title">
            <th colSpan={5} />
            <th className="product-price cw-align has-title"> Coupon Discount Amount</th>
            <th>₹{subOrder?.couponcode_amount}</th>
          </tr>
          ):null}
          
          <tr className="product-price cw-align has-title">
            <th colSpan={5} />
            <th className="product-price cw-align has-title">Final Amount</th>
            <th>₹{subOrder?.amount}</th>
          </tr>
        </tfoot>
      </table>
    </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/*  */}
                  {/* </div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* my account section end */}
        {/* Start Newsletter banner section */}
        <section className="newsletter__banner--section section--padding pt-0">
          <div className="container">
            <div className="newsletter__banner--thumbnail position__relative">
              <img
                className="newsletter__banner--thumbnail__img"
                src="/img/banner/banner-bg7.webp"
                alt="newsletter-banner"
              />
              <div className="newsletter__content newsletter__subscribe">
                <h5 className="newsletter__content--subtitle text-white">
                  Want to offer regularly ?
                </h5>
                <h2 className="newsletter__content--title text-white h3 mb-25">
                  Subscribe Our Newsletter <br /> for Get Daily Update
                </h2>
                <form
                  className="newsletter__subscribe--form position__relative"
                  action="#"
                >
                  <label>
                    <input
                      className="newsletter__subscribe--input"
                      placeholder="Enter your email address"
                      type="email"
                    />
                  </label>
                  <button
                    className="newsletter__subscribe--button primary__btn"
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
        </section>
        {/* End Newsletter banner section */}
      </main>
    </>
  );
};

export default Page;
