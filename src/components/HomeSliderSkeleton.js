import React from 'react';
import { Skeleton, SkeletonCircle, SkeletonText } from '@chakra-ui/react'
import './HomeSliderSkeleton.css'; // Import your external stylesheet

const ResponsiveSkeleton = () => {
  return (
    <>
    <Skeleton height='200px' />
  <Skeleton height='200px' />
  <Skeleton height='200px' />
    </>
  );
};

export default ResponsiveSkeleton;
