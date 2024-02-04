"use client";
import React from "react";
import Skeleton from "react-loading-skeleton";

const SliderSkeleton = () => {
  return (
    <div className="product">
      <div className="image-container">
        <Skeleton width={1480} height={500} />
      </div>
    </div>
  );
};

export default SliderSkeleton;
