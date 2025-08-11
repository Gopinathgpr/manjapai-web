import React from 'react'
import ContentLoader from 'react-content-loader';

const GallerySkeleton = () => (
  <div className="row">
    {Array(6)
      .fill(0)
      .map((_, i) => (
        <div className="col-6 col-lg-4 col-md-4 mb-4" key={i}>
          <ContentLoader
            speed={2}
            width="100%"
            height={200}
            backgroundColor="#f3f3f3"
            foregroundColor="#ecebeb"
          >
            <rect x="0" y="0" rx="10" ry="10" width="100%" height="150" />
            <rect x="0" y="160" rx="4" ry="4" width="80%" height="15" />
          </ContentLoader>
        </div>
      ))}
  </div>
);

export default GallerySkeleton