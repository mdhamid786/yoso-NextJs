"use client";
import { getApiData } from "@/Helper/common";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const BannerBottom = () => {
  const [banner, setBanner] = useState("");

  // @Des Bottom Banner api calling...
  const fetchData = async () => {
    try {
      const data = await getApiData("banner-list/bottom");
      setBanner(data.result);
    } catch (error) {
      console.error("Error fetching banner data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section className="banner__section section--padding pt-0">
        <div className="container-fluid">
          <div className="row row-cols-lg-3 row-cols-md-2 row-cols-sm-2 row-cols-1 mb--n28">
            {banner && banner.length > 0
              ? banner.map((item, index) => (
                  <div key={index} className="col mb-28">
                    <div className="banner__items">
                      <Link
                        className="banner__items--thumbnail position__relative"
                        href="/"
                      >
                        <img
                          style={{ height: "200px" }}
                          className="banner__items--thumbnail__img"
                          src={item.image}
                          alt="banner-img"
                        />
                      </Link>
                    </div>
                  </div>
                ))
              : null}
          </div>
        </div>
      </section>
    </>
  );
};

export default BannerBottom;

//
