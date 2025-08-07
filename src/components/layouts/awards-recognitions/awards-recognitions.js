import React, { useState, useEffect, useRef } from "react";
import "./awards-recognitions.css";
import API_URL from "../../../Config/api";
import Slider from "react-slick";
function Awards() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        awardsList();
    }, []);
    const [awards, setawards] = useState([]);
    const [recognitions, setRecognitions] = useState([]);
    const awardsList = () => {
        const apiUrl = API_URL + 'HomeApi/awards_home';
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
                    setawards(result.data_awards);
                    setRecognitions(result.data_recognitions);
                }
            },
                (error) => { }
            )
    }
    const settings = {
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false,
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
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
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
        <div className="awards-total-section">
            <div className="container formobileonly">
                <h3 className="awards-title">
                    {localStorage.getItem("language") === 'Tamil' ? "விருதுகள் மற்றும் அங்கீகாரங்கள்" : "Awards & Recognitions"}
                </h3>
                <div className="row">
                    <div className="col-6 split-border">
                        <Slider {...settings}>
                            {awards.map((awards, index) => (
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="total-awards">
                                        <img className="awards-image" src={awards.filePath + awards.awardImage} alt=""></img>
                                        <p className="awards-content">
                                            {localStorage.getItem("language") === 'Tamil' ? <>{awards.tamilawardsTitle === '' ? <>{awards.awardTitle}</> : <>{awards.tamilawardsTitle}</>}
                                            </> :
                                                <>{awards.awardTitle}</>}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                        <span className="split-border-center"></span>
                    </div>
                    <div className="col-6 split-border-right">
                        <Slider {...settings}>
                            {recognitions.map((awards, index) => (
                                <div className="col-lg-3 col-md-6 col-12">
                                    <div className="total-awards">
                                        <img className="awards-image" src={awards.filePath + awards.awardImage} alt=""></img>
                                        <p className="awards-content">

                                            {localStorage.getItem("language") === 'Tamil' ? <>{awards.tamilawardsTitle === '' ? <>{awards.awardTitle}</> : <>{awards.tamilawardsTitle}</>}
                                            </> :
                                                <>{awards.awardTitle}</>}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Awards;