import React, { useState, useEffect, useRef } from "react";
import "./videos.css";
import Slider from "react-slick";
import { MdArrowForward } from "react-icons/md";
import API_URL from "../../../Config/api";
function Videos() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        videolist();
    }, []);
    const [video, setVideo] = useState([]);
    const videolist = () => {
        const apiUrl = API_URL + 'HomeApi/video_home';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
        });
        const options = {
            method: 'POST',
            body: raw,
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(apiUrl, options)
            .then(res => res.json())
            .then((result) => {
                if (result.status === 200) {
                    setVideo(result.data);
                    console.log(result.data)
                }
            },
                (error) => { }
            )
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#0F64B9", borderRadius: "100%" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#0F64B9", borderRadius: "100%" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: false,
        // autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    return (
        <div className="videos-total-section">
            <div className="container formobileonly">
                <h3 className="videos-title">
                    {localStorage.getItem("language") === 'Tamil' ? "வீடியோக்கள்" : "Videos"}
                </h3>
                <div className="row">
                    <Slider {...settings}>
                        {video.map((video, index) => (
                            <div className="col-lg-6 col-md-6 col-12">
                                <div className="total-videos-area">
                                    {video.videoImage !== '' ? <video className="pcb-tn-platics-video"
                                        src={video.filePath + video.videoImage}
                                        muted
                                        autoPlay={"autoplay"}
                                        preLoad="auto"
                                        loop
                                    ></video> : <div dangerouslySetInnerHTML={{ __html: video.videofullLink.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} />
                                    }
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
                <div className="view-more">
                    <button className="view-more-btn"><a href="https://www.youtube.com/@tnpcboffice7983" target="_blank">
                        {localStorage.getItem("language") === 'Tamil' ? "மேலும் பார்க்க" : "View More"}
                        <MdArrowForward style={{ margin: '0 0 0 10px' }} /></a> </button>
                </div>
            </div>
        </div>
    );
}
export default Videos;