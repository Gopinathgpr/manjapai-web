import React, { useState, useEffect, useRef } from "react";
import "./mainbanner.css";
import { Link } from "react-router-dom";
import API_URL from "../../Config/api";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
function ImageSlider() {
  const dataFetchedRef = useRef(false);
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    marqueeList();
    bannerList();
  }, []);

  const [banner, setBanner] = useState([]);
  const [marquee, setMarquee] = useState([]);

  const bannerList = () => {
    const apiUrl = API_URL + "HomeApi/banner";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
    });
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
            console.log(result.data);
            setBanner(result.data);
          }
        },
        (error) => {}
      );
  };
  const marqueeList = () => {
    const apiUrl = API_URL + "HomeApi/marquee";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
    });
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
            setMarquee(result.data);
            console.log(result.data);
          }
        },
        (error) => {}
      );
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    swipeToSlide: true,
    autoplay: true,
    speed: 100,
    autoplaySpeed: 5000,
    fade: true,
    cssEase: "linear",
  };

  return (
    <>
      <div className="largedeviceonly">
        <div className="highlight-marquee">
          <Slider {...settings}>
            {banner.map((banner, index) => (
              <img
                className="banner"
                src={banner.filePath + banner.bannerdesktopImage}
                alt="Slider"
              />
            ))}
          </Slider>
          <div className="banner-title-bgcolor">
            <div className="container formobileonly">
              <h3 className="banner-title">Meendum Manjappai</h3>
              <p className="banner-content">
                A People's Campaign Against Throwaway Plastics
              </p>
            </div>
          </div>
        </div>
        <div
          className="marquee-text"
          style={{overflow: "hidden" }}
        >
          <Marquee
            speed={30}
            pauseOnHover={true}
            direction="right" // because reverse=true
            gradient={false} // removes fading effect if you don't want it
          >
            {marquee.map((item, index) => (
              <div key={index} style={{ marginRight: "50px" }}>
                {localStorage.getItem("language") === "Tamil" ? (
                  <span>
                    {item.tamilmarqueeTitle !== ""
                      ? item.tamilmarqueeTitle
                      : item.marqueeTitle}
                    &nbsp;&nbsp;
                    {item.marqueeLink !== "" && (
                      <Link
                        className="marqueeLink"
                        to={item.marqueeLink}
                        target="_blank"
                      >
                        இங்கே கிளிக் செய்யவும்
                      </Link>
                    )}
                  </span>
                ) : (
                  <span>
                    {item.marqueeTitle}
                    &nbsp;&nbsp;
                    {item.marqueeLink !== "" && (
                      <Link
                        className="marqueeLink"
                        to={item.marqueeLink}
                        target="_blank"
                      >
                        Click Here
                      </Link>
                    )}
                  </span>
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
      <div className="smalldeviceonly">
        <div className="highlight-marquee-mobile">
          <Slider {...settings}>
            {banner.map((banner, index) => (
              // <div>
              <img
                className="banner"
                src={banner.filePath + banner.bannermobileImage}
                alt="Slider"
              />
              // </div>
            ))}
          </Slider>
          <div className="banner-title-bgcolor">
            <div className="container formobileonly">
              <h3 className="banner-title">Meendum Manjappai</h3>
              <p className="banner-content">
                A People's Campaign Against Throwaway Plastics
              </p>
            </div>
          </div>
        </div>
        <div
          className="marquee-text-mobile"
          style={{ height: "25px", overflow: "hidden" }}
        >
          <Marquee
            speed={50} // Equivalent to duration=15000 (adjust as needed)
            pauseOnHover={true}
            direction="right" // Because reverse={true}
            gradient={false} // To keep it clean like your original
          >
            {marquee.map((item, index) => (
              <div key={index} style={{ marginRight: "40px" }}>
                {localStorage.getItem("language") === "Tamil" ? (
                  <span>
                    {item.tamilmarqueeTitle !== ""
                      ? item.tamilmarqueeTitle
                      : item.marqueeTitle}
                    &nbsp;&nbsp;
                    {item.marqueeLink !== "" && (
                      <Link
                        className="marqueeLink"
                        to={item.marqueeLink}
                        target="_blank"
                      >
                        இங்கே கிளிக் செய்யவும்
                      </Link>
                    )}
                  </span>
                ) : (
                  <span>
                    {item.marqueeTitle}
                    &nbsp;&nbsp;
                    {item.marqueeLink !== "" && (
                      <Link
                        className="marqueeLink"
                        to={item.marqueeLink}
                        target="_blank"
                      >
                        Click Here
                      </Link>
                    )}
                  </span>
                )}
              </div>
            ))}
          </Marquee>
        </div>
      </div>
    </>
  );
}
export default ImageSlider;
