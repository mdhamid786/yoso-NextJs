"use client";
import {
  addToCart,
  removeSingleItems,
  removeToCart,
  emptyCartItem,
  cartIncrement,
} from "@/Redux/CartSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { getWithToken, postWithToken } from "@/Helper/common";
import BreadcrumbCart from "@/components/BreadcrumbCart";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import { addToCart1, decreaseCart1, removeFromCart1 } from "@/Redux/Reduxslice";
import { useParams, useRouter } from "next/navigation";

const Page = () => {
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const { carts } = useSelector((state) => state.allCart); // redux
  const [loginCarts, setLoginCarts] = useState([]);
  const [totalaCal, setTotalCal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkCoupen, setCheckCoupen] = useState("");
  const [coupon_code, setCouponCode] = useState("");
  const [order_amount, setOrderAmount] = useState("");
  const [coupenResponseData, setCoupenResponseData] = useState([]);
  const [coupenAppliedAmount, setCoupenAppliedAmount] = useState(0);

  // localstorage
  const cart1 = useSelector((state) => state.allCart1.cartItems);
  const handleDecreaseCart1 = (product) => {
    dispatch(decreaseCart1(product));
  };
  const handleRemoveFromCart1 = (product) => {
    dispatch(removeFromCart1(product));
  };
  const handleAddToCart1 = (product) => {
    dispatch(addToCart1(product));
  };
  // @ get All List Cart
  const loginCart = async () => {
    try {
      if (token) {
        const data = await getWithToken("cart-list");

        if (data.error == false) {
          setLoginCarts(data.result);
          setLoading(false);
        } else {
          setLoginCarts([]);
          setLoading(false);
        }
        // @ total calculation api
        const totalcalculation = await getWithToken("cartAmountCalculation");
        if (totalcalculation.error == false) {
          setTotalCal(totalcalculation);
          setLoading(false);
        } else {
          setLoginCarts([]);
          setTotalCal(totalcalculation);
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching carts products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    loginCart();
  }, []);

  // add to cart ->increment
  const send = (e) => {
    setLoading(true);
    dispatch(cartIncrement(e));
    loginCart();
  };

  // @ Increment cart items
  const afterLoginInc = async (product_id, qty) => {
    if (token) {
      qty = qty + 1;
      const apiData = JSON.stringify({
        product_id: product_id,
        qty: qty,
      });
      const data = await postWithToken("add-cart", apiData);

      if (data.error == false) {
        loginCart();
      } else {
        toast.error(data.message, {
          position: "top-left",
        });
      }
    } else {
      toast.error("something went wrong!");
    }
  };

  // @ decrement cart items
  const afterLoginDec = async (product_id, qty) => {
    if (token) {
      qty = qty - 1;
      const apiData = JSON.stringify({
        product_id: product_id,
        qty: qty,
      });
      const data = await postWithToken("add-cart", apiData);
      loginCart();
    }
  };
  // remove to cart -> decrement

  const handleDecrement = (e) => {
    dispatch(removeToCart(e));
    loginCart();
    setTimeout(() => {
      dispatch(removeFromCart1(e));
      dispatch(removeFromCart1(e));
    }, 1000);
  };

  const handleDecrement1 = (e) => {
    dispatch(removeToCart(e));
    loginCart();
  };

  const handleRemoveLogin = (e) => {
    dispatch(removeFromCart1(e));
  };

  const handleRemoveLogin2 = (e) => {
    dispatch(removeFromCart1(e));
  };

  // decrement single items

  const handleSingleDecrement = (e) => {
    dispatch(removeSingleItems(e));
  };

  const emptyCart = (event) => {
    event.preventDefault();
    dispatch(emptyCartItem());
    toast.success("Your Cart is Empty", {
      position: "top-left",
    });
  };

  // function for total price ....
  const total = () => {
    let totalPrice = 0;
    carts.map((item, index) => {
      totalPrice = item.offer_price * item.qty + totalPrice;
    });
    setTotalPrice(totalPrice);
  };

  // get total coupencode api
  const removeCoupen = (event) => {
    event.preventDefault();
    setCheckCoupen("");
    setCoupenResponseData([]);
    setCoupenAppliedAmount(0);
    setApply(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("couponData");
    }
    toast("Remove Coupen code successfully!", {
      position: "top-left",
    });
  };
  const router = useRouter();
  const [apply, setApply] = useState(false);
  // @  check coupen API call

  const checkCoupenCode = async (event) => {
    const order_amount = totalaCal.netamount;
    event.preventDefault();
    const apiData = JSON.stringify({ coupon_code: checkCoupen, order_amount });
    if (token) {
      try {
        const data = await postWithToken("check-coupon-code", apiData);
        if (data.error == false) {
          toast.success(data.message, {
            position: "top-left",
          });
          setApply(true);
          setCoupenResponseData(data);
          setCoupenAppliedAmount(data.discount_amount);
          if (typeof window !== "undefined") {
            localStorage.setItem("couponData", JSON.stringify(data));
          }
        } else {
          toast.error(data.message, {
            position: "top-left",
          });
        }
      } catch (errorData) {
        toast.error(errorData.message, {
          position: "top-left",
        });
      }
    } else {
      toast.error("Please login first! ", {
        position: "top-left",
      });
      router.push("/login");
    }
  };

  useEffect(() => {
    total();
  }, []);

  return (
    <>
      <main className="main__content_wrapper">
        <BreadcrumbCart />
        <section className="cart__section section--padding">
          <div className="container-fluid">
            <div className="cart__section--inner">
              <form action="#">
                <h2 className="cart__title mb-40">Shopping Cart</h2>
                <div className="row">
                  <div className="col-lg-8">
                    <div className="cart__table">
                      <table className="cart__table--inner">
                        <thead className="cart__table--header">
                          <tr className="cart__table--header__items">
                            <th className="cart__table--header__list">
                              Product
                            </th>
                            <th className="cart__table--header__list">Price</th>
                            <th className="cart__table--header__list">
                              Quantity
                            </th>
                            <th className="cart__table--header__list">Total</th>
                          </tr>
                        </thead>
                        <tbody className="cart__table--body">
                          {token
                            ? loginCarts && loginCarts.length > 0
                              ? loginCarts.map((item, index) => (
                                  <tr
                                    key={index}
                                    className="cart__table--body__items"
                                  >
                                    <td className="cart__table--body__list">
                                      <div className="cart__product d-flex align-items-center">
                                        <button
                                          onClick={() => {
                                            handleDecrement(item);
                                            handleRemoveLogin(item);
                                            handleRemoveFromCart1(
                                              item.product_id
                                            );
                                          }}
                                          className="cart__remove--btn"
                                          aria-label="search button"
                                          type="button"
                                        >
                                          <svg
                                            style={{
                                              paddingLeft: "10px",
                                              height: "29px",
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
                                          <img
                                            className="border-radius-5"
                                            src={item.image}
                                            alt="cart-product"
                                          />
                                        </div>
                                        <div className="cart__content">
                                          <h4 className="cart__content--title">
                                            {item.name}
                                          </h4>
                                          <span className="cart__content--variant">
                                            {item.product_name}
                                          </span>
                                          <span className="cart__content--variant">
                                            Product Unit: {item.products_unit}
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
                                        ₹{item.offer_price.toFixed(2)}
                                      </span>
                                      {item.discount_type === "2" ? (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  {item.discount_amount} Flat
                </span>
              ) : (
                <span
                  style={{
                    color: "green",
                    fontWeight: "bold",
                    paddingLeft: "10px",
                  }}
                >
                  {item.discount_amount > 0
                    ? `${item.discount_amount} % off`
                    : null}
                </span>
              )}
                                    </td>
                                    <td className="cart__table--body__list">
                                      <div className="quantity__box">
                                        <button
                                          onClick={() =>
                                            item.qty <= 1
                                              ? handleDecrement1(item)
                                              : afterLoginDec(
                                                  item.product_id,
                                                  item.qty
                                                )
                                          }
                                          type="button"
                                          className="quantity__value quickview__value--quantity decrease"
                                          aria-label="quantity value"
                                          value="Decrease Value"
                                        >
                                          -
                                        </button>
                                        <label>
                                          <input
                                            type="number"
                                            value={item.qty}
                                            className="quantity__number quickview__value--number"
                                            // defaultValue={item.qty}
                                          />
                                        </label>
                                        <button
                                          onClick={() =>
                                            afterLoginInc(
                                              item.product_id,
                                              item.qty
                                            )
                                          }
                                          type="button"
                                          className="quantity__value quickview__value--quantity increase"
                                          aria-label="quantity value"
                                          value="Increase Value"
                                        >
                                          +
                                        </button>
                                      </div>
                                    </td>
                                    <td className="cart__table--body__list">
                                      <span className="cart__price end">
                                        ₹
                                        {(item.qty * item.offer_price).toFixed(
                                          2
                                        )}
                                      </span>
                                    </td>
                                  </tr>
                                ))
                              : loginCarts.length === 0 && (
                                  <tr>
                                    <td colSpan="4">
                                      <div
                                        style={{
                                          textAlign: "center",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        <img
                                          className="empty-cart"
                                          style={{
                                            height: "500px",
                                            width: "auto",
                                          }}
                                          src="https://res.cloudinary.com/dfpanyr0i/image/upload/v1702372748/newone_c8xost.png"
                                          alt="Empty Cart Image"
                                        />
                                      </div>
                                      <h4
                                        style={{
                                          textAlign: "center",
                                          color: "grey",
                                          display: "flex",
                                          alignItems: "center",
                                          justifyContent: "center",
                                        }}
                                      >
                                        Your cart is empty!
                                      </h4>
                                    </td>
                                  </tr>
                                )
                            : // @ when use not login call Redux carts
                            cart1 && cart1.length > 0
                            ? cart1.map((item, index) => (
                                <tr
                                  key={index}
                                  className="cart__table--body__items"
                                >
                                  <td className="cart__table--body__list">
                                    <div className="cart__product d-flex align-items-center">
                                      <button
                                        onClick={() =>
                                          handleRemoveFromCart1(
                                            item.variant_productid
                                          )
                                        }
                                        className="cart__remove--btn"
                                        aria-label="search button"
                                        type="button"
                                      >
                                        <svg
                                          style={{
                                            paddingLeft: "4px",
                                            height: "29px",
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
                                        <img
                                          className="border-radius-5"
                                          // src={item.first_image?:item.image[0].img}
                                          src={
                                            item.first_image
                                              ? item.first_image
                                              : item.image?.length > 0
                                              ? item.image[0].img
                                              : ""
                                          }
                                          alt="cart-product"
                                        />
                                      </div>
                                      <div className="cart__content">
                                        <h4 className="cart__content--title">
                                          {item.name}
                                        </h4>
                                        <span className="cart__content--variant">
                                          {item.name}
                                        </span>
                                        <span className="cart__content--variant">
                                          Products unit: {item.products_unit}
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
                                  <td className="cart__table--body__list">
                                    <div className="quantity__box">
                                      <button
                                        //  onClick={() => handleDecreaseCart1(item)}
                                        onClick={() =>
                                          item.qty <= 1
                                            ? handleRemoveFromCart1(
                                                item.variant_productid
                                              )
                                            : handleDecreaseCart1(item)
                                        }
                                        type="button"
                                        className="quantity__value quickview__value--quantity decrease"
                                        aria-label="quantity value"
                                        value="Decrease Value"
                                      >
                                        -
                                      </button>

                                      <label>
                                        <input
                                          type="number"
                                          readOnly
                                          value={item.qty}
                                          className="quantity__number quickview__value--number"
                                          // defaultValue={item.qty}
                                        />
                                      </label>
                                      <button
                                        onClick={() => handleAddToCart1(item)}
                                        type="button"
                                        className="quantity__value quickview__value--quantity increase"
                                        aria-label="quantity value"
                                        value="Increase Value"
                                      >
                                        +
                                      </button>
                                    </div>
                                  </td>
                                  <td className="cart__table--body__list">
                                    <span className="cart__price end">
                                      ₹{item.qty * item.offer_price}
                                    </span>
                                  </td>
                                </tr>
                              ))
                            : cart1.length === 0 && (
                                <tr>
                                  <td colSpan="4">
                                    <div
                                      style={{
                                        textAlign: "center",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      <img
                                        className="empty-cart"
                                        style={{
                                          height: "500px",
                                          width: "auto",
                                        }}
                                        src="https://res.cloudinary.com/dfpanyr0i/image/upload/v1702372748/newone_c8xost.png"
                                        alt="Empty Cart Image"
                                      />
                                    </div>
                                    <h4
                                      style={{
                                        textAlign: "center",
                                        color: "grey",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                      }}
                                    >
                                      Your cart is empty!
                                    </h4>
                                  </td>
                                </tr>
                              )}
                        </tbody>
                      </table>
                      <div className="continue__shopping d-flex justify-content-between">
                        <Link className="continue__shopping--link" href="/">
                          Continue shopping
                        </Link>
                      </div>
                    </div>
                  </div>
                  {/* total calculation data */}
                  <div className="col-lg-4">
                    <div className="cart__summary border-radius-10">
                      <div className="coupon__code mb-30">
                        <div className="d-flex justify-content-between align-items-center mb-5">
                          <h3 className="coupon__code--title">Coupon</h3>
                          <Link href="/offers">
                            <span
                              style={{ borderBottom: "2px dotted #ddd" }}
                              className="coupon__code--field__btn pb-5"
                              type="submit"
                            >
                              View All
                              <br />
                            </span>
                          </Link>
                        </div>

                        <div className="coupon__code--field d-flex">
                          <p className="coupon__code--desc mb-5">
                            Enter your coupon code if you have one.
                          </p>
                        </div>

                        <div className="coupon__code--field d-flex mt-2 mx-5">
                          <label>
                            <input
                              className="coupon__code--field__input border-radius-5"
                              placeholder="Coupon code"
                              type="text"
                              value={checkCoupen}
                              onChange={(e) => setCheckCoupen(e.target.value)}
                            />
                          </label>

                          {apply == !true ? (
                            <button
                              style={{ marginLeft: "30px" }}
                              onClick={checkCoupenCode}
                              className=" primary__btn"
                              type="submit"
                            >
                              Apply Coupon
                            </button>
                          ) : (
                            <button
                              style={{ marginLeft: "30px" }}
                              onClick={removeCoupen}
                              className=" primary__btn"
                              type="submit"
                            >
                              Remove
                            </button>
                          )}
                        </div>
                      </div>
                      {token ? (
                        <>
                          <div className="cart__note mb-20">
                            <h3 className="cart__note--title">
                              Total Item {loginCarts.length}
                            </h3>
                          </div>

                          <div className="cart__summary--total mb-20">
                            <table className="cart__summary--total__table">
                              <tbody>
                                <tr className="cart__summary--total__list"></tr>
                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    Sub Total
                                  </td>
                                  <td className="cart__summary--amount text-right">
                                    ₹
                                    {totalaCal.subTotal
                                      ? totalaCal.subTotal.toFixed(2)
                                      : 0}
                                  </td>
                                </tr>
                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    Discount
                                  </td>
                                  <td
                                    style={{ color: "green" }}
                                    className="cart__summary--amount text-right"
                                  >
                                    - ₹
                                    {totalaCal.discount
                                      ? totalaCal.discount.toFixed(2)
                                      : (0).toFixed(2)}
                                  </td>
                                </tr>
                                {coupenAppliedAmount > 0 ? (
                                  <tr className="cart__summary--total__list">
                                    <td className="cart__summary--total__title text-left">
                                      Coupon Amount
                                    </td>
                                    <td className="cart__summary--amount text-right">
                                      - ₹{coupenAppliedAmount.toFixed(2)}
                                    </td>
                                  </tr>
                                ) : null}

                                {totalaCal.shipping > 0 ? (
                                  <tr className="cart__summary--total__list">
                                    <td className="cart__summary--total__title text-left">
                                      Shipping
                                    </td>
                                    <td className="cart__summary--amount text-right">
                                      + ₹{totalaCal.shipping.toFixed(2)}
                                    </td>
                                  </tr>
                                ) : null}

                                <tr className="cart__summary--total__list">
                                  <td className="cart__summary--total__title text-left">
                                    Total
                                  </td>
                                 
                                  <td className="cart__summary--amount text-right">
                                    ₹
                                    {totalaCal.netamount
                                      ? (
                                          totalaCal.netamount -
                                          parseFloat(coupenAppliedAmount)
                                        ).toFixed(2)
                                      : 0}
                                  </td>
                                </tr>

                                <tr className="cart__summary--total__list">
                                  {coupenAppliedAmount > 0 ? (
                                    <td
                                      style={{ color: "green" }}
                                      className="cart__summary--total__title text-left"
                                    >
                                      You will save ₹{coupenAppliedAmount.toFixed(2)} on
                                      this order
                                    </td>
                                  ) : null}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          <div className="cart__summary--footer">
                            <ul className="d-flex justify-content-between">
                              <li></li>
                              <li>
                                <Link
                                  className="cart__summary--footer__btn primary__btn checkout"
                                  href="/checkout"
                                >
                                  Check Out
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="cart__summary--footer">
                            <ul className="d-flex">
                              <li>
                                <Link
                                  className="cart__summary--footer__btn primary__btn "
                                  href="/login"
                                >
                                  Login
                                </Link>
                              </li>
                            </ul>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
        {/* cart section end */}
        {/* Start product section */}

        {/* End product section */}
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
