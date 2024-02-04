"use client";
import { postApiData, postwithcart } from "@/Helper/common";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { Router } from "next/router";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  // const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [errors, setErrors] = useState({
    mobile: "",
    // password: "",
  });

  // Form validation
  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required *";
      isValid = false;
    } else if (mobile.length !== 10) {
      newErrors.mobile = "Phone number should be 10 digits";
    } else {
      newErrors.mobile = "";
    }

    // if (!password.trim()) {
    //   newErrors.password = "Password is required *";
    //   isValid = false;
    // } else {
    //   newErrors.password = "";
    // }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e, index) => {
    const value = e.target.value;
    // Update the OTP state
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      return newOtp;
    });

    // Move focus to the next input field
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const [loading, setLoading] = useState(false);
  const [logged, setLogged] = useState(false);
  const cart1 = useSelector((state) => state.allCart1.cartItems);
  const wish1 = useSelector((state) => state.allWish1.wishItems);

  // Des login api calling ...
  const handlerLogin = async (event) => {
    const apiData = JSON.stringify({ mobile });
    event.preventDefault();

    if (validateForm()) {
      try {
        const data = await postApiData("login", apiData);
        if (data.error == false) {
          toast.success(data.message,{
            position:"top-left"
          });
          setShowOTP(true);
        } else {
          toast.error(data.message,{
            position:"top-left"
          });
          setShowOTP(false);
        }
      } catch (errorData) {
        toast.error(errorData.message,{
          position:"top-left"
        });
      }
    }
  };

  // Des OTP verify api calling ...
  const otpVerify = async (event) => {
    event.preventDefault();
    const otpString = otp.join("");
    const otpApiData = JSON.stringify({ mobile, otp: otpString });
    try {
      const otpValidationData = await postApiData("validate-otp", otpApiData);
      if (otpValidationData.error === false) {
        toast.success(otpValidationData.message,{
          position:"top-left"
        });
        setLoading(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", otpValidationData.token);
          localStorage.setItem(
            "user",
            JSON.stringify(otpValidationData.result)
          );
        }
        document.cookie = `token=${otpValidationData.token}`;
        location.href = "/";
        const cartPromises = cart1.map(async (item) => {
          const data1 = JSON.stringify({
            product_id: item.variant_productid,
            qty: item.qty,
          });
          try {
            const cartData = await postwithcart("add-cart", data1);
          } catch (cartError) {
            toast.error(cartError.message,{
              position:"top-left"
            });
          }
        });
        const wishPromises = wish1.map(async (item) => {
          const data1 = JSON.stringify({
            product_id: item.productid,
            qty: item.qty,
          });
          try {
            const wishData = await postwithcart("wishlist-product", data1);
          } catch (cartError) {
            toast.error(cartError.message,{
              position:"top-left"
            });
          }
        });
        await Promise.all(wishPromises);
      } else {
        toast.error(otpValidationData.message,{
          position:"top-left"
        });
      }
    } catch (errorData) {
      toast.error(errorData.message,{
        position:"top-left"
      });
    }
  };

  // @ Des Resend API calling ...
  const ResendOTP = async (event) => {
    event.preventDefault();
    setOtp(["", "", "", ""]);
    const apiData = JSON.stringify({ mobile });
    try {
      const data = await postApiData("mobile-getotp", apiData);
      if (data.error == false) {
        toast.success(data.message,{
          position:"top-left"
        });
        setLoading(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
        }
      } else {
        toast.error(data.message,{
          position:"top-left"
        });
      }
    } catch (errorData) {
      toast.error(errorData.message,{
        position:"top-left"
      });
    }
  };

  function formatMobileNumber(number) {
    var formattedNumber = "xxxxxx" + number.substring(6);
    return formattedNumber;
  }

  return (
    <>
      <div className="col">
        <div className="account__login">
          {showOTP ? (
            <div className="account__login--header mb-25">
              <h3 className="account__login--header__title mb-10">
                OTP Verify
              </h3>
              <p className="account__login--header__desc">
                OTP sent successfully on your registered Mobile{" "}
                {formatMobileNumber(mobile)}
              </p>
            </div>
          ) : (
            <div className="account__login--header mb-25">
              <h3 className="account__login--header__title mb-10">Login</h3>
              <p className="account__login--header__desc">
                Login if you area a returning customer.
              </p>
            </div>
          )}

          <div className="account__login--inner">
            <section
              style={{ backgroundColor: "##fff", color: "black" }}
              className=" flex items-center justify-center"
            >
              <div>
                <div className="w-70 flex flex-col gap-4 rounded-lg p-4">
                  <p
                    style={{ color: "black" }}
                    className="text-center leading-normal text-black font-medium text-2xl font-bold mb-6"
                  ></p>
                  {showOTP ? (
                    <>
                      <div className="bg-white text-blue-500 w-fit mx-auto p-4 rounded-full">
                        <img
                          style={{ height: "120px", width: "142px" }}
                          src="https://thumbs.dreamstime.com/b/otp-one-time-password-step-authentication-data-protection-internet-security-concept-otp-one-time-password-step-authentication-data-254434939.jpg"
                        ></img>
                      </div>
                      <label
                        htmlFor="otp"
                        className="font-bold text-xl text-black text-center"
                      >
                        Enter your OTP
                      </label>
                      <div style={{ display: "flex" }}>
                        {otp.map((digit, index) => (
                          <input
                            style={{
                              height: "44px",
                              width: "55px",
                              border: "1px solid gray",
                              margin: "10px",
                              textAlign: "center",
                              alignItems: "center",
                              borderRadius: "10px",
                            }}
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            onChange={(e) => handleChange(e, index)}
                            ref={inputRefs[index]}
                          />
                        ))}
                      </div>
                      <button
                        onClick={otpVerify}
                        className="account__login--btn primary__btn"
                        type="submit"
                      >
                        OTP Verify
                      </button>

                      <button
                        onClick={ResendOTP}
                        style={{ backgroundColor: "white" }}
                        className=" w-full flex gap-1 items-center justify-center py-2.5 text-white rounded"
                      >
                        {loading && (
                          <CgSpinner size={20} className="mt-1 animate-spin" />
                        )}
                        <span style={{ color: "black" }}>Resend OTP</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handlerLogin}>
                        <label>
                          <input
                            className="account__login--input"
                            placeholder="Enter phone number"
                            type="phone"
                            maxLength={10}
                            minLength={10}
                            value={mobile}
                            onChange={(e) => setMobile(e.target.value)}
                          />
                          {errors.mobile && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder", marginBottom:"10px"}}
                              className="error-message"
                            >
                              {errors.mobile}{" "}
                            </span>
                          )}
                        </label>
                        {/* <label>
                          <input
                            className="account__login--input"
                            placeholder="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder" }}
                              className="error-message"
                            >
                              {errors.password}
                            </span>
                          )}
                        </label> */}

                        <button
                          className="account__login--btn primary__btn"
                          type="submit"
                        >
                          Login
                        </button>
                      </form>
                      <p class="account__login--signup__text">
                        Don,t Have an Account?{" "}
                        <button type="submit">
                          <Link href="/register">Sign up now</Link>
                        </button>
                      </p>
                    </>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
