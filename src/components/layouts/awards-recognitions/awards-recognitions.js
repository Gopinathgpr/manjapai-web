import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "./awards-recognitions.css";
import { useGetAwardsHomeQuery } from "../../../Api/AwardsApi/awardsApi";

function Awards() {
  const { data, error, isLoading, isFetching } = useGetAwardsHomeQuery();

  if (isLoading || isFetching) {
    return <div className="loading">Loading awards...</div>;
  }

  if (error) {
    return (
      <div className="error">
        Failed to load awards. Please try again later.
      </div>
    );
  }

  const { awards, recognitions } = data || { awards: [], recognitions: [] };

  const language = localStorage.getItem("language");

  const renderAwardSlide = (item) => (
    <div className="total-awards">
      <img
        className="awards-image"
        src={item.filePath + item.awardImage}
        alt=""
      />
      <p className="awards-content">
        {language === "Tamil"
          ? item.tamilawardsTitle || item.awardTitle
          : item.awardTitle}
      </p>
    </div>
  );

  return (
    <div className="awards-total-section">
      <div className="container formobileonly">
        <h3 className="awards-title">
          {language === "Tamil"
            ? "விருதுகள் மற்றும் அங்கீகாரங்கள்"
            : "Awards & Recognitions"}
        </h3>

        <div className="row">
          <div className="col-6 split-border">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              loop={true}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                1024: { slidesPerView: 2 },
                768: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
              }}
            >
              {awards.map((award, index) => (
                <SwiperSlide key={index}>{renderAwardSlide(award)}</SwiperSlide>
              ))}
            </Swiper>
            <span className="split-border-center"></span>
          </div>

          <div className="col-6 split-border-right">
            <Swiper
              modules={[Autoplay]}
              autoplay={{ delay: 3000 }}
              loop={true}
              spaceBetween={10}
              slidesPerView={2}
              breakpoints={{
                1024: { slidesPerView: 2 },
                768: { slidesPerView: 1 },
                480: { slidesPerView: 1 },
              }}
            >
              {recognitions.map((recognition, index) => (
                <SwiperSlide key={index}>
                  {renderAwardSlide(recognition)}
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
