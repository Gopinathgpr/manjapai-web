import React, { useState, useEffect, useRef } from "react";
import "./news.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import API_URL from "../../../Config/api";
function News() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        internationalList();
        nationalList();
        stateList();
    }, []);
    const [internationnews, setInternationnews] = useState([]);
    const [nationnews, setNationnews] = useState([]);
    const [statenews, setStatenews] = useState([]);
    const internationalList = () => {
        const apiUrl = API_URL + 'HomeApi/internationalnews';
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
                    setInternationnews(result.data);
                }
            },
                (error) => { }
            )
    }
    const nationalList = () => {
        const apiUrl = API_URL + 'HomeApi/nationalnews';
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
                    setNationnews(result.data);
                }
            },
                (error) => { }
            )
    }
    const stateList = () => {
        const apiUrl = API_URL + 'HomeApi/statenews';
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
                    setStatenews(result.data);
                }
            },
                (error) => { }
            )
    }
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        pauseOnHover: true,
        swipeToSlide: true,
        autoplay: true,
        speed: 100,
        autoplaySpeed: 8000,
        cssEase: "linear",
    };
    return (
        <div className="news-total-section">
            <div className="container formobileonly">
                <h3 className="news-title">
                    {localStorage.getItem("language") === 'Tamil' ? <> சமீபத்திய  <span className="news-title-highlight">செய்திகள்</span></> : <> Latest <span className="news-title-highlight">News</span></>}
                </h3>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="title-news">
                            {localStorage.getItem("language") === 'Tamil' ? "சர்வதேச" : "INTERNATIONAL"}
                        </div>
                        <div className="scrollbar">
                            <Slider {...settings}>
                                {internationnews.map((internationnews, index) => (
                                    <div>
                                        {internationnews.newsLink !== '' ? <a href={internationnews.newsLink} target="_blank">
                                            <img className="news-image" src={internationnews.filePath + internationnews.newsImage} alt=""></img>
                                            <div className="full-card">
                                                <p className="news-date">{new Date(internationnews.newsDate).toDateString()}</p>
                                                <> {localStorage.getItem("language") === 'Tamil' ?
                                                    <><h5 className="news-header">{internationnews.tamilnewsTitle === '' ? <>{internationnews.newsTitle.length > 60 ? `${internationnews.newsTitle.substring(0, 60)}...` : internationnews.newsTitle}</> : <>{internationnews.tamilnewsTitle.length > 30 ? `${internationnews.tamilnewsTitle.substring(0, 30)}...` : internationnews.tamilnewsTitle}</>}
                                                    </h5><p className="news-details">{internationnews.tamilnewsShortdescription === '' ?
                                                        <>{internationnews.newsShortdescription.length > 90 ? `${internationnews.newsShortdescription.substring(0, 90)}...` : internationnews.newsShortdescription}</> :
                                                        <>
                                                            {internationnews.tamilnewsShortdescription.length > 30 ? `${internationnews.tamilnewsShortdescription.substring(0, 30)}...` : internationnews.tamilnewsShortdescription}</>}
                                                        </p></> :
                                                    <>
                                                        <h5 className="news-header">
                                                            {internationnews.newsTitle.length > 60 ? `${internationnews.newsTitle.substring(0, 60)}...` : internationnews.newsTitle}
                                                        </h5>
                                                        <p className="news-details">
                                                            {internationnews.newsShortdescription.length > 90 ? `${internationnews.newsShortdescription.substring(0, 90)}...` : internationnews.newsShortdescription}
                                                        </p>
                                                    </>
                                                }</>
                                                <button className="read-more-btn">
                                                    {localStorage.getItem("language") === 'Tamil' ? "மேலும் படிக்க" : "Read More"}
                                                </button>
                                                <hr></hr>
                                            </div>
                                        </a> : ""}
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <p className="more-option"><Link className="more-option" to={process.env.PUBLIC_URL+'/media-and-events/latest-news-and-updates'}>
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Find Out More"}
                        </Link></p>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="title-news">
                            {localStorage.getItem("language") === 'Tamil' ? "தேசிய" : "NATIONAL"}
                        </div>
                        <div className="scrollbar">
                            <Slider {...settings}>
                                {nationnews.map((nationnews, index) => (
                                    <div>
                                        {nationnews.newsLink !== '' ? <a href={nationnews.newsLink} target="_blank">
                                            <img className="news-image" src={nationnews.filePath + nationnews.newsImage} alt=""></img>
                                            <div className="full-card">
                                                <p className="news-date">{new Date(nationnews.newsDate).toDateString()}</p>
                                                <> {localStorage.getItem("language") === 'Tamil' ?
                                                    <><h5 className="news-header">{nationnews.tamilnewsTitle === '' ? <>{nationnews.newsTitle.length > 60 ? `${nationnews.newsTitle.substring(0, 60)}...` : nationnews.newsTitle}</> : <>{nationnews.tamilnewsTitle.length > 30 ? `${nationnews.tamilnewsTitle.substring(0, 30)}...` : nationnews.tamilnewsTitle}</>}
                                                    </h5><p className="news-details">{nationnews.tamilnewsShortdescription === '' ?
                                                        <>{nationnews.newsShortdescription.length > 90 ? `${nationnews.newsShortdescription.substring(0, 90)}...` : nationnews.newsShortdescription}</> :
                                                        <>
                                                            {nationnews.tamilnewsShortdescription.length > 30 ? `${nationnews.tamilnewsShortdescription.substring(0, 30)}...` : nationnews.tamilnewsShortdescription}
                                                        </>}
                                                        </p></> :
                                                    <>
                                                        <h5 className="news-header">
                                                            {nationnews.newsTitle.length > 60 ? `${nationnews.newsTitle.substring(0, 60)}...` : nationnews.newsTitle}
                                                        </h5>
                                                        <p className="news-details">
                                                            {nationnews.newsShortdescription.length > 90 ? `${nationnews.newsShortdescription.substring(0, 90)}...` : nationnews.newsShortdescription}
                                                        </p>
                                                    </>
                                                }</>
                                                <button className="read-more-btn">
                                                    {localStorage.getItem("language") === 'Tamil' ? "மேலும் படிக்க" : "Read More"}
                                                </button>
                                                <hr></hr>
                                            </div>
                                        </a> : ""}
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <p className="more-option"><Link className="more-option" to={process.env.PUBLIC_URL+'/media-and-events/latest-news-and-updates'}>
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Find Out More"}
                        </Link></p>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="title-news">
                            {localStorage.getItem("language") === 'Tamil' ? "மாநில" : "STATE"}
                        </div>
                        <div className="scrollbar">
                            <Slider {...settings}>
                                {statenews.map((statenews, index) => (
                                    <div>
                                        {statenews.newsLink !== '' ? <a href={statenews.newsLink} target="_blank">
                                            <img className="news-image" src={statenews.filePath + statenews.newsImage} alt=""></img>
                                            <div className="full-card">
                                                <p className="news-date">{new Date(statenews.newsDate).toDateString()}</p>
                                                <> {localStorage.getItem("language") === 'Tamil' ?
                                                    <><h5 className="news-header">{statenews.tamilnewsTitle === '' ? <>{statenews.newsTitle.length > 60 ? `${statenews.newsTitle.substring(0, 60)}...` : statenews.newsTitle}</> : <>{statenews.tamilnewsTitle.length > 30 ? `${statenews.tamilnewsTitle.substring(0, 30)}...` : statenews.tamilnewsTitle}</>}
                                                    </h5><p className="news-details">{statenews.tamilnewsShortdescription === '' ?
                                                        <>{statenews.newsShortdescription.length > 90 ? `${statenews.newsShortdescription.substring(0, 90)}...` : statenews.newsShortdescription}</> :
                                                        <>
                                                            {statenews.tamilnewsShortdescription.length > 30 ? `${statenews.tamilnewsShortdescription.substring(0, 30)}...` : statenews.tamilnewsShortdescription}
                                                        </>}
                                                        </p></> :
                                                    <>
                                                        <h5 className="news-header">
                                                            {statenews.newsTitle.length > 60 ? `${statenews.newsTitle.substring(0, 60)}...` : statenews.newsTitle}
                                                        </h5>
                                                        <p className="news-details">
                                                            {statenews.newsShortdescription.length > 90 ? `${statenews.newsShortdescription.substring(0, 90)}...` : statenews.newsShortdescription}
                                                        </p>
                                                    </>
                                                }</>
                                                <button className="read-more-btn">
                                                    {localStorage.getItem("language") === 'Tamil' ? "மேலும் படிக்க" : "Read More"}
                                                </button>
                                                <hr></hr>
                                            </div>
                                        </a> : ""}
                                    </div>
                                ))}
                            </Slider>
                        </div>
                        <p className="more-option"><Link className="more-option" to={process.env.PUBLIC_URL+'/media-and-events/latest-news-and-updates'}>
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Find Out More"}
                        </Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default News;