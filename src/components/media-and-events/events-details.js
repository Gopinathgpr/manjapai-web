import React, { useState, useEffect } from "react";
import "./media-and-events.css"
import { AiOutlineCalendar } from "react-icons/ai";
import { MdArrowForward } from "react-icons/md";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../Config/api";
import events_bg from '../../asset/images/events-bg.png'
function EventsDetails() {
    const { id } = useParams();
    useEffect(() => {
        geteventByid();
        eventList();
    }, [id]);
    const navigate = useNavigate();
    const [event, setEvent] = useState([]);
    const eventList = () => {
        const apiUrl = API_URL + 'HomeApi/event_all';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
            "categoryId": id,
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
                    setEvent(result.data);
                }
            },
                (error) => { }
            )
    }
    const [inputs, setInputs] = useState({
        eventTitle: "", eventShortdescription: "", eventImage: "", filePath: "", eventDescription: "", eventDate: "", albumId: "",
        tamileventTitle: "", tamileventDescription: ""
    });
    const geteventByid = () => {
        const apiUrl = API_URL + 'HomeApi/eventby_Id';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
            "eventId": id,
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
                if (result.data === null) {
                    navigate(`${process.env.PUBLIC_URL + "/404"}`);
                }
                if (result.status === 200) {
                    setInputs(values => ({ ...values, ['eventTitle']: result.data.eventTitle }))
                    setInputs(values => ({ ...values, ['tamileventTitle']: result.data.tamileventTitle }))
                    setInputs(values => ({ ...values, ['eventShortdescription']: result.data.eventShortdescription }))
                    setInputs(values => ({ ...values, ['eventImage']: result.data.eventImage }))
                    setInputs(values => ({ ...values, ['filePath']: result.data.filePath }))
                    setInputs(values => ({ ...values, ['eventDescription']: result.data.eventDescription }))
                    setInputs(values => ({ ...values, ['tamileventDescription']: result.data.tamileventDescription }))
                    setInputs(values => ({ ...values, ['eventDate']: result.data.eventDate }))
                    setInputs(values => ({ ...values, ['albumId']: result.data.albumId }))
                }
                else {
                    navigate(`${process.env.PUBLIC_URL + "/404"}`);
                }
            },
                (error) => { }
            )
    }
    document.title = inputs.eventTitle + " | Meendummanjappai";
    return (
        <>
            <div>
                <div className="information-header">
                    <div>
                        <img className="information-bg-image" src={events_bg} alt="Rules-bg-image" />
                    </div>
                    <div className="container formobileonly">
                        <div className="container information-title-card">
                            <h1 className="information-head-line event-title-card">{localStorage.getItem("language") === 'Tamil' ? "நிகழ்வுகள்" : "Events"}</h1>
                        </div>
                        <div className="event-block-content-section">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 col-12">
                                    <div className="event-left-content-details">
                                        <img className="events-image" src={inputs.filePath + inputs.eventImage} alt=""></img>
                                        <> {localStorage.getItem("language") === 'Tamil' ?
                                            <>
                                                <h3 className="event-left-content-title">{inputs.tamileventTitle === '' ? <>{inputs.eventTitle}</> :
                                                    <>{inputs.tamileventTitle}</>}</h3>
                                                <p className="event-left-content-description">
                                                    {inputs.tamileventDescription === '' ?
                                                        <div dangerouslySetInnerHTML={{ __html: inputs.eventDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /> :
                                                        <div dangerouslySetInnerHTML={{ __html: inputs.tamileventDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} />
                                                    }
                                                </p>
                                            </> :
                                            <>
                                                <h3 className="event-left-content-title">{inputs.eventTitle}</h3>
                                                <p className="event-left-content-description"><span dangerouslySetInnerHTML={{ __html: inputs.eventDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /></p>
                                            </>
                                        }</>
                                    </div>
                                    <div className="view-photo">
                                        <button className="view-photo-btn">
                                            <Link to={process.env.PUBLIC_URL+'/events/media-gallery/' + `${inputs.albumId}`}>
                                                {localStorage.getItem("language") === 'Tamil' ? "மேலும் பார்க்க" : "View Photos"}
                                                <MdArrowForward style={{ margin: '0 0 0 10px' }} /></Link>
                                        </button>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="event-right-content-details">
                                        <h3 className="event-right-content-title">{localStorage.getItem("language") === 'Tamil' ? "கடந்த நிகழ்வுகள்" : "Past Events"}</h3>
                                        <div className="event-right-content-scroll" id="events">
                                            {event.map((event, index) => (
                                                <>
                                                    <> {localStorage.getItem("language") === 'Tamil' ?
                                                        <Link to={process.env.PUBLIC_URL+'/events/event-block/' + `${event.id}`}>
                                                            <p className="event-right-content-scroll-details">{event.tamileventTitle == '' ?
                                                                <>{event.eventTitle}</> : <>{event.tamileventTitle}</>}
                                                            </p> </Link> :
                                                        <Link to={process.env.PUBLIC_URL+'/events/event-block/' + `${event.id}`}>
                                                            <p className="event-right-content-scroll-details">{event.eventTitle}</p>
                                                        </Link>
                                                    }</>
                                                    <div className="news-and-updates-calender-section">
                                                        <AiOutlineCalendar className="recent-blog-calender-icon" />
                                                        <p className="event-right-content-calender">{new Date(event.eventDate).toDateString()}</p>
                                                    </div>
                                                    <hr className="hr-line"></hr>
                                                </>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
export default EventsDetails;