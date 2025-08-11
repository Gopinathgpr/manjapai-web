import React, { useEffect, useRef, useState } from "react";
import "./news.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import {
  useGetInternationalNewsMutation,
  useGetNationalNewsMutation,
  useGetStateNewsMutation,
} from "../../../Api/NewsApi/newsApi";

function News() {
  const lang = localStorage.getItem("language");
  const isTamil = lang === "Tamil";

  const [internationalNews, setInternationalNews] = useState([]);
  const [nationalNews, setNationalNews] = useState([]);
  const [stateNews, setStateNews] = useState([]);

  const [getInternationalNews, { isLoading: intlLoading, isError: intlError }] = useGetInternationalNewsMutation();
  const [getNationalNews, { isLoading: natlLoading, isError: natlError }] = useGetNationalNewsMutation();
  const [getStateNews, { isLoading: stateLoading, isError: stateError }] = useGetStateNewsMutation();

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getInternationalNews()
      .unwrap()
      .then((res) => res.status === 200 && setInternationalNews(res.data))
      .catch(console.error);

    getNationalNews()
      .unwrap()
      .then((res) => res.status === 200 && setNationalNews(res.data))
      .catch(console.error);

    getStateNews()
      .unwrap()
      .then((res) => res.status === 200 && setStateNews(res.data))
      .catch(console.error);
  }, []);

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

  const truncate = (text, maxLen) => (text.length > maxLen ? `${text.substring(0, maxLen)}...` : text);

  const renderNewsCard = (news) => {
    const newsTitle = isTamil
      ? news.tamilnewsTitle || truncate(news.newsTitle, 60)
      : truncate(news.newsTitle, 60);

    const newsDesc = isTamil
      ? news.tamilnewsShortdescription || truncate(news.newsShortdescription, 90)
      : truncate(news.newsShortdescription, 90);

    return (
      <div key={news.newsId}>
        {news.newsLink && (
          <a href={news.newsLink} target="_blank" rel="noopener noreferrer">
            <img
              className="news-image"
              src={news.filePath + news.newsImage}
              alt={newsTitle}
            />
            <div className="full-card">
              <p className="news-date">{new Date(news.newsDate).toDateString()}</p>
              <h5 className="news-header">{truncate(newsTitle, isTamil ? 30 : 60)}</h5>
              <p className="news-details">{truncate(newsDesc, isTamil ? 30 : 90)}</p>
              <button className="read-more-btn">
                {isTamil ? "மேலும் படிக்க" : "Read More"}
              </button>
              <hr />
            </div>
          </a>
        )}
      </div>
    );
  };

  const renderNewsSection = (title, newsArray, isLoading, isError) => (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="title-news">{title}</div>
      <div className="scrollbar">
        {isLoading ? (
          <p className="text-center">{isTamil ? "ஏற்றுகிறது..." : "Loading..."}</p>
        ) : isError ? (
          <p className="text-danger text-center">
            {isTamil ? "செய்திகளை ஏற்ற முடியவில்லை" : "Failed to load news"}
          </p>
        ) : (
          <Slider {...settings}>
            {newsArray.map((news) => renderNewsCard(news))}
          </Slider>
        )}
      </div>
      <p className="more-option">
        <Link className="more-option" to={`${process.env.PUBLIC_URL}/media-and-events/latest-news-and-updates`}>
          {isTamil ? "மேலும் அறியவும்" : "Find Out More"}
        </Link>
      </p>
    </div>
  );

  return (
    <div className="news-total-section">
      <div className="container formobileonly">
        <h3 className="news-title">
          {isTamil ? (
            <>சமீபத்திய <span className="news-title-highlight">செய்திகள்</span></>
          ) : (
            <>Latest <span className="news-title-highlight">News</span></>
          )}
        </h3>
        <div className="row">
          {renderNewsSection(isTamil ? "சர்வதேச" : "INTERNATIONAL", internationalNews, intlLoading, intlError)}
          {renderNewsSection(isTamil ? "தேசிய" : "NATIONAL", nationalNews, natlLoading, natlError)}
          {renderNewsSection(isTamil ? "மாநில" : "STATE", stateNews, stateLoading, stateError)}
        </div>
      </div>
    </div>
  );
}

export default News;
