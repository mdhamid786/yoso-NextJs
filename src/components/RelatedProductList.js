"use client";
import Link from "next/link";
import React, { useState } from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from "react-redux";
import { addToCart } from "@/Redux/CartSlice";
import toast, { Toaster } from 'react-hot-toast';
import { CgSpinner } from "react-icons/cg";
import { addToWish } from "@/Redux/WishSlice";
import { addToCart1 } from "@/Redux/Reduxslice";
import { addToWish1 } from "@/Redux/ReduxWishSlice";

const RelatedProductList = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState([0]);
  const dispatch = useDispatch();
  const [showCartIcon, setShowCartIcon] = useState(true);
  const [showAnotherIcon, setShowAnotherIcon] = useState(false);

  // const logged = localStorage.getItem("token");
  const logged = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


  const send = (e) => {
    setLoading(true);
    setCount();
    dispatch(addToCart(e));
    toast.success("Item added In Your Cart", {
      position: "top-left",
    });
    setTimeout(() => {
      setLoading(false);
      setShowCartIcon(false);
      setShowAnotherIcon(true);
    }, 1000);
  };

  // add to wishlist
  const wishList = (e) => {
    dispatch(addToWish(e));
    toast.success("Item added In Wish List", {
      position: "top-left",
    });
  };

  const handleAddToCart11 = (product) => {
    dispatch(addToCart1(product));
  };

  const handlewish1 = (product) => {
    dispatch(addToWish1(product));
  };

  return (
    <div key={item.productid}>
      <div className="col mb-30">
        <div className="product__items">
          <div  className="product__items--thumbnail">
            <Link
              className="product__items--link"
              href={`/products/${item.slug}`}
            >
              <img
                id="productimg"
                className="product__items--img product__primary--img"
                src={item.first_image}
                alt="product-img"
               
              />
              <img
                id="productimg"
                className="product__items--img product__secondary--img"
                src={item.first_image}
                alt="product-img"
              
              />
            </Link>
          </div>
          <div className="product__items--content text-center">
            <h3 className="product__items--content__title h4">
              <Link href={`/products/${item.slug}`}>{item.name}</Link>
            </h3>
            <div className="product__items--price">
              <span className="current__price">₹{item.sale_price}</span>
              <span className="old__price">₹{item.sale_price}</span>
            </div>

           <div className="bottombtn" style={{ display: "flex" }}>
              {logged ? (
               
                <button
                id="btnproducts"
                className="product__items--action__cart--btn primary__btn"
              >
                {loading && (
                  <CgSpinner
                    style={{ marginLeft: '30px' }}
                    size={30}
                    className="mt-1 ml-5 items-center animate-spin justify-center text-center"
                  />
                )}
                {showCartIcon && <ShoppingCartIcon />}
                {showAnotherIcon && <AddIcon />}
                <span
                  onClick={() => send(item)}
                  className="add__to--cart__text ml-2"
                >
                  Add to cart
                </span>
              </button>
              ) : (
                <button
                  id="btnproducts"
                  style={{ marginLeft: "50px" }}
                  className="product__items--action__cart--btn primary__btn"
                >
                  {loading && (
                    <CgSpinner
                      style={{ marginLeft: "30px" }}
                      size={30}
                      className="mt-1 ml-5 items-center animate-spin justify-center text-center  "
                    />
                  )}
                  <ShoppingCartIcon />

                  <span
                    onClick={() => handleAddToCart11(item)}
                    className="add__to--cart__text ml-2"
                  >
                    {" "}
                    Add to cart
                  </span>
                </button>
              )}

              {logged ? (
                <button
                  onClick={() => wishList(item)}
                  style={{ marginLeft: "10px" }}
                  class="product__items--action__btn"
                >
                  <svg
                    style={{
                      paddingTop: "10px",
                      height: "40px",
                      paddingBottom: "10px",
                    }}
                    class="product__items--action__btn--svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.51"
                    height="15.443"
                    viewBox="0 0 24.526 21.82"
                  >
                    <path
                      d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                      transform="translate(0 0)"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span class="visually-hidden">Wishlist1</span>
                </button>
              ) : (
                <button
                  onClick={() => handlewish1(item)}
                  style={{ marginLeft: "10px" }}
                  class="product__items--action__btn"
                >
                  <svg
                    style={{
                      paddingTop: "10px",
                      height: "40px",
                      paddingBottom: "10px",
                    }}
                    class="product__items--action__btn--svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="17.51"
                    height="15.443"
                    viewBox="0 0 24.526 21.82"
                  >
                    <path
                      d="M12.263,21.82a1.438,1.438,0,0,1-.948-.356c-.991-.866-1.946-1.681-2.789-2.4l0,0a51.865,51.865,0,0,1-6.089-5.715A9.129,9.129,0,0,1,0,7.371,7.666,7.666,0,0,1,1.946,2.135,6.6,6.6,0,0,1,6.852,0a6.169,6.169,0,0,1,3.854,1.33,7.884,7.884,0,0,1,1.558,1.627A7.885,7.885,0,0,1,13.821,1.33,6.169,6.169,0,0,1,17.675,0,6.6,6.6,0,0,1,22.58,2.135a7.665,7.665,0,0,1,1.945,5.235,9.128,9.128,0,0,1-2.432,5.975,51.86,51.86,0,0,1-6.089,5.715c-.844.719-1.8,1.535-2.794,2.4a1.439,1.439,0,0,1-.948.356ZM6.852,1.437A5.174,5.174,0,0,0,3,3.109,6.236,6.236,0,0,0,1.437,7.371a7.681,7.681,0,0,0,2.1,5.059,51.039,51.039,0,0,0,5.915,5.539l0,0c.846.721,1.8,1.538,2.8,2.411,1-.874,1.965-1.693,2.812-2.415a51.052,51.052,0,0,0,5.914-5.538,7.682,7.682,0,0,0,2.1-5.059,6.236,6.236,0,0,0-1.565-4.262,5.174,5.174,0,0,0-3.85-1.672A4.765,4.765,0,0,0,14.7,2.467a6.971,6.971,0,0,0-1.658,1.918.907.907,0,0,1-1.558,0A6.965,6.965,0,0,0,9.826,2.467a4.765,4.765,0,0,0-2.975-1.03Zm0,0"
                      transform="translate(0 0)"
                      fill="currentColor"
                    ></path>
                  </svg>
                  <span class="visually-hidden">Wishlist</span>
                </button>
              )}
            </div>

            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RelatedProductList;