"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getApiData, getProducts } from "@/Helper/common";
import ProductItem from "./ProductItems";
import Skeleton from "react-loading-skeleton";
import SkeletonProduct from "./SkeletonProduct";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userObject = JSON.parse(userData);
  const userId = userObject?.id;
  // Des getAllProduct api calling
  const LatestProducts = async () => {
    try {
      //  const userToken =
      //   typeof window !== "undefined" ? localStorage.getItem("token") : null;
      // const userData =
      //   typeof window !== "undefined" ? localStorage.getItem("user") : null;
      // const userObject = JSON.parse(userData);
      // const userId = userObject?.id;
      // let apiUrl = "new-product?pincode=444601";
      // if (userToken) {
      //   apiUrl += `&userId=${userId}`;
      // }
      const data = await getApiData(`new-product?pincode=444601&userId=${userId}`);
      if (data.error == false) {
        setProducts(data.result);
        setLoading(false);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    LatestProducts();
  }, []);

  return (
    <>
      <section className="product__section section--padding pt-0">
        <div className="container-fluid">
          <div className="section__heading text-center mb-30">
            <h2 className="section__heading--maintitle">Deals of the day</h2>
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
                        <ProductItem key={index} item={item} />
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
