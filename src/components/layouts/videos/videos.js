import React from "react";
import "./videos.css";
import { MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetVideosQuery } from "../../../Api/VideosApi/videosApi";
import VideoSkeleton from "../../common/VideoSkeleton";


function Videos() {
  const { data, error, isLoading, isError } = useGetVideosQuery();
  const videos = data?.data || [];

  if (isError) {
    return (
      <div className="videos-total-section">
        Error loading videos: {error?.error || "Unknown error"}
      </div>
    );
  }

  return (
    <div className="videos-total-section">
      <div className="container formobileonly">
        <h3 className="videos-title">
          {localStorage.getItem("language") === "Tamil" ? "வீடியோக்கள்" : "Videos"}
        </h3>

        <Swiper
          modules={[Navigation, Autoplay]}
          navigation
          autoplay={false}
          loop
          spaceBetween={20}
          breakpoints={{
            480: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
        >
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => (
                <SwiperSlide key={index}>
                  <VideoSkeleton />
                </SwiperSlide>
              ))
            : videos.map((video, index) => (
                <SwiperSlide key={index}>
                  <div className="total-videos-area">
                    {video.videoImage ? (
                      <video
                        className="pcb-tn-platics-video"
                        src={video.filePath + video.videoImage}
                        muted
                        autoPlay
                        loop
                        preload="auto"
                      />
                    ) : (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: video.videofullLink
                            .replaceAll(/<script>/gi, "")
                            .replaceAll(/<\/script>/gi, "")
                            .replaceAll(/javascript/gi, "")
                            .replaceAll(/alert/gi, "")
                            .replaceAll(/Alert/gi, ""),
                        }}
                      />
                    )}
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>

        <div className="view-more">
          <button className="view-more-btn">
            <a
              href="https://www.youtube.com/@tnpcboffice7983"
              target="_blank"
              rel="noreferrer"
            >
              {localStorage.getItem("language") === "Tamil" ? "மேலும் பார்க்க" : "View More"}
              <MdArrowForward style={{ marginLeft: 10 }} />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Videos;
