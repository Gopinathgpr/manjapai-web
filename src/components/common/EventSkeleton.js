import React from "react";
import ContentLoader from "react-content-loader";

const EventSkeleton = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={300}
    viewBox="0 0 300 300"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="0" y="0" rx="8" ry="8" width="300" height="180" />
    <rect x="0" y="190" rx="4" ry="4" width="200" height="15" />
    <rect x="0" y="215" rx="4" ry="4" width="250" height="10" />
    <rect x="0" y="235" rx="4" ry="4" width="250" height="10" />
  </ContentLoader>
);

export default EventSkeleton;
