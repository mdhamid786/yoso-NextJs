"use client";
import { getApiData, getWithToken } from "@/Helper/common";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import success from "../../../public/profile.png";
import Image from "next/image";
import "./useradd.css";

const Page = () => {
  const [profile, setprofile] = useState([]);
  const [loading, setLoading] = useState(true);

  const userprofile = async () => {
    try {
      const data = await getWithToken("get-profile");
      setprofile(data.data);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching profile:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    userprofile();
  }, []);

  return (
    <>
      <main className="main__content_wrapper">
        {/* Start breadcrumb section */}
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
              <div
                style={{
                  backgroundColor: "#f8f8f8",
                  padding: "20px",
                  borderRadius: "10px",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                }}
                className="account__wrapper"
              >
                <div
                  style={{ maxWidth: "600px", margin: "0 auto" }}
                  className="account__content"
                >
                  <h3
                    style={{ color: "#333" }}
                    className="account__content--title mb-20"
                  >
                    Profile
                  </h3>

                  <div
                    style={{
                     
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                    className="account__details two"
                  >
                    <p
                      style={{ margin: "0", fontSize: "16px", color: "#555" }}
                      className="account__details--desc"
                    >
                      <span
                        style={{
                          color: "black",
                          fontWeight: "bold",
                       
                        }}
                      >
                        User:
                      </span>{" "}
                      {profile.name}
                    </p>
                    <p
                      style={{ margin: "0", fontSize: "16px", color: "#555" }}
                      className="account__details--desc"
                    >
                      <span
                        style={{
                          color: "black",
                          fontWeight: "bold",
                       
                        }}
                      >
                        Mobile:
                      </span>{" "}
                      {profile.mobile}
                    </p>
                  </div>

                  <div
                    style={{
                      paddingTop: "20px",
                   
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                    }}
                    className="account__details two"
                  >
                    <p
                      style={{ margin: "0", fontSize: "16px", color: "#555" }}
                      className="account__details--desc"
                    >
                      <span
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        
                        }}
                      >
                        Email:
                      </span>{" "}
                      {profile.email}
                    </p>
                    <p
                      style={{ margin: "0", fontSize: "16px", color: "#555" }}
                      className="account__details--desc"
                    >
                      <span
                        style={{
                          color: "black",
                          fontWeight: "bold",
                        
                        }}
                      >
                        Type:
                      </span>{" "}
                      {profile.user_type}
                    </p>
                  </div>
                </div>
              </div>
              {/* new profile add */}

              <Image
                className="notdata"
                style={{ height: "300px", width: "auto" }}
                src={success}
                alt="Empty Cart Image"
              />
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Page;