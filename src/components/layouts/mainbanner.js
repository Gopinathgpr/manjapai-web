import React, { useEffect, useRef, useState } from "react";
import "./mainbanner.css";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useGetBannersMutation, useGetMarqueesMutation } from "../../Api/BannerApi/bannerApi";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import BannerSkeleton from "../common/BannerSkeleton";


function ImageSlider() {
  const dataFetchedRef = useRef(false);
  const [banner, setBanner] = useState([]);
  const [marquee, setMarquee] = useState([]);
  const [bannerError, setBannerError] = useState(null);
  const [marqueeError, setMarqueeError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [getBanners] = useGetBannersMutation();
  const [getMarquees] = useGetMarqueesMutation();

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    setIsLoading(true);

    Promise.all([
      getBanners().unwrap().catch((err) => {
        setBannerError(err?.error || "Failed to load banners");
        return null;
      }),
      getMarquees().unwrap().catch((err) => {
        setMarqueeError(err?.error || "Failed to load marquees");
        return null;
      }),
    ]).then(([bannerRes, marqueeRes]) => {
      if (bannerRes?.status === 200) {
        setBanner(bannerRes.data);
      }
      if (marqueeRes?.status === 200) {
        setMarquee(marqueeRes.data);
      }
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return (
      <div className="largedeviceonly">
        <BannerSkeleton width="100%" height={400} />
      </div>
    );
  }

  if (bannerError || marqueeError) {
    return (
      <div className="error-text">
        {bannerError && <p>Error loading banners: {bannerError}</p>}
        {marqueeError && <p>Error loading marquees: {marqueeError}</p>}
      </div>
    );
  }

  const renderMarquee = (deviceType) => (
    <Marquee speed={deviceType === "mobile" ? 50 : 30} pauseOnHover direction="right" gradient={false}>
      {marquee.map((item, index) => (
        <div key={index} style={{ marginRight: deviceType === "mobile" ? "40px" : "50px" }}>
          {localStorage.getItem("language") === "Tamil" ? (
            <span>
              {item.tamilmarqueeTitle || item.marqueeTitle}
              &nbsp;&nbsp;
              {item.marqueeLink && (
                <Link className="marqueeLink" to={item.marqueeLink} target="_blank">
                  இங்கே கிளிக் செய்யவும்
                </Link>
              )}
            </span>
          ) : (
            <span>
              {item.marqueeTitle}
              &nbsp;&nbsp;
              {item.marqueeLink && (
                <Link className="marqueeLink" to={item.marqueeLink} target="_blank">
                  Click Here
                </Link>
              )}
            </span>
          )}
        </div>
      ))}
    </Marquee>
  );

  return (
    <>
      {/* Desktop */}
      <div className="largedeviceonly">
        <div className="highlight-marquee">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 5000 }}
            effect="fade"
            loop={true}
            speed={100}
            fadeEffect={{ crossFade: true }}
          >
            {banner.map((b, index) => (
              <SwiperSlide key={index}>
                <img
                  className="banner"
                  src={b.filePath + b.bannerdesktopImage}
                  alt={`Banner ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="banner-title-bgcolor" style={{zIndex: 999}}>
            <div className="container formobileonly">
              <h3 className="banner-title">Meendum Manjappai</h3>
              <p className="banner-content">
                A People's Campaign Against Throwaway Plastics
              </p>
            </div>
          </div>
        </div>

        <div className="marquee-text" style={{ overflow: "hidden" }}>
          {renderMarquee("desktop")}
        </div>
      </div>

      {/* Mobile */}
      <div className="smalldeviceonly">
        <div className="highlight-marquee-mobile">
          <Swiper
            modules={[Autoplay, EffectFade]}
            autoplay={{ delay: 5000 }}
            effect="fade"
            loop={true}
            speed={100}
            fadeEffect={{ crossFade: true }}
          >
            {banner.map((b, index) => (
              <SwiperSlide key={index}>
                <img
                  className="banner"
                  src={b.filePath + b.bannermobileImage}
                  alt={`Banner ${index + 1}`}
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="banner-title-bgcolor">
            <div className="container formobileonly">
              <h3 className="banner-title">Meendum Manjappai</h3>
              <p className="banner-content">
                A People's Campaign Against Throwaway Plastics
              </p>
            </div>
          </div>
        </div>

        <div className="marquee-text-mobile" style={{ height: "25px", overflow: "hidden" }}>
          {renderMarquee("mobile")}
        </div>
      </div>
    </>
  );
}

export default ImageSlider;
