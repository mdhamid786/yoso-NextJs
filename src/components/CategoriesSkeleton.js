import React from "react";
import Skeleton from "react-loading-skeleton";

const CategoriesSkeleton = () => {
  return (
    <div>
      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>
      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>

      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>
      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>

      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>

      <div className="image-container">
        <Skeleton height={50} width={330} />
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
