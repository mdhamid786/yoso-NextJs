"use client";
import { getWithToken, postWithToken } from "@/Helper/common";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import oderImg from "../../public/orders.png";
import Image from "next/image";

const OrderHistory = () => {
  const [orders, setorders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Des Order api calling ...
  const Latestorders = async () => {
    try {
      const data = await getWithToken("order");
      setorders(data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    Latestorders();
  }, []);

  return (
    <div>
      <table className="account__table">
        <thead className="account__table--header">
          <tr className="account__table--header__child">
            <th className="account__table--header__child--items">Order</th>
            <th className="account__table--header__child--items">Date</th>
            <th className="account__table--header__child--items">
              Payment Status
            </th>
            <th className="account__table--header__child--items">
              payment Type
            </th>
            <th className="account__table--header__child--items">Total</th>
            <th className="account__table--header__child--items">View</th>
          </tr>
        </thead>
        {orders && orders.length > 0 ? (
          orders.map((item, index) => (
            <tbody key={index} className="account__table--body mobile__none">
              <tr className="account__table--body__child">
                <td className="account__table--body__child--items">
                  #{item.order_id}
                </td>
                <td className="account__table--body__child--items">
                  {item.created_at}
                </td>
                <td className="account__table--body__child--items">
                  {item.payment_status}
                </td>
                <td className="account__table--body__child--items">
                  {item.paymentType}
                </td>
                <td className="account__table--body__child--items">
                  ₹{item.amount}
                </td>
                <td className="account__table--body__child--items">
                  <Link href={"/my-account/" + item.id}>
                    <RemoveRedEyeIcon
                      style={{ width: "23px", height: "34px", color: "green" }}
                    />
                  </Link>
                </td>
              </tr>
            </tbody>
          ))
        ) : (
          // when not data
          <tr className="cart__table--body__items text-center">
            <td className="cart__table--body__list" colSpan="6">
              <div
                style={{
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Image
                  className="empty-cart3"
                  style={{ width: "auto" }}
                  src={oderImg}
                  alt="Empty orders"
                />
                <p>No orders found</p>
              </div>
            </td>
          </tr>
        )}

        {orders && orders.length > 0
          ? orders.map((item, index) => (
              <tbody key={index} className="account__table--body mobile__block">
                 <Link href={"/my-account/" + item.id}>
                <tr className="account__table--body__child">
                  <td className="account__table--body__child--items">
                    <strong>Order</strong>
                    <span>{item.order_id}</span>
                  </td>
                  <td className="account__table--body__child--items">
                    <strong>Date</strong>
                    <span>{item.created_at}</span>
                  </td>
                  <td className="account__table--body__child--items">
                    <strong>Payment Status</strong>
                    <span>{item.payment_status}</span>
                  </td>
                  <td className="account__table--body__child--items">
                    <strong>Payment Type</strong>
                    <span>{item.paymentType}</span>
                  </td>
                  <td className="account__table--body__child--items">
                    <strong>Total</strong>
                    <span>₹{item.amount}</span>
                  </td>
                  <td className="account__table--body__child--items">
                    {/* <Link href={"/my-account/" + item.id}>
                      <RemoveRedEyeIcon
                        style={{ width: "23px", height: "34px" }}
                      />
                    </Link> */}
                  </td>
                </tr>
                </Link>
              </tbody>
            ))
          : null}
      </table>
    </div>
  );
};

export default OrderHistory;
