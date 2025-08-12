import React, { useEffect, useRef, useState } from "react";
import "./news.css";
import { Link } from "react-router-dom";
import {
  useGetInternationalNewsMutation,
  useGetNationalNewsMutation,
  useGetStateNewsMutation,
} from "../../../Api/NewsApi/newsApi";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import NewsCardLoader from "../../common/NewsCardLoader";


function News() {
  const lang = localStorage.getItem("language");
  const isTamil = lang === "Tamil";

  const [internationalNews, setInternationalNews] = useState([]);
  const [nationalNews, setNationalNews] = useState([]);
  const [stateNews, setStateNews] = useState([]);

  const [getInternationalNews, { isLoading: intlLoading, isError: intlError }] =
    useGetInternationalNewsMutation();
  const [getNationalNews, { isLoading: natlLoading, isError: natlError }] =
    useGetNationalNewsMutation();
  const [getStateNews, { isLoading: stateLoading, isError: stateError }] =
    useGetStateNewsMutation();

  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    Promise.all([
      getInternationalNews().unwrap(),
      getNationalNews().unwrap(),
      getStateNews().unwrap(),
    ])
      .then(([intlRes, natlRes, stateRes]) => {
        if (intlRes.status === 200) setInternationalNews(intlRes.data || []);
        if (natlRes.status === 200) setNationalNews(natlRes.data || []);
        if (stateRes.status === 200) setStateNews(stateRes.data || []);
      })
      .catch(console.error);
  }, []);

  const truncate = (text, maxLen) =>
    text?.length > maxLen ? `${text.substring(0, maxLen)}...` : text || "";

  const renderNewsCard = (news) => {
    const newsTitle = isTamil
      ? news.tamilnewsTitle || truncate(news.newsTitle, 60)
      : truncate(news.newsTitle, 60);

    const newsDesc = isTamil
      ? news.tamilnewsShortdescription ||
        truncate(news.newsShortdescription, 90)
      : truncate(news.newsShortdescription, 90);

    return (
      <div key={news.newsId || `${news.newsTitle}-${Math.random()}`}>
        <a
          href={news.newsLink || "#"}
          target={news.newsLink ? "_blank" : "_self"}
          rel="noopener noreferrer"
        >
          <img
            className="news-image"
            src={`${news.filePath || ""}${news.newsImage || ""}`}
            alt={newsTitle || "News"}
          />
          <div className="full-card">
            <p className="news-date">
              {news.newsDate
                ? new Date(news.newsDate).toDateString()
                : ""}
            </p>
            <h5 className="news-header">
              {truncate(newsTitle, isTamil ? 30 : 60)}
            </h5>
            <p className="news-details">
              {truncate(newsDesc, isTamil ? 30 : 90)}
            </p>
            <button className="read-more-btn">
              {isTamil ? "மேலும் படிக்க" : "Read More"}
            </button>
            <hr />
          </div>
        </a>
      </div>
    );
  };

  const renderNewsSection = (title, newsArray, isLoading, isError) => (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="title-news">{title}</div>
      <div className="scrollbar">
        {isLoading ? (
          <>
            <NewsCardLoader />
            <NewsCardLoader />
            <NewsCardLoader />
          </>
        ) : isError ? (
          <p className="text-danger text-center">
            {isTamil ? "செய்திகளை ஏற்ற முடியவில்லை" : "Failed to load news"}
          </p>
        ) : (
          <Swiper
            modules={[Autoplay]}
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            speed={100}
            loop={true}
          >
            {newsArray.map((news) => (
              <SwiperSlide key={news.newsId || `${news.newsTitle}-${Math.random()}`}>
                {renderNewsCard(news)}
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      <p className="more-option">
        <Link
          className="more-option"
          to={`${process.env.PUBLIC_URL}/media-and-events/latest-news-and-updates`}
        >
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
            <>
              சமீபத்திய <span className="news-title-highlight">செய்திகள்</span>
            </>
          ) : (
            <>
              Latest <span className="news-title-highlight">News</span>
            </>
          )}
        </h3>
        <div className="row">
          {renderNewsSection(
            isTamil ? "சர்வதேச" : "INTERNATIONAL",
            internationalNews,
            intlLoading,
            intlError
          )}
          {renderNewsSection(
            isTamil ? "தேசிய" : "NATIONAL",
            nationalNews,
            natlLoading,
            natlError
          )}
          {renderNewsSection(
            isTamil ? "மாநில" : "STATE",
            stateNews,
            stateLoading,
            stateError
          )}
        </div>
      </div>
    </div>
  );
}

export default News;
