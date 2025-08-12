import React from "react";
import ContentLoader from "react-content-loader";

const NewsCardLoader = (props) => (
  <ContentLoader
    speed={1.5}
    width={350}
    height={200}
    viewBox="0 0 350 200"
    backgroundColor="#f0f0f0"
    foregroundColor="#e0e0e0"
    {...props}
  >
    {/* Image placeholder */}
    <rect x="0" y="0" rx="8" ry="8" width="100%" height="120" />
    {/* Date */}
    <rect x="0" y="130" rx="4" ry="4" width="60%" height="10" />
    {/* Title */}
    <rect x="0" y="150" rx="4" ry="4" width="90%" height="14" />
    {/* Description */}
    <rect x="0" y="170" rx="4" ry="4" width="80%" height="12" />
  </ContentLoader>
);

export default NewsCardLoader;
