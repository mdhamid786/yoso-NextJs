"use client";
import { getWithToken, postWithToken } from "@/Helper/common";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
const EditAddress = (item) => {
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
  const [id, setId] = useState("");
  const [addressIdToDelete, setAddressIdToDelete] = useState("");
  const [showAllAddresses, setShowAllAddresses] = useState(false);

  const [addressData, setAddressData] = useState(item);
  useEffect(() => {
    if (item != null) {
      setAddress(item.item.name);
      setCity(item.item.city_id);
      setAddress(item.item.address_line1);
      setPincode(item.item.pincode);
      setPhone(item.item.mobile);
      setState(item.item.state_id);
      setState(item.item.state_id);
      setFname(item.item.name);
      setId(item.item.id);
    }
  }, []);

  // const userString = localStorage.getItem("user");
  const userString =
    typeof window !== "undefined" ? localStorage.getItem("user") : null;
  const userObject = JSON.parse(userString);

  // @Des address api calling ...
  const UpdateAddress = async (event) => {
    const apiData = JSON.stringify({
      address,
      city,
      state,
      pincode,
      id,
      FName,
      phone,
    });
    event.preventDefault();

    try {
      const data = await postWithToken("add-address", apiData);
      if (data.error == false) {
        toast.success(data.message, {
          position: "top-left",
        });
        setAddress("");
        setCity("");
        setState("");
        setPincode("");
        setOpen(close);
        userAddress();
        location.href = "/address";
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

  // const [getaddress , setGetAddress] = useState([])
  // @ get address api calling...

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

  // @delete address api calling ...
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
      toast.error(errorData.message, {
        position: "top-left",
      });
    }
  };

  useEffect(() => {
    userAddress();
  }, []);

  return (
    <div>
      <div>
        <button
          className="account__details--footer__btn"
          onClick={onOpenModal}
          type="button"
        >
          Edit
        </button>
        <Modal open={open} onClose={onCloseModal}>
          <>
            <div style={{ padding: "50px" }}>
              <form className="col-12" onSubmit={UpdateAddress}>
                <label>
                  <li className="account__menu--list pt-5  ">
                    <Link href="/address">Update Address</Link>
                  </li>
                  <label>
                    <input
                      value={FName}
                      onChange={(e) => setFname(e.target.value)}
                      className="account__login--input"
                      placeholder="Enter Name"
                      type="text"
                    />
                  </label>
                  <label>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="account__login--input"
                      placeholder="Enter Phone number"
                      type="text"
                      minLength={10}
                      maxLength={10}
                    />
                  </label>
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
              </form>
            </div>
          </>
        </Modal>
      </div>
    </div>
  );
};

export default EditAddress;
