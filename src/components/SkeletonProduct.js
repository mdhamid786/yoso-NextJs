// SkeletonProduct.js
"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SkeletonProduct = () => {
  return (
    <div className="product">
      <div className="image-container">
        <Skeleton className="image-container" height={262} width={250} />
      </div>
      <span style={{ textAlign: "center" }}>
        <Skeleton className="button-container" width={250} height={20} />
      </span>
      <br></br>
      <span style={{ textAlign: "center" }}>
        <Skeleton  className="button-container" width={250} height={20} />
      </span>
    </div>
  );
};

export default SkeletonProduct;
