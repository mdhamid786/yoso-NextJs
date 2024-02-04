"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getApiData, getTopSellingProducts } from "@/Helper/common";
import ProductItems from "./ProductItems";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SkeletonProduct from "./SkeletonProduct";

const TopSellingProduct = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const userData =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const userObject = JSON.parse(userData);
const userId = userObject?.id;
  // @Des top selling products api calling ...
  const TopsellingProducts = async () => {
    try {
      const data = await getApiData(
        `new-product?pincode=444601&type=top_selling&userId=${userId}`
      );
      setLoading(false);
      setProducts(data.result);
    } catch (error) {
      console.error("Error fetching top-selling products:", error);
    }
  };
  useEffect(() => {
    TopsellingProducts();
  }, []);

  return (
    <div>
      <section className="product__section section--padding pt-0">
        <div className="container-fluid">
          <div className="section__heading text-center mb-30">
            <h2 className="section__heading--maintitle">
              Top Selling Products
            </h2>
          </div>

          <div className="tab_content">
            <div id="product_grid" className="tab_pane active show">
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

export default TopSellingProduct;
