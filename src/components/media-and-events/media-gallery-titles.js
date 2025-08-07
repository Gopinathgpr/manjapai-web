import React, { useState, useEffect } from "react";
import "./media-and-events.css";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import API_URL from "../../Config/api";
import media_bg from "../../asset/images/media-bg.png";
import Pagination from "react-js-pagination";

function Gallerylist() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [activePage, setactivePage] = useState(1);
    const [show, setshow] = useState(15);
    const [pageRangeDisplayed] = useState(5);
    const [totalItemsCount, settotalItemsCount] = useState("");
    const [itemsCountPerPage, setitemsCountPerPage] = useState(15);

    const [indexOfImages, setIndexOfImages] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const [gallery, setGallery] = useState([]);
    const [arrOfImages, setImage] = useState([]);

    useEffect(() => {
        galleryList();
    }, []);

    const openModalAndSetIndex = (index) => {
        setIndexOfImages(index);
        setShowModal(true);
    };

    const fetchGallery = (bodyData) => {
        const apiUrl = API_URL + "HomeApi/gallerybyId";
        const myHeaders = new Headers();
        const options = {
            method: "POST",
            body: JSON.stringify(bodyData),
            headers: myHeaders,
            redirect: "follow",
        };

        fetch(apiUrl, options)
            .then((res) => res.json())
            .then(
                (result) => {
                    if (result.data === null) {
                        navigate(`${process.env.PUBLIC_URL + "/404"}`);
                        return;
                    }
                    if (result.status === 200) {
                        setGallery(result.data);
                        setactivePage(result.activePage);
                        setitemsCountPerPage(result.itemsCountPerPage);
                        settotalItemsCount(result.totalItemsCount);
                        setImage(result.gallery_Image.map((img) => ({ src: img }))); // ✅ format for Lightbox
                    } else {
                        navigate(`${process.env.PUBLIC_URL + "/404"}`);
                    }
                },
                (error) => {}
            );
    };

    const galleryList = () => {
        fetchGallery({
            token: "MeendumManjappai",
            categoryId: id,
            show: show,
            activePage: activePage,
        });
    };

    const showChange = (event) => {
        const value = event.target.value;
        setshow(value);
        fetchGallery({
            token: "MeendumManjappai",
            categoryId: id,
            show: value,
            activePage: activePage,
        });
    };

    const handlePageChange = (pageNumber) => {
        setactivePage(pageNumber);
        fetchGallery({
            token: "MeendumManjappai",
            categoryId: id,
            show: show,
            activePage: pageNumber,
        });
    };

    return (
        <>
            <div className="information-header">
                <div>
                    <img className="information-bg-image" src={media_bg} alt="Rules-bg-image" />
                </div>
                <div className="container formobileonly">
                    <div className="container information-title-card">
                        <h1 className="information-head-line event-title-card">
                            {localStorage.getItem("language") === "Tamil" ? "மீடியா கேலரி" : "Media Gallery"}
                        </h1>
                        <div className="title-card-navigation menu-changes-events"></div>
                    </div>

                    <div className="media-gallery-content-section">
                        <div className="row">
                            {/* Dropdown for show count */}
                            <div className="col-lg-12 col-md-12">
                                <div className="mb-3">
                                    <label htmlFor="choices-multiple-remove-button" className="form-label text-muted">
                                        {localStorage.getItem("language") === "Tamil" ? "காட்டும்" : "Show By"}
                                    </label>
                                    <select className="form-select mb-3" onChange={showChange} value={show}>
                                        <option value="15">15</option>
                                        <option value="30">30</option>
                                        <option value="45">45</option>
                                        <option value="60">60</option>
                                        <option value="75">75</option>
                                        <option value="90">90</option>
                                    </select>
                                </div>
                            </div>

                            {/* Gallery Images */}
                            {gallery.map((item, index) => (
                                <div key={index} className="col-lg-4">
                                    <img
                                        className="media-gallery-image-details"
                                        onClick={() => openModalAndSetIndex(index)}
                                        src={item.filePath + item.galleryImage}
                                        alt=""
                                    />
                                </div>
                            ))}

                            {/* Pagination */}
                            <div className="col-lg-12 col-md-12">
                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <Pagination
                                            activePage={activePage}
                                            itemsCountPerPage={itemsCountPerPage}
                                            totalItemsCount={totalItemsCount}
                                            pageRangeDisplayed={pageRangeDisplayed}
                                            onChange={handlePageChange}
                                            itemClass="page-item"
                                            linkClass="page-link"
                                        />
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <b className="pullright">
                                            Showing {activePage} to {itemsCountPerPage} of {totalItemsCount} entries
                                        </b>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ✅ New Lightbox Component */}
                    <Lightbox
                        open={showModal}
                        close={() => setShowModal(false)}
                        index={indexOfImages}
                        slides={arrOfImages} // ✅ Now works with yet-another-react-lightbox
                        carousel={{ finite: false }}
                    />
                </div>
            </div>
        </>
    );
}

export default Gallerylist;
