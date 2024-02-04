"use client";
import { getWithToken, postWithToken } from "@/Helper/common";
import BreadcrumbCheckout from "@/components/BreadcrumbCheckout";
import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import "./button.css";
import { useRouter } from "next/navigation";
import { CgSpinner } from "react-icons/cg";
import { useCallback } from "react";
import useRazorpay from "react-razorpay";

const Page = () => {
  const REACT_APP_API_KEY = "rzp_test_TTdx3H2pM2ihRM";
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [getAddress, setGetAddress] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [totalaCal, setTotalCal] = useState([]);
  const [CheckOutimg, setCheckoutImg] = useState([]);
  const router = useRouter();
  const [Razorpay, isLoaded] = useRazorpay();
  const [address_id, setaddress_id] = useState("");
  const [deliveryOption, setdeliveryOption] = useState("");
  const [payment_type, setPaymentType] = useState("");
  const [coupenResponseData, setCoupenResponseData] = useState([]);
  const [coupenId, setCoupenId] = useState(0);
  const [coupenAppliedAmount, setCoupenAppliedAmount] = useState(0);
  // Form Validation
  const [errors, setErrors] = useState({
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!address.trim()) {
      newErrors.address = "Address is required *";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(address)) {
      newErrors.address = "Address should contain letters";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (!city.trim()) {
      newErrors.city = "city is required *";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(city)) {
      newErrors.city = "city should contain letters";
      isValid = false;
    } else {
      newErrors.city = "";
    }

    if (!state.trim()) {
      newErrors.state = "state is required *";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(city)) {
      newErrors.city = "state should contain letters";
      isValid = false;
    } else {
      newErrors.state = "";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "pincode is required *";
      isValid = false;
    } else if (!/^\d+$/.test(pincode.trim())) {
      newErrors.pincode = "Pincode should contain only numbers";
      isValid = false;
    } else {
      newErrors.pincode = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  useEffect(() => {
    const couponData =
      typeof window !== "undefined" ? localStorage.getItem("couponData") : null;
    const couponValue = JSON.parse(couponData);
    if (couponValue) {
      setCoupenAppliedAmount(couponValue.discount_amount);
      setCoupenResponseData(couponValue);
      setCoupenId(couponValue.coupon_id);
    }
  }, []);

  const userData =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userObject = JSON.parse(userData);
  const FName = userObject?.name;
  const phone = userObject?.mobile;
  var id = 0;

  // @Des Billing address API
  const BillingAddress = async (event) => {
    event.preventDefault();
    const apiData = JSON.stringify({
      FName,
      phone,
      state,
      city,
      address,
      pincode,
      id,
    });

    if (validateForm()) {
      try {
        const data = await postWithToken("add-address", apiData);
        if (data.error == false) {
          setLoading(true);
          setState("");
          setCity("");
          setPincode("");
          setAddress("");
          toast.success(data.message, {
            position: "top-left",
          });
          GetAllAddress();
        } else {
          toast.error(data.message, {
            position: "top-left",
          });
          setLoading(false);
        }
      } catch (errorData) {
        toast.error(errorData.message, {
          position: "top-left",
        });
        setLoading(false);
      }
    }
  };

  //@Des payment gateway integration
  const handlePayment = useCallback(
    async (data) => {
      try {
        const options = {
          key: REACT_APP_API_KEY,
          amount: data.order_amount,
          currency: "INR",
          name: "YOSO",
          description: "Test Transaction",
          image: "https://yoso.co.in/images/yoso/logo.png",
          order_id: data.razorpay_orderid,
          handler: (res) => {
            console.log(res);
            if (typeof window !== "undefined") {
              localStorage.setItem("paymentId", res.razorpay_payment_id);
            }
            if (res.status_code == 200) {
              if (typeof window !== "undefined") {
                localStorage.removeItem("couponData");
                localStorage.removeItem("carts");
                localStorage.removeItem("cartItems");
              }

              location.href = "/success";
            } else if (res.razorpay_order_id) {
              if (typeof window !== "undefined") {
                localStorage.removeItem("couponData");
                localStorage.removeItem("carts");
                localStorage.removeItem("cartItems");
              }
              location.href = "/success";
            }
          },
          prefill: {
            name: data.userdata.name,
            email: data.userdata.email,
            contact: data.userdata.contact,
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
          modal: {
            ondismiss: function() {
              toast.error('Payment cancelled');
              setTimeout(() => {
                location.href = "/checkout";
              }, 100);
            },
          },
    
        };
        const rzpay = new Razorpay(options);
        rzpay.on("payment.failed", function (response) {
          toast.error(response.error.description);
          setTimeout(() => {
            location.href = "/checkout";
          }, 2000);
        });
        rzpay.open();
      } catch (error) {
        console.log("Error handling payment:", error);
      }
    },
    [Razorpay]
  );

  // @Des checkout API call...

  const checkOut = async (event) => {
    event.preventDefault();
    const apiData = JSON.stringify({
      coupon_id: coupenId,
      address_id,
      deliveryOption,
      payment_type,
    });

    try {
      setLoading1(true);
      const data = await postWithToken("checkout", apiData);
      if (data.error == false) {
        if (typeof window !== "undefined") {
          localStorage.removeItem("couponData");
          localStorage.removeItem("carts");
          localStorage.removeItem("cartItems");
        }
        toast.success(data.message, {
          position: "top-left",
        });
        setLoading1(true);
        // @Des payment gateway condtion check
        if (payment_type == 1) {
          handlePayment(data.intent);
          if (typeof window !== "undefined") {
            localStorage.removeItem("couponData");
            localStorage.removeItem("carts");
            localStorage.removeItem("cartItems");
          }
        }
        if (payment_type == 2) {
          if (typeof window !== "undefined") {
            localStorage.removeItem("couponData");
            localStorage.removeItem("carts");
            localStorage.removeItem("cartItems");
          }
          location.href = "/success";
        }
      } else {
        toast.error(data.message, {
          position: "top-left",
        });
        setLoading1(false);
      }
    } catch (errorData) {
      toast.error(errorData.message, {
        position: "top-left",
      });
      setLoading1(false);
    }
  };

  // @  gellAll Address API call
  const GetAllAddress = async () => {
    try {
      const data = await getWithToken("address-list");
      if (data.error == false) {
        setGetAddress(data.result);
        setLoading(false);
      } else {
        setGetAddress([]);
      }
      const totalcalculation = await getWithToken("cartAmountCalculation");
      if (totalcalculation.error == false) {
        setTotalCal(totalcalculation);
        setCheckoutImg(totalcalculation.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    GetAllAddress();
  }, []);

  return (
    <>
      <main className="main__content_wrapper">
        <BreadcrumbCheckout />
        <div className="checkout__page--area section--padding">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-6">
                <div className="main checkout__mian">
                  <form onSubmit={BillingAddress}>
                    <div className="checkout__content--step section__shipping--address">
                      <div className="section__header checkout__section--header d-flex align-items-center justify-content-between mb-25">
                        <h2 className="section__header--title h3">
                          Contact information
                        </h2>
                      </div>

                      <div className="section__shipping--address__content">
                        <div className="row">
                          <div className="col-lg-12 col-md-6 mb-20">
                            <div className="checkout__input--list ">
                              <label
                                className="checkout__input--label mb-5"
                                htmlFor="input1"
                              >
                                Name{" "}
                              </label>
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="First name"
                                id="input1"
                                value={FName}
                                onChange={(e) => setFname(e.target.value)}
                                type="text"
                              />
                            </div>
                          </div>

                          <div className="col-12 mb-20">
                            <div className="checkout__input--list">
                              <label
                                className="checkout__input--label mb-5"
                                htmlFor="input3"
                              >
                                Phone Number{" "}
                              </label>
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="phone Number"
                                id="input3"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="section__header mb-25">
                              <h2 className="section__header--title h3">
                                Billing Details
                              </h2>
                            </div>
                            <div className="checkout__input--list">
                              <label
                                className="checkout__input--label mb-5"
                                htmlFor="input4"
                              >
                                Address
                                {/* <span className="checkout__input--label__star">
                                  *
                                </span> */}
                              </label>
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="Apartment, Floor, House No etc."
                                id="input4"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                              />
                              {errors.address && (
                                <span
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                  }}
                                  className="error-message"
                                >
                                  {errors.address}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-12 mb-20">
                            <div className="checkout__input--list">
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="City"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              />
                              {errors.city && (
                                <span
                                  style={{
                                    color: "tomato",
                                    marginBottom: "10px",
                                    fontWeight: "bolder",
                                  }}
                                  className="error-message"
                                >
                                  {errors.city}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="col-12 mb-20">
                            <div className="checkout__input--list">
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="State"
                                id="input5"
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                              />
                              {errors.state && (
                                <span
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                  }}
                                  className="error-message"
                                >
                                  {errors.state}
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-lg-12 mb-20">
                            <div className="checkout__input--list">
                              <label
                                className="checkout__input--label mb-5"
                                htmlFor="input6"
                              >
                                Postal Code{" "}
                              </label>
                              <input
                                className="checkout__input--field border-radius-5"
                                placeholder="Pin code"
                                id="input6"
                                type="phone"
                                maxLength={6}
                                minLength={6}
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                              />
                              {errors.pincode && (
                                <span
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                  }}
                                  className="error-message"
                                >
                                  {errors.pincode}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="checkout__content--step__footer d-flex align-items-center">
                      <button
                        className="account__login--btn primary__btn"
                        type="submit"
                      >
                        {loading && (
                          <CgSpinner
                            style={{ marginLeft: "240px" }}
                            size={50}
                            className="mt-1 ml-5 items-center animate-spin justify-center text-center  "
                          />
                        )}
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              {/* order summary */}
              <div className="col-lg-5 col-md-6">
                <aside className="checkout__sidebar sidebar border-radius-10">
                  <h2 className="checkout__order--summary__title text-center mb-15">
                    Your Order Summary
                  </h2>
                  <div className="cart__table checkout__product--table">
                    <table className="cart__table--inner">
                      <tbody className="cart__table--body">
                        {CheckOutimg && CheckOutimg.length > 0
                          ? CheckOutimg.map((item, index) => (
                              <tr
                                key={index}
                                className="cart__table--body__items"
                              >
                                <td className="cart__table--body__list">
                                  <div className="product__image two  d-flex align-items-center">
                                    <div className="product__thumbnail border-radius-5">
                                      <Link className="display-block" href="/">
                                        <img
                                          className="display-block border-radius-5"
                                          src={item.image}
                                          alt="cart-product"
                                        />
                                      </Link>
                                      <span className="product__thumbnail--quantity">
                                        {item.qty}
                                      </span>
                                    </div>

                                    <div className="product__description">
                                      <h4 className="product__description--name">
                                        {item.product_name}
                                      </h4>
                                      <span className="product__description--variant">
                                        {item.products_unit}
                                      </span>
                                    </div>
                                  </div>
                                </td>
                                <td className="cart__table--body__list">
                                  <span className="cart__price">
                                    {" "}
                                    ₹{(item.sale_price * item.qty).toFixed(2)}
                                  </span>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                      {/* addresss */}
                      <div
                        style={{ marginBottom: "20px" }}
                        className="mt-5 mb-5"
                      >
                        <div className="checkout__checkbox">
                          {getAddress && getAddress.length > 0
                            ? getAddress.map((item, index) => (
                                <div key={index} style={{ display: "flex" }}>
                                  {/* <Stack> */}

                                  <input
                                    style={{ width: "18px", height: "35px" }}
                                    type="radio"
                                    id="test1"
                                    value={item.id}
                                    onChange={(e) =>
                                      setaddress_id(e.target.value)
                                    }
                                    name="radio-group"
                                    defaultChecked=""
                                  />

                                  <p
                                    style={{
                                      marginTop: "3px",
                                      marginLeft: "20px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {item.address_line1}
                                  </p>
                                  {/* </Stack> */}
                                </div>
                              ))
                            : null}
                        </div>
                      </div>
                    </table>
                  </div>

                  <div class="checkout__total">
                    <table class="checkout__total--table">
                      <tbody class="checkout__total--body">
                        <tr class="checkout__total--items pb-5">
                          <td class="checkout__total--title text-left pb-5">
                            Subtotal{" "}
                          </td>
                          <td class="checkout__total--amount text-right">
                            {" "}
                            ₹
                            {totalaCal.subTotal
                              ? totalaCal.subTotal.toFixed(2)
                              : (0).toFixed(2)}
                          </td>
                        </tr>
                        <tr class="checkout__total--items pb-5">
                          <td class="checkout__total--title text-left pb-5">
                            {" "}
                            Discount
                          </td>
                          <td
                            style={{ color: "green" }}
                            class="checkout__total--calculated__text text-right"
                          >
                            - ₹
                            {totalaCal.discount
                              ? totalaCal.discount.toFixed(2)
                              : (0).toFixed(2)}
                          </td>
                        </tr>
                        <tr class="checkout__total--items pb-5">
                          <td class="checkout__total--title text-left pb-5">
                            {" "}
                            Coupon Amount
                          </td>
                          <td class="checkout__total--calculated__text text-right">
                            - ₹{coupenAppliedAmount.toFixed(2)}
                          </td>
                        </tr>
                        {totalaCal.shipping > 0 ? (
                          <tr class="checkout__total--items pb-5">
                            <td class="checkout__total--title text-left pb-5">
                              Shipping
                            </td>
                            <td class="checkout__total--calculated__text text-right">
                              + ₹{totalaCal.shipping.toFixed(2)}
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                      <tfoot class="checkout__total--footer">
                        <tr class="checkout__total--footer__items">
                          <td class="checkout__total--footer__title checkout__total--footer__list text-left">
                            Total{" "}
                          </td>
                          <td class="checkout__total--footer__amount checkout__total--footer__list text-right">
                            ₹
                            {(totalaCal?.netamount && totalaCal?.netamount > 0
                              ? totalaCal?.netamount -
                                parseFloat(coupenAppliedAmount)
                              : 0
                            ).toFixed(2)}
                          </td>
                        </tr>

                        <tr className="cart__summary--total__list">
                          {coupenAppliedAmount > 0 ? (
                            <td
                              style={{ color: "green" }}
                              className="cart__summary--total__title text-left"
                            >
                              You will save ₹{coupenAppliedAmount.toFixed(2)} on this order
                            </td>
                          ) : null}
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="payment__history mb-30">
                    <h3 className="payment__history--title mb-20">Payment</h3>
                    {/* <ul className="payment__history--inner d-flex">
                      <li className="payment__history--list">
                        <div style={{ display: "flex" }}>
                          <input
                            style={{ width: "18px", height: "35px" }}
                            type="radio"
                            id="cashOnDelivery"
                            name="payment"
                            defaultChecked=""
                            value="2"
                            onChange={() => setPaymentType("2")}
                          />
                          <p
                            style={{
                              marginTop: "7px",
                              marginLeft: "20px",
                              fontSize: "15px",
                            }}
                          >
                            Cash on Delivery
                          </p>
                        </div>
                      </li>
                    </ul> */}
                    <ul className="widget__form--check">
                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio1"
                        >
                          Cash on Delivery
                        </label>
                        <input
                          className="widget__form--check__input"
                          type="radio"
                          id="cashOnDelivery"
                          name="payment"
                          defaultChecked=""
                          value="2"
                          onChange={() => setPaymentType("2")}
                        />
                        <span className="widget__form--checkmark" />
                      </li>

                      <li className="widget__form--check__list">
                        <label
                          className="widget__form--check__label"
                          htmlFor="radio3"
                        >
                          Online payment
                        </label>
                        <input
                          className="widget__form--check__input"
                          type="radio"
                          id="onlinePayment"
                          name="payment"
                          value="1"
                          onChange={() => setPaymentType("1")}
                        />
                        <span className="widget__form--checkmark" />
                      </li>
                    </ul>

                    {/* <ul
                      style={{ marginTop: "15px" }}
                      className="payment__history--inner d-flex"
                    >
                      <li className="payment__history--list">
                        <div style={{ display: "flex" }}>
                          <input
                            style={{ width: "18px", height: "35px" }}
                            type="radio"
                            id="onlinePayment"
                            name="payment"
                            value="1"
                            onChange={() => setPaymentType("1")}
                          />
                          <p
                            style={{
                              marginTop: "7px",
                              marginLeft: "20px",
                              fontSize: "15px",
                            }}
                          >
                            Online payment
                          </p>
                        </div>
                      </li>
                    </ul> */}
                  </div>
                  <button
                    onClick={checkOut}
                    className="checkout__now--btn primary__btn"
                    type="submit"
                    style={{ position: "relative" }}
                  >
                    {loading1 && (
                      <CgSpinner
                        style={{
                          position: "absolute",
                          left: "39%",
                          top: "5%",

                          // transform: "translate(-50%, -50%)",
                        }}
                        size={30}
                        className="mt-1 ml-5 items-center animate-spin justify-center text-center"
                      />
                    )}
                    Checkout Now
                  </button>
                </aside>
              </div>
            </div>
          </div>
        </div>
        {/* End checkout page area */}
      </main>
    </>
  );
};

export default Page;
