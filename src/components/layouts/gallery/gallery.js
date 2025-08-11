import React, { useState } from "react";
import "./gallery.css";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useGetGalleryQuery } from "../../../Api/GalleryApi/galleryApi";
import GallerySkeleton from "../../common/GallerySkeleton";




function Gallery() {
  const [indexOfImages, setIndexOfImages] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const { data, error, isLoading, isFetching } = useGetGalleryQuery(undefined, {
    refetchOnMountOrArgChange: false,
  });

  const openModalAndSetIndex = (index) => {
    setIndexOfImages(index);
    setShowModal(true);
  };

  if (isLoading || isFetching) {
    return (
      <div className="gallery-total-section">
        <div className="container formobileonly">
          <h3 className="gallery-title">
            {localStorage.getItem("language") === "Tamil" ? "கேலரி" : "Gallery"}
          </h3>
          <GallerySkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-center text-danger">
        Failed to load gallery. Please try again later.
      </p>
    );
  }

  const gallery = data?.data || [];
  const arrOfImages =
    data?.gallery_Image.map((img) => ({ src: img })) || [];

  return (
    <div className="gallery-total-section">
      <div className="container formobileonly">
        <h3 className="gallery-title">
          {localStorage.getItem("language") === "Tamil" ? "கேலரி" : "Gallery"}
        </h3>

        <div className="row">
          {gallery.map((item, index) => (
            <div
              key={index}
              className={`col-6 col-lg-${item.gallery_file.gallerySize} col-md-${item.gallery_file.gallerySize}`}
            >
              <div className="total-gallery">
                <img
                  className="gallery-image-r1 lazyload"
                  src={
                    item.gallery_file.filePath + item.gallery_file.galleryImage
                  }
                  alt={item.categoryName}
                  loading="lazy"
                />
                <div
                  className="image__overlay"
                  onClick={() => openModalAndSetIndex(index)}
                >
                  <h3 className="gallery-hover-text">{item.categoryName}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-albums">
          <button className="view-more-btn">
            <Link
              className="gallery-nav"
              to={process.env.PUBLIC_URL + "/media-and-events/media-gallery"}
            >
              {localStorage.getItem("language") === "Tamil"
                ? "மேலும் பார்க்க"
                : "View More"}
              <MdArrowForward style={{ margin: "0 0 0 10px" }} />
            </Link>
          </button>
        </div>

        <Lightbox
          open={showModal}
          close={() => setShowModal(false)}
          index={indexOfImages}
          slides={arrOfImages}
          carousel={{ finite: false }}
        />
      </div>
    </div>
  );
}

export default Gallery;
