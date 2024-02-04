"use client";
import { postApiData, postwithcart } from "@/Helper/common";
import Link from "next/link";
import React, { useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Register = () => {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const cart1 = useSelector((state) => state.allCart1.cartItems);
  const wish1 = useSelector((state) => state.allWish1.wishItems);
  const [password_confirmation, setPassword_confirmation] = useState();

  const handleChange = (e, index) => {
    const value = e.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = value;

      return newOtp;
    });
    if (value !== "" && index < 3) {
      inputRefs[index + 1].current.focus();
    }
  };

  const [errors, setErrors] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };
    if (!name.trim()) {
      newErrors.name = "Name is required *";
      isValid = false;
    } else if (!/^[a-zA-Z\s]*$/.test(name)) {
      newErrors.name = "Name should contain letters";
      isValid = false;
    } else {
      newErrors.name = "";
    }
    if (!mobile.trim()) {
      newErrors.mobile = "Mobile number is required *";
      isValid = false;
    } else if (mobile.length !== 10) {
      newErrors.mobile = "Phone number should be 10 digits";
    } else {
      newErrors.mobile = "";
    }
    if (!email.trim()) {
      newErrors.email = "Email is required *";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required *";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (password !== password_confirmation) {
      newErrors.password_confirmation = "Passwords do not match *";
      isValid = false;
    } else {
      newErrors.password_confirmation = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  const handlerRegister = async (event) => {
    const apiData = JSON.stringify({
      name,
      email,
      password,
      password_confirmation,
      mobile,
    });
    event.preventDefault();

    if (validateForm()) {
      try {
        const data = await postApiData("registration", apiData);
        if (data.error === false) {
          toast.success(data.message, {
            position: "top-left",
          });
          setShowOTP(true);
        } else {
          toast.error(data.message, {
            position: "top-left",
          });
          setShowOTP(false);
        }
      } catch (errorData) {
        toast.error(errorData.message, {
          position: "top-left",
        });
        setShowOTP(false);
      }
    } else {
      setShowOTP(false);
    }
  };

  const otpVerify = async (event) => {
    event.preventDefault();
    const otpData = otp.join("");
    const otpApiData = JSON.stringify({ mobile, otp: otpData });
    try {
      const data = await postApiData("validate-otp", otpApiData);
      if (data.error == false) {
        toast.success(data.message, {
          position: "top-left",
        });
        setLoading(true);
        router.push("/");
        if (typeof window !== "undefined") {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", JSON.stringify(data.result));
        }
        document.cookie = `token=${data.token}`;
        location.href = "/";
        const cartPromises = cart1.map(async (item) => {
          const data1 = JSON.stringify({
            product_id: item.variant_productid,
            qty: item.qty,
          });
          try {
            const cartData = await postwithcart("add-cart", data1);
          } catch (cartError) {
            toast.error(cartError.message, {
              position: "top-left",
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
            toast.error(cartError.message, {
              position: "top-left",
            });
          }
        });
        await Promise.all(wishPromises);
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
  };

  const ResendOTP = async (event) => {
    event.preventDefault();
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
        toast.error(data.message, {
          position: "top-left",
        });
      }
    } catch (errorData) {
      toast.error(errorData.message, {
        position: "top-left",
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
            <div class="account__login--header mb-25">
              <h3 class="account__login--header__title mb-10">
                Create an Account
              </h3>
              <p class="account__login--header__desc">
                Register here if you are a new customer
              </p>
            </div>
          )}

          <div className="account__login--inner">
            <section
              style={{ backgroundColor: "##fff" }}
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
                        <span style={{ color: "black" }}>Resend OTP</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <form onSubmit={handlerRegister}>
                        <label>
                          <input
                            className="account__login--input"
                            placeholder="Enter your name"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                          {errors.name && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.name}
                            </span>
                          )}
                        </label>

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
                              style={{ color: "tomato", fontWeight: "bolder",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.mobile}
                            </span>
                          )}
                        </label>
                        <label>
                          <input
                            className="account__login--input"
                            placeholder="Enter your email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />{" "}
                          {errors.email && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.email}
                            </span>
                          )}
                        </label>

                        <label>
                          <input
                            className="account__login--input"
                            placeholder="Enter Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {errors.password && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.password}
                            </span>
                          )}
                        </label>

                        <label>
                          <input
                            className="account__login--input"
                            placeholder="Enter confirmation password "
                            type="password"
                            value={password_confirmation}
                            onChange={(e) =>
                              setPassword_confirmation(e.target.value)
                            }
                          />
                          {errors.password_confirmation && (
                            <span
                              style={{ color: "tomato", fontWeight: "bolder",marginBottom:"10px" }}
                              className="error-message"
                            >
                              {errors.password_confirmation}
                            </span>
                          )}
                        </label>

                        <button
                          className="account__login--btn primary__btn"
                          type="submit"
                        >
                          Register
                        </button>
                      </form>
                      <p class="account__login--signup__text">
                        Have already an Account?{" "}
                        <button type="submit">
                          <Link href="/login">Sign In now</Link>
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

export default Register;
