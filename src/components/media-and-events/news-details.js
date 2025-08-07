import React, { useState, useEffect } from "react";
import "./media-and-events.css"
import { AiOutlineCalendar } from "react-icons/ai";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../Config/api";
import events_bg from '../../asset/images/events-bg.png'
function NewsDetails() {
    const { id } = useParams();
    useEffect(() => {
        getnewsByid();
        newsList();
    }, [id]);
    const navigate = useNavigate();

    const [news, setNews] = useState([]);
    const newsList = () => {
        const apiUrl = API_URL + 'HomeApi/newsall';
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
                    setNews(result.data);
                }
            },
                (error) => { }
            )
    }
    const [inputs, setInputs] = useState({
        newsTitle: "", newsShortdescription: "", newsImage: "", filePath: "", newsDescription: "", newsDate: "",
        tamilnewsTitle: "", tamilnewsDescription: ""
    });
    const getnewsByid = () => {
        const apiUrl = API_URL + 'HomeApi/newsby_Id';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
            "newsId": id,
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
                    setInputs(values => ({ ...values, ['newsTitle']: result.data.newsTitle }))
                    setInputs(values => ({ ...values, ['tamilnewsTitle']: result.data.tamilnewsTitle }))
                    setInputs(values => ({ ...values, ['newsShortdescription']: result.data.newsShortdescription }))
                    setInputs(values => ({ ...values, ['newsImage']: result.data.newsImage }))
                    setInputs(values => ({ ...values, ['filePath']: result.data.filePath }))
                    setInputs(values => ({ ...values, ['newsDescription']: result.data.newsDescription }))
                    setInputs(values => ({ ...values, ['tamilnewsDescription']: result.data.tamilnewsDescription }))
                    setInputs(values => ({ ...values, ['newsDate']: result.data.eventDate }))
                }
                else {
                    navigate(`${process.env.PUBLIC_URL + "/404"}`);
                }
            },
                (error) => { }
            )
    }
    document.title = inputs.newsTitle + " | Meendummanjappai";
    document.querySelectorAll('.link-other a')
        .forEach(function (elem) {
            elem.setAttribute('target', '_blank');
        })
    return (
        <>
            <div>
                <div className="information-header">
                    <div>
                        <img className="information-bg-image" src={events_bg} alt="Rules-bg-image" />
                    </div>
                    <div className="container formobileonly">
                        <div className="container information-title-card">
                            <h1 className="information-head-line event-title-card">{localStorage.getItem("language") === 'Tamil' ? "செய்திகள்" : "News"}</h1>
                        </div>
                        <div className="event-block-content-section">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 col-12">
                                    <div className="event-left-content-details">
                                        <img className="events-image" src={inputs.filePath + inputs.newsImage} alt=""></img>
                                        <> {localStorage.getItem("language") === 'Tamil' ?
                                            <>
                                                <h3 className="event-left-content-title">
                                                    {inputs.tamilnewsTitle === '' ? <>{inputs.newsTitle}</> : <>{inputs.tamilnewsTitle}</>}
                                                </h3>
                                                <div className="event-left-content-description editor-class content-text-change">
                                                    {inputs.tamilnewsDescription === '' ?
                                                        <div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.newsDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /> :
                                                        <div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.tamilnewsDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} />
                                                    }
                                                </div>
                                            </> :
                                            <>
                                                <h3 className="event-left-content-title">
                                                    {inputs.newsTitle}
                                                </h3>
                                                <div className="event-left-content-description editor-class content-text-change"><div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.newsDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /></div>
                                            </>
                                        }</>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="event-right-content-details">
                                        <h3 className="event-right-content-title">{localStorage.getItem("language") === 'Tamil' ? "கடந்த செய்திகள்" : "Past News"}</h3>
                                        <div className="event-right-content-scroll" id="events">
                                            {news.map((news, index) => (
                                                <>
                                                    <Link to={process.env.PUBLIC_URL+'/news/news-block/' + `${news.id}`}>
                                                        <> {localStorage.getItem("language") === 'Tamil' ?

                                                            <p className="event-right-content-scroll-details">
                                                                {news.tamilnewsTitle === '' ? <>{news.newsTitle}</> : <>{news.tamilnewsTitle}</>}
                                                            </p> :
                                                            <p className="event-right-content-scroll-details">
                                                                {news.newsTitle}
                                                            </p>

                                                        }</>
                                                    </Link>
                                                    <div className="news-and-updates-calender-section">
                                                        <AiOutlineCalendar className="recent-news-calender-icon" />
                                                        <p className="event-right-content-calender">{new Date(news.newsDate).toDateString()}</p>
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

export default NewsDetails;