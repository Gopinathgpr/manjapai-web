import React, { useState, useEffect, useRef } from "react";
import "./events.css";
import { Link } from "react-router-dom";
import API_URL from "../../../Config/api";
import { MdArrowForward } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

function Events() {
    const dataFetchedRef = useRef(false);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        eventList();
    }, []);

    const eventList = () => {
        const apiUrl = API_URL + 'HomeApi/event_home';
        const myHeaders = new Headers();
        var raw = JSON.stringify({ "token": 'MeendumManjappai' });
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
                    setEvent(result.data);
                }
            }, (error) => { });
    };

    return (
        <div className="events-total-section">
            <div className="container formobileonly">
                <h3 className="events-title">
                    {localStorage.getItem("language") === 'Tamil' ? "நிகழ்வுகள்" : "Events"}
                </h3>

                {/* Swiper Slider */}
                <Swiper
                    modules={[Navigation, Autoplay]}
                    navigation
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={20}
                    slidesPerView={3}
                    breakpoints={{
                        1024: { slidesPerView: 3 },
                        768: { slidesPerView: 2 },
                        480: { slidesPerView: 1 }
                    }}
                >
                    {event.map((eventItem, index) => (
                        <SwiperSlide key={index}>
                            <Link to={`${process.env.PUBLIC_URL}/events/event-block/${eventItem.id}`}>
                                <div className="main-event-card-list">
                                    <div>
                                        <img className="events-image1" src={eventItem.filePath + eventItem.eventImage} alt="" />
                                    </div>
                                    <div className="events-month-date">
                                        <h6 className="events-month">{eventItem.event_Month}</h6>
                                        <h3 className="events-date">{eventItem.event_Date}</h3>
                                        <h6 className="events-month">{eventItem.event_year}</h6>
                                    </div>
                                    <div className="full-card-event">
                                        {localStorage.getItem("language") === 'Tamil' ? (
                                            <>
                                                <h5 className="events-header">
                                                    {eventItem.tamileventTitle === '' ?
                                                        (eventItem.eventTitle.length > 60 ? `${eventItem.eventTitle.substring(0, 60)}...` : eventItem.eventTitle) :
                                                        (eventItem.tamileventTitle.length > 40 ? `${eventItem.tamileventTitle.substring(0, 40)}...` : eventItem.tamileventTitle)}
                                                </h5>
                                                <p className="events-details">
                                                    {eventItem.tamileventShortdescription === '' ?
                                                        (eventItem.eventShortdescription.length > 170 ? `${eventItem.eventShortdescription.substring(0, 170)}...` : eventItem.eventShortdescription) :
                                                        (eventItem.tamileventShortdescription.length > 100 ? `${eventItem.tamileventShortdescription.substring(0, 100)}...` : eventItem.tamileventShortdescription)}
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h5 className="events-header">
                                                    <Link to={`${process.env.PUBLIC_URL}/events/event-block/${eventItem.id}`}>
                                                        {eventItem.eventTitle.length > 60 ? `${eventItem.eventTitle.substring(0, 60)}...` : eventItem.eventTitle}
                                                    </Link>
                                                </h5>
                                                <p className="events-details">
                                                    {eventItem.eventShortdescription.length > 170 ? `${eventItem.eventShortdescription.substring(0, 170)}...` : eventItem.eventShortdescription}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="events-page">
                    <button className="view-more-btn">
                        <Link className="events-page-link" to={process.env.PUBLIC_URL + '/media-and-events/events-media'}>
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் பார்க்க" : "View More"}
                            <MdArrowForward style={{ margin: '0 0 0 10px' }} />
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Events;
