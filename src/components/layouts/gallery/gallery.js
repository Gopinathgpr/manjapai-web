import React, { useState, useEffect, useRef } from "react";
import "./gallery.css";
import { MdArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import API_URL from "../../../Config/api";

function Gallery() {
    const dataFetchedRef = useRef(false);

    const [indexOfImages, setIndexOfImages] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [gallery, setGallery] = useState([]);
    const [arrOfImages, setImage] = useState([]);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        galleryList();
    }, []);

    const openModalAndSetIndex = (index) => {
        setIndexOfImages(index);
        setShowModal(true);
    };

    const galleryList = () => {
        const apiUrl = API_URL + "HomeApi/gallery_home";
        const myHeaders = new Headers();
        const raw = JSON.stringify({ token: "MeendumManjappai" });
        const options = {
            method: "POST",
            body: raw,
            headers: myHeaders,
            redirect: "follow",
        };
        fetch(apiUrl, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.status === 200) {
                        setGallery(result.data);
                        setImage(result.gallery_Image.map((img) => ({ src: img }))); // ✅ required format for Lightbox
                    }
                },
                (error) => {}
            );
    };

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
                                    className="gallery-image-r1"
                                    src={item.gallery_file.filePath + item.gallery_file.galleryImage}
                                    alt={item.categoryName}
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

                {/* ✅ New Lightbox Component */}
                <Lightbox
                    open={showModal}
                    close={() => setShowModal(false)}
                    index={indexOfImages}
                    slides={arrOfImages} // ✅ Uses the array of { src: "url" } objects
                    carousel={{ finite: false }} // enables looping
                />
            </div>
        </div>
    );
}

export default Gallery;
