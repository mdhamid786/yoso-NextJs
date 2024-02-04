"use client";
import BreadcrumbWish from "@/components/BreadcrumbWish";
import { getApiData, getWithToken } from "@/Helper/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeToWish } from "@/Redux/WishSlice";
import {
  addToCart,
} from "@/Redux/CartSlice";
import {
  removeFromWish1,
} from "@/Redux/ReduxWishSlice";

const Page = () => {
  const [wishProducts, setWishProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  const dispatch = useDispatch();

  //@des  getwishlist product from api
  const WishListProducts = async () => {
    try {
      const data = await getWithToken("wishlist-product-list");
      if (data.error == false) {
        setWishProducts(data.result);
        setLoading(false);
      } else {
        setWishProducts([]);
      }
    } catch (error) {
      console.error("Error fetching Wish Products:", error);
      setLoading(false);
    }
  };

   //@des add to cart and remove from wishlist  product from api
  const addTocart = (e) => {
    dispatch(addToCart(e));
    setTimeout(() => {
      dispatch(removeToWish(e));
      WishListProducts();
    }, 100);
    WishListProducts()
  };


  const handleRemoveFromWish1 = (e) => {
    dispatch(removeFromWish1(e));
  };


  const handleDecrement = (e) => {
    dispatch(removeToWish(e));
    setTimeout(() => {
      dispatch(removeFromWish1(e));
      WishListProducts();
    }, 1000);
  };

  useEffect(() => {
    WishListProducts();
  }, []);

  return (
    <>
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
        <BreadcrumbWish />
        {/* End breadcrumb section */}
        {/* cart section start */}
        <section className="cart__section section--padding">
          <div className="container">
            <div className="cart__section--inner">
              <form action="#">
                <h2 className="cart__title mb-40">Wishlist</h2>
                <div className="cart__table">
                  {token ? (
                    <table className="cart__table--inner">
                      <thead className="cart__table--header">
                        <tr className="cart__table--header__items">
                          <th className="cart__table--header__list">Product</th>
                          <th className="cart__table--header__list">Price</th>
                          <th className="cart__table--header__list text-center">
                            STOCK STATUS
                          </th>
                          <th className="cart__table--header__list text-right">
                            ADD TO CART
                          </th>
                        </tr>
                      </thead>
                      {/* wish list */}
                      <tbody className="cart__table--body">
                        {wishProducts && wishProducts.length > 0 ? (
                          wishProducts.map((item, index) => (
                            <tr
                              key={index}
                              className="cart__table--body__items"
                            >
                              <td className="cart__table--body__list">
                                <div className="cart__product d-flex align-items-center">
                                  <button
                                   
                                    onClick={() => {
                                      handleDecrement(item);
                                      handleRemoveFromWish1(item.variant_productid);
                                    }}   
                                    className="cart__remove--btn"
                                    type="button"
                                  >
                                    <svg
                                      style={{
                                        paddingLeft: "10px",
                                        height: "20px",
                                        width: "22px",
                                      }}
                                      fill="currentColor"
                                      xmlns="http://www.w3.org/2000/svg"
                                      viewBox="0 0 24 24"
                                      width="16px"
                                      height="16px"
                                    >
                                      <path d="M 4.7070312 3.2929688 L 3.2929688 4.7070312 L 10.585938 12 L 3.2929688 19.292969 L 4.7070312 20.707031 L 12 13.414062 L 19.292969 20.707031 L 20.707031 19.292969 L 13.414062 12 L 20.707031 4.7070312 L 19.292969 3.2929688 L 12 10.585938 L 4.7070312 3.2929688 z" />
                                    </svg>
                                  </button>
                                  <div className="cart__thumbnail">
                                    <Link href="product-details">
                                      <img
                                        className="border-radius-5"
                                        src={item.first_image}
                                        alt="cart-product"
                                      />
                                    </Link>
                                  </div>
                                  <div className="cart__content">
                                    <h4 className="cart__content--title">
                                      <Link href="product-details">
                                        {item.name}
                                      </Link>
                                    </h4>
                                    <span className="cart__content--variant">
                                    Product Unit: {item.products_unit}
                                    </span>
                                    <span className="cart__content--variant">
                                    Category: {item.category}
                                    </span>
                                  </div>
                                </div>
                              </td>
                              <td className="cart__table--body__list">
                              <span className="old__price">
                                        {" "}
                                        {item.discount_amount > 0
                                          ? `₹${item.sale_price}`
                                          : null}
                                      </span>
                                      <br />
                                <span className="cart__price">
                                  ₹{item.offer_price}
                                </span>
                              </td>
                              <td className="cart__table--body__list text-center">
                                <span className="in__stock ">
                                 {item.stock ? item.stock:1}
                                </span>
                              </td>
                              <td className="cart__table--body__list text-right">
                                <button
                                  type="button"
                                  // onClick={() => addTocart(item)}
                                  onClick={() => {
                                    addTocart(item);
                                    handleRemoveFromWish1(item.variant_productid);
                                  }} 

                                  className="primary__btn"
                                  disabled={loading}
                                >
                                  Add To Cart
                                </button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr className="cart__table--body__items text-center">
                              <td
                                className="cart__table--body__list"
                                colSpan="4"
                              >
                                <div
                                  style={{
                                    textAlign: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    className="empty-cart1"
                                    style={{ height: "500px", width: "auto" }}
                                    src="https://res.cloudinary.com/dfpanyr0i/image/upload/v1702374505/undraw_Empty_re_opql_dogjq8.png"
                                    alt="Empty Cart Image"
                                  />
                                </div>
                              </td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="cart__table--inner">
                      <thead className="cart__table--header">
                        <tr className="cart__table--header__items">
                          <th className="cart__table--header__list">Product</th>
                          <th className="cart__table--header__list">Price</th>
                          <th className="cart__table--header__list text-center">
                            STOCK STATUS
                          </th>
                          <th className="cart__table--header__list text-right">
                            ADD TO CART
                          </th>
                        </tr>
                      </thead>
                      {/* wish list */}
                     
                    </table>
                  )}

                  <div className="continue__shopping d-flex justify-content-between">
                    <Link className="continue__shopping--link" href="/">
                      Continue shopping
                    </Link>
                    <Link className="continue__shopping--clear" href="/">
                      View All Products
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Start brand logo section */}
        <div className="brand__logo--section bg__secondary section--padding">
          <div className="container-fluid">
            <div className="row row-cols-1">
              <div className="col">
                <div className="brand__logo--section__inner d-flex justify-content-center align-items-center">
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img"
                      src="/img/logo/brand-logo1.webp"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img"
                      src="/img/logo/brand-logo2.webp"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img"
                      src="/img/logo/brand-logo3.webp"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img"
                      src="/img/logo/brand-logo4.webp"
                      alt="brand logo"
                    />
                  </div>
                  <div className="brand__logo--items">
                    <img
                      className="brand__logo--items__thumbnail--img"
                      src="/img/logo/brand-logo5.webp"
                      alt="brand logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* End brand logo section */}
      </main>
    </>
  );
};

export default Page;
