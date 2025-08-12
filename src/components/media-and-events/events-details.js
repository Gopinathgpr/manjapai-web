import React from "react";
import "./media-and-events.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { useParams, Link, useNavigate } from "react-router-dom";
import events_bg from "../../asset/images/events-bg.png";
import AllEventsSkeleton from "../common/AllEventsSkeleton";
import { useGetEventByIdQuery, useGetEventListQuery } from "../../Api/AllEvents/allEventsApi";


function EventsDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: eventData,
    error: eventError,
    isLoading: eventLoading,
    isError: eventHasError,
  } = useGetEventByIdQuery(id);

  const {
    data: eventListData,
    error: listError,
    isLoading: listLoading,
    isError: listHasError,
  } = useGetEventListQuery(id);

  React.useEffect(() => {
    if (eventHasError && eventError?.status === 404) {
      navigate(`${process.env.PUBLIC_URL}/404`);
    }
  }, [eventHasError, eventError, navigate]);

  if (eventLoading || listLoading) {
    return (
      <div className="container mt-4">
        <AllEventsSkeleton />
      </div>
    );
  }

  if (eventHasError || listHasError) {
    return (
      <div className="container mt-4 text-center">
        <h3>Something went wrong</h3>
        <p>{eventError?.data?.message || listError?.data?.message || "Please try again later."}</p>
      </div>
    );
  }

  const inputs = eventData?.data || {};
  const eventList = eventListData?.data || [];

  document.title = inputs.eventTitle + " | Meendummanjappai";

  return (
    <div>
      <div className="information-header">
        <div>
          <img className="information-bg-image" src={events_bg} alt="Rules-bg-image" />
        </div>
        <div className="container formobileonly">
          <div className="container information-title-card">
            <h1 className="information-head-line event-title-card">
              {localStorage.getItem("language") === "Tamil" ? "நிகழ்வுகள்" : "Events"}
            </h1>
          </div>
          <div className="event-block-content-section">
            <div className="row">
              {/* Left Content */}
              <div className="col-lg-8 col-md-6 col-12">
                <div className="event-left-content-details">
                  <img
                    className="events-image"
                    src={inputs.filePath + inputs.eventImage}
                    alt=""
                  />
                  {localStorage.getItem("language") === "Tamil" ? (
                    <>
                      <h3 className="event-left-content-title">
                        {inputs.tamileventTitle || inputs.eventTitle}
                      </h3>
                      <p className="event-left-content-description">
                        <div
                          dangerouslySetInnerHTML={{
                            __html: (inputs.tamileventDescription || inputs.eventDescription)
                              .replaceAll(/<script>/gi, "")
                              .replaceAll(/<\/script>/gi, "")
                              .replaceAll(/javascript/gi, "")
                              .replaceAll(/alert/gi, "")
                              .replaceAll(/Alert/gi, ""),
                          }}
                        />
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="event-left-content-title">{inputs.eventTitle}</h3>
                      <p className="event-left-content-description">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: inputs.eventDescription
                              ?.replaceAll(/<script>/gi, "")
                              .replaceAll(/<\/script>/gi, "")
                              .replaceAll(/javascript/gi, "")
                              .replaceAll(/alert/gi, "")
                              .replaceAll(/Alert/gi, ""),
                          }}
                        />
                      </p>
                    </>
                  )}
                </div>
                <div className="view-photo">
                  <button className="view-photo-btn">
                    <Link to={`${process.env.PUBLIC_URL}/events/media-gallery/${inputs.albumId}`}>
                      {localStorage.getItem("language") === "Tamil" ? "மேலும் பார்க்க" : "View Photos"}
                      <MdArrowForward style={{ margin: "0 0 0 10px" }} />
                    </Link>
                  </button>
                </div>
              </div>

              {/* Right Content */}
              <div className="col-lg-4 col-md-6 col-12">
                <div className="event-right-content-details">
                  <h3 className="event-right-content-title">
                    {localStorage.getItem("language") === "Tamil" ? "கடந்த நிகழ்வுகள்" : "Past Events"}
                  </h3>
                  <div className="event-right-content-scroll" id="events">
                    {eventList.map((event) => (
                      <div key={event.id}>
                        {localStorage.getItem("language") === "Tamil" ? (
                          <Link to={`${process.env.PUBLIC_URL}/events/event-block/${event.id}`}>
                            <p className="event-right-content-scroll-details">
                              {event.tamileventTitle || event.eventTitle}
                            </p>
                          </Link>
                        ) : (
                          <Link to={`${process.env.PUBLIC_URL}/events/event-block/${event.id}`}>
                            <p className="event-right-content-scroll-details">{event.eventTitle}</p>
                          </Link>
                        )}
                        <div className="news-and-updates-calender-section">
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="event-right-content-calender">
                            {new Date(event.eventDate).toDateString()}
                          </p>
                        </div>
                        <hr className="hr-line" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
}

export default EventsDetails;
