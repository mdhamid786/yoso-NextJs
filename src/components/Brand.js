"use client";
import Link from "next/link";
import React from "react";

const Brand = () => {
  return (
    <div>
      <div className="single__widget widget__bg">
        <h2 className="widget__title position__relative h3">Brands</h2>
        <ul className="widget__tagcloud">
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Wooden
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Chair
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Modern
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Fabric
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Shoulder{" "}
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Winter
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Accessories
            </Link>
          </li>
          <li className="widget__tagcloud--list">
            <Link className="widget__tagcloud--link" href="shop">
              Dress{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Brand;
