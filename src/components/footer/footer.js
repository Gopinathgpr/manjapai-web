import React, { useState, useEffect, useRef } from "react";
import "./footer.css";
import { BsFacebook, BsHandThumbsUp } from "react-icons/bs";
import { AiFillTwitterCircle, AiOutlineInstagram } from "react-icons/ai";
import { HiBellAlert } from "react-icons/hi2";
import { Link } from "react-router-dom";
import $ from "jquery";
import API_URL from "../../Config/api";
export default function Footer() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        var addScript = document.createElement("script");
        addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        );
        document.body.appendChild(addScript);
        var addScript_jquery = document.createElement("script");
        addScript_jquery.setAttribute(
            "src",
            "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
        );
        document.body.appendChild(addScript_jquery);
        window.googleTranslateElementInit = googleTranslateElementInit;
        visitorcount();
        getcounterdetail();
    }, []);
    const [visitor, setvisitor] = useState('0');
    const [contact, setContacts] = useState({
        emailId: "", mobileemailId: ""
    });
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setContacts(values => ({ ...values, [name]: value }))
    }
    const mobilehandleSubmit = (event) => {
        event.preventDefault();
        contact.mobileemailId = contact.mobileemailId.trim();
        if (contact.mobileemailId === "") {
            document.getElementById("mobileemailId").focus();
            setContacts(values => ({ ...values, ['mobileemailId']: contact.mobileemailId }))
            return false;
        }
        else {
            setContacts(values => ({ ...values, ['mobileemailId']: contact.mobileemailId }))
        }

        if (contact.mobileemailId !== "") {
            const apiUrl = API_URL + 'HomeApi/newsletter_form';
            const myHeaders = new Headers();
            var raw = JSON.stringify({
                "token": 'MeendumManjappai',
                "emailId": contact.mobileemailId,
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
                        document.getElementById("mobileemailId").value = "";
                        document.getElementById("thanksmessage_mobile").style.display = "block";
                    }
                },
                    (error) => { }
                )
        }
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        contact.emailId = contact.emailId.trim();
        if (contact.emailId === "") {
            document.getElementById("emailId").focus();
            setContacts(values => ({ ...values, ['emailId']: contact.emailId }))
            return false;
        }
        else {
            setContacts(values => ({ ...values, ['emailId']: contact.emailId }))
        }
        if (contact.emailId !== "") {
            const apiUrl = API_URL + 'HomeApi/newsletter_form';
            const myHeaders = new Headers();
            var raw = JSON.stringify({
                "token": 'MeendumManjappai',
                "emailId": contact.emailId,
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
                        document.getElementById("emailId").value = "";
                        document.getElementById("thanksmessage").style.display = "block";
                    }
                },
                    (error) => { }
                )
        }
    }
    const getcounterdetail = () => {
        const apiUrl = API_URL + 'HomeApi/visitor_log';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
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
                    setvisitor(result.data.total);
                }
            },
                (error) => { }
            )
    }
    const visitorcount = () => {
        const apiUrl = API_URL + 'HomeApi/visitor_count';
        const myHeaders = new Headers();
        var raw = JSON.stringify({
            "token": 'MeendumManjappai',
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

                }
            },
                (error) => { }
            )
    }
    const googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
            {
                pageLanguage: "en",
                autoDisplay: false
            },
            "google_translate_element",
        );
    };
    const menugo = () => {
        $('html, body').animate({scrollTop:0}, '300');
        $(".menucolor").css({ 'border-bottom': '' });
    }
    return (
        <>
            <div className="">
                <div className="footer-bg" >
                    <div className="container formobileonly paddingsetbg">
                        <div className="row">
                            <div className="col-lg-4 col-md-4 col-12">
                                <h3 className="header-title">
                                      {localStorage.getItem("language") === 'Tamil' ? "கார்ப்பரேட் அலுவலகம்" : "Corporate Office"}
                                     </h3>
                                <p className="footer-details" >
                                    {localStorage.getItem("language") === 'Tamil' ? "தமிழ்நாடு மாசுக்கட்டுப்பாட்டு வாரியம்" : "Tamil Nadu Pollution Control Board"}
                                    </p>
                                <p className="footer-details">
                                    {localStorage.getItem("language") === 'Tamil' ? "76, மவுண்ட் சாலை, கிண்டி, சென்னை - 600 032" : "76, Mount Salai, Guindy, Chennai - 600 032"}
                                    </p>
                                <p className="footer-details">
                                    Ph : 044-22353134
                                    </p>
                                <p className="footer-details"> 
                                 {localStorage.getItem("language") === 'Tamil' ? "இடம் - " : "Location - "}
                                <a className="footer-details-link" href="https://maps.app.goo.gl/a3idYooTzusPApVL6?g_st=ic" target="_blank">
                                    {localStorage.getItem("language") === 'Tamil' ? " திசை" : "Direction"}
                                    </a>
                                </p>
                            </div>
                            <div className="col-lg-3 col-md-4 col-12">
                                <h3 className="header-title"> 
                                 {localStorage.getItem("language") === 'Tamil' ? "விரைவு இணைப்புகள்" : "QUICK LINKS"}
                                </h3>
                                <p className="footer-details" ><Link onClick={menugo} className="footer-details-link" to={process.env.PUBLIC_URL+'/'} >
                                    {localStorage.getItem("language") === 'Tamil' ? "முகப்பு" : "Home"}
                                    </Link></p>
                                <p className="footer-details"><Link onClick={menugo} className="footer-details-link" to={process.env.PUBLIC_URL+'/about/honble-chief-minister-message'} >
                                    {localStorage.getItem("language") === 'Tamil' ? "எங்களை பற்றி" : "About US"}
                                    </Link></p>
                                <p className="footer-details"><Link onClick={menugo} className="footer-details-link" to={process.env.PUBLIC_URL+'/contact-us/contact'} >
                                    {localStorage.getItem("language") === 'Tamil' ? "தொடர்பு கொள்ள" : "Contact"}
                                    </Link></p>
                                <p className="footer-details"><Link onClick={menugo} className="footer-details-link" to={process.env.PUBLIC_URL+'/media-and-events/media-gallery'} >
                                    {localStorage.getItem("language") === 'Tamil' ? "கேலரி" : "Media Gallery"}
                                    </Link></p>
                                {/* <p className="footer-details"><Link onClick={menugo} className="footer-details-link" to='/about/roles-and-responsibilities' >
                                    {localStorage.getItem("language") === 'Tamil' ? "பாத்திரங்கள் & பொறுப்புகள்" : "Roles & Responsiblities"}
                                    </Link></p> */}
                                {/* <p className="footer-details"><Link onClick={menugo} className="footer-details-link" to='/information/statutory-department' >
                                    {localStorage.getItem("language") === 'Tamil' ? "Statutory" : "Statutory"}
                                    </Link></p> */}
                            </div>
                            <div className="col-lg-4 col-md-4 col-12">
                                {/* <h3 className="header-title-subscribe margin_left20"> To Translate </h3>
                                <div id="google_translate_element" className="margin_left20"></div> */}
                                <h3 className="header-contact-title margin_left20">
                                    {localStorage.getItem("language") === 'Tamil' ? "தொடர்பு கொள்ள" : "Contact Us"}
                                    </h3>
                                <div className="social-media-logos margin_left20">
                                    <div className="social-media-fb"><a href="https://www.facebook.com/profile.php?id=61553377051915&mibextid=ZbWKwL" className="footer-icon-link" target="_blank"><BsFacebook /></a></div>
                                    <div className="social-media-twit"><a href="https://twitter.com/tnpcb_manjappai?t=Fb-eqTk4yqVgvXAxHsfgCg&s=09" className="footer-icon-link" target="_blank"><AiFillTwitterCircle /></a></div>
                                    <div className="social-media-linked"><a href="https://www.instagram.com/tnpcb_meendum_manjappai/" className="footer-icon-link" target="_blank"><AiOutlineInstagram /></a></div>
                                </div>
                                <form onSubmit={handleSubmit} autoComplete="off" className="margin_left20">
                                    <p className="footer-mail-details">{localStorage.getItem("language") === 'Tamil' ? "செய்திமடலுக்கு சந்தாதராகவும்" : "Subscribe to Newsletter"}</p>
                                    <input type="email" className="form-control-1" id="emailId" placeholder={localStorage.getItem("language") === 'Tamil' ? "மின்னஞ்சலை உள்ளிடவும்" : "Enter Email ID"} name="emailId" value={contact.emailId} onChange={handleChange}></input>
                                    <button className="subscribe-btn" ><HiBellAlert /></button>
                                    <div id="thanksmessage" style={{ display: 'none', color: 'green' }}>{localStorage.getItem("language") === 'Tamil' ? "நன்றி" : "Successfully Subscribed..."}</div>
                                </form>
                            </div>
                            {/* <div className="col-lg-3 col-md-3 col-12">
                                
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-secetion-1">
                <div className="container formobileonly">
                    <div className="row">
                        <div className="footer-last-section">
                            <div className="col-lg-8 col-md-5 col-6">
                                <p className="last-content">
                                    {localStorage.getItem("language") === 'Tamil' ? "© 2023 அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை" : "© 2023 All rights reserved"}
                                    </p>
                            </div>
                            <div className="col-lg-4 col-md-5 col-6">
                                <p className="visitor-count">
                                    
                                    {localStorage.getItem("language") === 'Tamil' ? <>பார்வையாளர் எண்ணிக்கை : <span className="">{visitor}</span></> : <>Visitor Counter : <span className="">{visitor}</span></>}
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
