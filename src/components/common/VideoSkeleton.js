// VideoSkeleton.js
import React from "react";
import ContentLoader from "react-content-loader";

const VideoSkeleton = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    height={250}
    viewBox="0 0 300 250"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    {/* Video thumbnail */}
    <rect x="0" y="0" rx="8" ry="8" width="300" height="170" />

    {/* Video title */}
    <rect x="0" y="180" rx="4" ry="4" width="220" height="14" />

    {/* Channel name */}
    <rect x="0" y="200" rx="3" ry="3" width="150" height="12" />

    {/* Views & time */}
    <rect x="0" y="220" rx="3" ry="3" width="100" height="12" />
  </ContentLoader>
);

export default VideoSkeleton;
