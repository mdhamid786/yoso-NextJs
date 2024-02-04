"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getApiData } from "@/Helper/common";
import ProductItems from "./ProductItems";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonProduct from "./SkeletonProduct";

const DealofWeek = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  //  Des deal of the week api calling ...
  const dealoftheWeek = async () => {
    const userData =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    const userObject = JSON.parse(userData);
    const userId = userObject?.id;
    try {
      const data = await getApiData(
        `new-product?pincode=444601&type=deals_oftheweek&userId=${userId}`
      );
      setProducts(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    dealoftheWeek();
  }, []);

  return (
    <div>
      <section className="product__section section--padding pt-0">
        <div className="container-fluid">
          <div className="section__heading text-center mb-30">
            <h2 className="section__heading--maintitle">Deal of the week</h2>
          </div>

          <div className="tab_content">
            <div id="chair" className="tab_pane active show">
              <div className="product__section--inner">
                <div className="row row-cols-xl-5 row-cols-lg-4 row-cols-md-3 row-cols-2 mb--n30">
                  {loading
                    ? Array.from({ length: 10 }).map((_, index) => (
                        <div key={index} className="col mb-30">
                          <SkeletonProduct />
                        </div>
                      ))
                    : products && products.length > 0
                    ? products.map((item, index) => (
                        <ProductItems key={index} item={item} />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DealofWeek;
