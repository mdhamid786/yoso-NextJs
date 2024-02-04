"use client";
import { getApiData, getWithToken, postWithToken } from "@/Helper/common";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import toast, { Toaster } from "react-hot-toast";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Image from "next/image";
import oderImg from "../../../public/location.png";
import EditAddress from "@/components/EditAddress";
import { Box, Center, Flex, Spacer, Square, Text } from "@chakra-ui/react";

const Page = () => {
  const [address1, setaddress1] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [FName, setFname] = useState("");
  const [phone, setPhone] = useState("");
  const [addressIdToDelete, setAddressIdToDelete] = useState("");
  const [showAllAddresses, setShowAllAddresses] = useState(false);
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userObject = JSON.parse(userString);

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
      newErrors.address = "Name should contain letters";
      isValid = false;
    } else {
      newErrors.address = "";
    }

    if (!city.trim()) {
      newErrors.city = "city is required *";
      isValid = false;
    } else {
      newErrors.city = "";
    }

    if (!FName.trim()) {
      newErrors.FName = "Name is required *";
      isValid = false;
    } else {
      newErrors.FName = "";
    }

    if (!phone.trim()) {
      newErrors.phone = "Mobile number is required *";
      isValid = false;
    } else if (phone.length !== 10) {
      newErrors.phone = "Phone number should be 10 digits";
    } else {
      newErrors.phone = "";
    }

    if (!state.trim()) {
      newErrors.state = "state is required *";
      isValid = false;
    } else {
      newErrors.state = "";
    }

    if (!pincode.trim()) {
      newErrors.pincode = "pincode is required *";
      isValid = false;
    } else {
      newErrors.pincode = "";
    }

    setErrors(newErrors);
    return isValid;
  };

  // @add address api call
  const AddAddress = async (event) => {
    const apiData = JSON.stringify({
      address,
      city,
      state,
      pincode,
      id: 0,
      FName,
      phone,
    });
    event.preventDefault();

    if (validateForm()) {
      try {
        const data = await postWithToken("add-address", apiData);
        if (data.error == false) {
          setAddress("");
          setCity("");
          setState("");
          setPincode("");
          toast.success(data.message, {
            position: "top-left",
          });
          setOpen(close);
          userAddress();
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
    }
  };

  // @ get address api call
  const userAddress = async () => {
    try {
      const data = await getWithToken("address-list");
      setaddress1(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching address:", error);
      setLoading(false);
    }
  };

  // @delete address api call
  const deleteAddress = async (id) => {
    try {
      const apiData = JSON.stringify({ id });
      const data = await postWithToken("delete-address", apiData);
      if (data.error === false) {
        toast.success(data.message, {
          position: "top-left",
        });
        userAddress();
      } else {
        toast.error(data.message, {
          position: "top-left",
        });
      }
    } catch (errorData) {
      toast.error(errorData.message);
    }
  };

  useEffect(() => {
    userAddress();
  }, []);

  return (
    <>
      <main className="main__content_wrapper">
        <section className="breadcrumb__section breadcrumb__bg">
          <div className="container">
            <div className="row row-cols-1">
              <div className="col">
                <div className="breadcrumb__content">
                  <h1 className="breadcrumb__content--title text-white mb-10">
                    My Account
                  </h1>
                  <ul className="breadcrumb__content--menu d-flex">
                    <li className="breadcrumb__content--menu__items">
                      <Link className="text-white" href="/">
                        Home
                      </Link>
                    </li>
                    <li className="breadcrumb__content--menu__items">
                      <span className="text-white">My Account</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* End breadcrumb section */}
        {/* my account section start */}
        <section className="my__account--section section--padding">
          <div className="container">
            <div className="my__account--section__inner border-radius-10 d-flex">
              <Sidebar />

              <div className="account__wrapper">
                <div className="account__content">
                  <h3 className="account__content--title mb-20">Addresses</h3>
                  <div>
                    <button
                      className="new__address--btn primary__btn mb-25"
                      onClick={onOpenModal}
                    >
                      Add Address
                    </button>
                    <Modal open={open} onClose={onCloseModal}>
                      {/* <div className="account__wrapper"> */}
                      <>
                        <div style={{ padding: "50px" }}>
                          <form className="col-12" onSubmit={AddAddress}>
                            <label>
                              <li className="account__menu--list pt-5  ">
                                <Link href="/address">Add Address</Link>
                              </li>
                              <label>
                                <input
                                  value={FName}
                                  onChange={(e) => setFname(e.target.value)}
                                  className="account__login--input"
                                  placeholder="Enter Name"
                                  type="text"
                                />
                                {errors.FName && (
                                  <span
                                    style={{
                                      color: "tomato",
                                      fontWeight: "bolder",
                                      marginBottom: "10px",
                                    }}
                                    className="error-message"
                                  >
                                    {errors.FName}
                                  </span>
                                )}
                              </label>
                              <label>
                                <input
                                  value={phone}
                                  onChange={(e) => setPhone(e.target.value)}
                                  className="account__login--input"
                                  placeholder="Enter Phone number"
                                  type="text"
                                  maxLength={10}
                                  minLength={10}
                                />
                                {errors.phone && (
                                  <span
                                    style={{
                                      color: "tomato",
                                      fontWeight: "bolder",
                                      marginBottom: "10px",
                                    }}
                                    className="error-message"
                                  >
                                    {errors.phone}
                                  </span>
                                )}
                              </label>
                              <input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="account__login--input"
                                placeholder="Apartment, Floor, House No etc."
                                type="text"
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
                            </label>
                            <label>
                              <input
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                className="account__login--input"
                                placeholder="Enter City"
                                type="text"
                              />
                              {errors.city && (
                                <span
                                  style={{
                                    color: "tomato",
                                    fontWeight: "bolder",
                                    marginBottom: "10px",
                                  }}
                                  className="error-message"
                                >
                                  {errors.city}
                                </span>
                              )}
                            </label>

                            <label>
                              <input
                                className="account__login--input"
                                placeholder="Enter State"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                type="text"
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
                            </label>

                            <label>
                              <input
                                value={pincode}
                                onChange={(e) => setPincode(e.target.value)}
                                className="account__login--input"
                                placeholder="Enter Pin Code"
                                type="Number"
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
                            </label>

                            <button
                              className="account__login--btn primary__btn"
                              type="submit"
                            >
                              Save Adddress
                            </button>
                          </form>
                        </div>
                      </>
                    </Modal>
                  </div>

                  <div className="col-xl-12 col-lg-12">
                    <div className="shop__product--wrapper">
                      <div className="tab_content">
                        <div id="product_grid" className="tab_pane active show">
                          <div className="product__section--inner product__grid--inner">
                            <div className="row row-cols-xxl-4 row-cols-xl-3 row-cols-lg-3 row-cols-md-3 row-cols-2 mb--n30">
                              {address1 && address1.length > 0 ? (
                                address1.map((item, index) => (
                                  <div className="col mb-30 displyBorder">
                                    <div className="product__items">
                                      <div className="product__items--content1 text-center">
                                        <div className="product__items--price">
                                          <div
                                            className="account__details two"
                                            style={{ textAlign: "left" }}
                                          >
                                            <p className="account__details--desc">
                                              <span className="">
                                                {item.name}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.address_line1}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.state_id}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.city_id}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.pincode}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.mobile}
                                              </span>{" "}
                                              <br />
                                              <span className="">
                                                {item.email}
                                              </span>{" "}
                                              <br />
                                            </p>
                                          </div>

                                          <div className="account__details--footer d-flex">
                                            <div style={{ marginRight: "5px" }}>
                                              <EditAddress
                                                key={index}
                                                item={item}
                                              />
                                            </div>

                                            <button
                                              style={{ marginLeft: "5px" }}
                                              onClick={() =>
                                                deleteAddress(item.id)
                                              }
                                              className="account__details--footer__btn"
                                              type="button"
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))
                              ) : (
                                <>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Image
                                      className="empty-cart3"
                                      style={{ width: "auto" }}
                                      src={oderImg}
                                      alt="Empty orders"
                                    />
                                  </div>
                                  <div
                                    style={{
                                      textAlign: "center",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  ></div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* {address1.length > 1 && !showAllAddresses && (
                    <button
                      className="account__details--link"
                      type="button"
                      onClick={handleViewMore}
                    >
                      View More Addresses ({address1.length - 1})
                    </button>
                  )} */}
                </div>
              </div>

              {/* new address add */}

              {/* <form onSubmit={AddAddress}>
                <label>
                  <li className="account__menu--list  ">
                    <Link href="/address">Add New Address</Link>
                  </li>
                  <input
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="account__login--input"
                    placeholder="Apartment, Floor, House No etc."
                    type="text"
                  />
                </label>
                <label>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="account__login--input"
                    placeholder="Enter City"
                    type="text"
                  />
                </label>

                <label>
                  <input
                    className="account__login--input"
                    placeholder="Enter State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    type="text"
                  />
                </label>

                <label>
                  <input
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="account__login--input"
                    placeholder="Enter Pin Code"
                    type="Number"
                  />
                </label>

                <button
                  className="account__login--btn primary__btn"
                  type="submit"
                >
                  Save Adddress
                </button>
              </form> */}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;
