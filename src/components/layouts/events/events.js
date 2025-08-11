import React from "react";
import "./events.css";
import { Link } from "react-router-dom";
import { MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { useGetHomeEventsQuery } from "../../../Api/EventsApi/eventsApi";
import EventSkeleton from "../../common/EventSkeleton";

function Events() {
  const {
    data: events = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useGetHomeEventsQuery();

  return (
    <div className="events-total-section">
      <div className="container formobileonly">
        <h3 className="events-title">
          {localStorage.getItem("language") === "Tamil" ? "நிகழ்வுகள்" : "Events"}
        </h3>

        {/* Error State */}
        {isError && (
          <div className="text-center text-danger my-4">
            <p>
              {localStorage.getItem("language") === "Tamil"
                ? "நிகழ்வுகளை ஏற்ற முடியவில்லை. பின்னர் முயற்சிக்கவும்."
                : `Failed to load events: ${error?.status || "Unknown error"}`}
            </p>
            <button className="btn btn-warning" onClick={refetch}>
              Retry
            </button>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <Swiper
            modules={[Navigation]}
            spaceBetween={20}
            slidesPerView={3}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {[...Array(3)].map((_, index) => (
              <SwiperSlide key={index}>
                <EventSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Data State */}
        {!isLoading && !isError && events.length > 0 && (
          <Swiper
            modules={[Navigation, Autoplay]}
            navigation
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
            spaceBetween={20}
            breakpoints={{
              1024: { slidesPerView: 3 },
              768: { slidesPerView: 2 },
              480: { slidesPerView: 1 },
            }}
          >
            {events.map((eventItem, index) => (
              <SwiperSlide key={index}>
                <Link
                  to={`${process.env.PUBLIC_URL}/events/event-block/${eventItem.id}`}
                >
                  <div className="main-event-card-list">
                    <img
                      className="events-image1"
                      src={eventItem.filePath + eventItem.eventImage}
                      alt={eventItem.eventTitle}
                    />
                    <div className="events-month-date">
                      <h6 className="events-month">{eventItem.event_Month}</h6>
                      <h3 className="events-date">{eventItem.event_Date}</h3>
                      <h6 className="events-month">{eventItem.event_year}</h6>
                    </div>
                    <div className="full-card-event">
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <h5 className="events-header">
                            {eventItem.tamileventTitle || eventItem.eventTitle}
                          </h5>
                          <p className="events-details">
                            {eventItem.tamileventShortdescription ||
                              eventItem.eventShortdescription}
                          </p>
                        </>
                      ) : (
                        <>
                          <h5 className="events-header">
                            {eventItem.eventTitle}
                          </h5>
                          <p className="events-details">
                            {eventItem.eventShortdescription}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        <div className="events-page">
          <button className="view-more-btn">
            <Link
              className="events-page-link"
              to={process.env.PUBLIC_URL + "/media-and-events/events-media"}
            >
              {localStorage.getItem("language") === "Tamil"
                ? "மேலும் பார்க்க"
                : "View More"}
              <MdArrowForward style={{ margin: "0 0 0 10px" }} />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Events;
