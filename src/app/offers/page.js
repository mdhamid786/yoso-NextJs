"use client";
import { getApiData, getWithToken } from "@/Helper/common";
import Banner from "@/components/Banner";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

const Page = () => {
  const [loading, setLoading] = useState(true);
  const [getCoupnenCode, setCoupenCode] = useState([""]);

  // @  gellAll coupen API call
  const getAllCoupenCode = async () => {
    try {
      const data = await getWithToken("getCouponCode");

      if (data.error == false) {
        setCoupenCode(data.result);
        setLoading(false);
      } else {
        setCoupenCode([]);
      }
    } catch (error) {
      console.error("Error fetching coupen code:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllCoupenCode();
  }, []);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopyClick = (index, couponCode) => {
   
    const tempInput = document.createElement('input');
    tempInput.value = couponCode;
    document.body.appendChild(tempInput);
    setTimeout(() => {
      toast.success("Copied Coupon Code!",{
        position:"top-left"
      })
    }, 1000);
    

    // Select and copy the text
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
  };
  return (
    
    <div>
        <section className="breadcrumb__section breadcrumb__bg">
    <div className="container">
      <div className="row row-cols-1">
        <div className="col">
          <div className="breadcrumb__content">
            <h1 className="breadcrumb__content--title text-white mb-10">
              Latest Offers
            </h1>
            <ul className="breadcrumb__content--menu d-flex">
              <li className="breadcrumb__content--menu__items">
                <Link className="text-white" href="/">
                  Home
                </Link>
              </li>
              <li className="breadcrumb__content--menu__items">
                <span className="text-white">Offers</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
      <section className="banner__section section--padding">
        <div className="container-fluid">
        <div className="row mb--n28">
      {getCoupnenCode && getCoupnenCode.length > 0
        ? getCoupnenCode.map((item, index) => (
            <div key={index} className="col-md-4">
              <div className="blog__items">
                <div className="blog__content">
                  <h3 className="blog__content--title h4">
                    <Link href="/cart">{item.title}</Link>
                  </h3>
                  <p className="blog__content--desc">{item.description}</p>
                 <Link href="#">
                 <div style={{ justifyContent: "space-between", width: "100%" }}>
                    <p style={{ marginRight: "30px" }} className={`blog__content--btn ${copiedIndex === index ? 'copied' : 'primary__btn'}`} onClick={() => handleCopyClick(index, item.coupon_code)}>
                      {item.coupon_code}
                    </p>
                    {/* <Link className="blog__content--btn primary__btn px-5 py-5" href="/cart">
                      Apply
                    </Link> */}
                  </div>
                 </Link>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
