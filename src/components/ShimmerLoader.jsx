/* eslint-disable react/prop-types */
// ShimmerLoader.jsx
import { Skeleton } from '@mui/material';

const ShimmerLoader = ({ count, width, height, marginRight }) => {
  const shimmerLoaders = [];

  for (let index = 0; index < count; index++) {
    shimmerLoaders.push(
      <Skeleton
        key={index}
        variant="rectangular"
        width={width}
        height={height}
        style={{ marginRight, borderRadius: '10px' }}
      />
    );
  }

  return <>{shimmerLoaders}</>;
};

export default ShimmerLoader;
