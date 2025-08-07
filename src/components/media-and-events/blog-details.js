import React, { useState, useEffect } from "react";
import "./media-and-events.css"
import { AiOutlineCalendar } from "react-icons/ai";
import { useParams } from "react-router";
import { Link, useNavigate } from "react-router-dom";
import API_URL from "../../Config/api";
import events_bg from '../../asset/images/events-bg.png'
function BlogDetails() {
        const { id } = useParams();
    useEffect(() => {
        getblogByid();
        blogList();
    }, [id]);
    const navigate = useNavigate();

    const [blog, setBlog] = useState([]);
    const blogList = () => {
        const apiUrl = API_URL + 'HomeApi/blogall';
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
                    setBlog(result.data);
                }
            },
                (error) => { }
            )
    }
    const [inputs, setInputs] = useState({
        blogTitle: "", blogShortdescription: "", blogImage: "", filePath: "", blogDescription: "", blogDate: "",
        tamilblogTitle: "", tamilblogDescription: ""
    });
    const getblogByid = () => {
        const apiUrl = API_URL + 'HomeApi/blogby_Id';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
            "blogId": id,
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
                    setInputs(values => ({ ...values, ['blogTitle']: result.data.blogTitle }))
                    setInputs(values => ({ ...values, ['tamilblogTitle']: result.data.tamilblogTitle }))
                    setInputs(values => ({ ...values, ['blogShortdescription']: result.data.blogShortdescription }))
                    setInputs(values => ({ ...values, ['blogImage']: result.data.blogImage }))
                    setInputs(values => ({ ...values, ['filePath']: result.data.filePath }))
                    setInputs(values => ({ ...values, ['blogDescription']: result.data.blogDescription }))
                    setInputs(values => ({ ...values, ['tamilblogDescription']: result.data.tamilblogDescription }))
                    setInputs(values => ({ ...values, ['blogDate']: result.data.eventDate }))
                }
                else {
                    navigate(`${process.env.PUBLIC_URL + "/404"}`);
                }
            },
                (error) => { }
            )
    }
    document.title = inputs.blogTitle + " | Meendummanjappai";
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
                            <h1 className="information-head-line">
                                {localStorage.getItem("language") === 'Tamil' ? "வெளியீடு" : "Publication"}
                                </h1>
                        </div>
                        <div className="event-block-content-section">
                            <div className="row">
                                <div className="col-lg-8 col-md-6 col-12">
                                    <div className="event-left-content-details">
                                        <img className="events-image" src={inputs.filePath + inputs.blogImage} alt=""></img>
                                        <> {localStorage.getItem("language") === 'Tamil' ?
                                            <>
                                                <h3 className="event-left-content-title">{inputs.tamilblogTitle === '' ? <>{inputs.blogTitle}</> :
                                                    <>{inputs.tamilblogTitle}</>}</h3>
                                                <p className="event-left-content-description">
                                                    {inputs.tamilblogDescription === '' ?
                                                        <div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.blogDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /> :
                                                        <div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.tamilblogDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} />
                                                    }
                                                </p>
                                            </> :
                                            <>
                                                <h3 className="event-left-content-title">{inputs.blogTitle}</h3>
                                        <p className="event-left-content-description"><div className="link-other" dangerouslySetInnerHTML={{ __html: inputs.blogDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /></p>
                                            </>
                                        }</>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-6 col-12">
                                    <div className="event-right-content-details">
                                        <h3 className="event-right-content-title">
                                            {localStorage.getItem("language") === 'Tamil' ? "பிற வெளியீடுகள்" : "Other Publications"}
                                            </h3>
                                        <div className="event-right-content-scroll" id="events">
                                            {blog.map((blog, index) => (
                                                <>
                                                <> {localStorage.getItem("language") === 'Tamil' ?
                                                        <Link to={process.env.PUBLIC_URL+'/blog/blog-block/' + `${blog.id}`}>
                                                            <p className="event-right-content-scroll-details">{blog.tamilblogTitle === '' ?
                                                                <>{blog.blogTitle}</> : <>{blog.tamilblogTitle}</>}
                                                            </p> </Link> :
                                                        <Link to={process.env.PUBLIC_URL+'/blog/blog-block/' + `${blog.id}`}>
                                                        <p className="event-right-content-scroll-details">{blog.blogTitle}</p>
                                                    </Link>
                                                    }</>
                                                    <div className="publications-and-updates-calender-section">
                                                        <AiOutlineCalendar className="recent-blog-calender-icon" />
                                                        <p className="event-right-content-calender">{new Date(blog.blogDate).toDateString()}</p>
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

export default BlogDetails;