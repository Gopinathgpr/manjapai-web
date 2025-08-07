import React, { useRef, useState, useEffect } from "react";
import API_URL from "../../../Config/api";
import "./social-media.css";
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
// import InstagramFeed from 'react-ig-feed';
// import 'react-ig-feed/dist/index.css';
import instagram1 from '../../../asset/images/logo-left-2.png'
function SocialMedia() {
    useEffect(() => {
        homepagesecetionone();
    }, []);
    const [instagramToken, setinstagramToken] = useState('');
    const [instagramStatus, setinstagramStatus] = useState('');
    const script = document.createElement("script")
    script.src = "https://platform.twitter.com/widgets.js"
    script.async = true
    document.body.appendChild(script)
    const homepagesecetionone = () => {
        const apiUrl = API_URL + 'HomeApi/homepagesection';
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
                    setinstagramToken(result.data.instagramToken);
                    setinstagramStatus(result.data.instagramStatus);
                }
            },
                (error) => { }
            )
    }
    return (
        <div className="social-total-section">
            <div className="container formobileonly">
                <h3 className="news-title">
                    {localStorage.getItem("language") === 'Tamil' ? <> சமூக  <span className="news-title-highlight">ஊடகங்கள்</span></> : <> Social <span className="news-title-highlight">Media</span></>}
                </h3>
                <div className="row">
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="twitter-title"><AiOutlineTwitter className="twitter-chat" /></div>
                        <div>
                            <a class="twitter-timeline" data-theme="light" href="https://twitter.com/tnpcb_manjappai?t=Fb-eqTk4yqVgvXAxHsfgCg&s=09"></a>
                        </div>
                        <p className="more-option"><a className="more-option-instagram" href="https://twitter.com/tnpcb_manjappai?t=Fb-eqTk4yqVgvXAxHsfgCg&s=09" target="_blank">
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Twitter"}
                        </a></p>
                    </div>
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="facebook-card">
                            <div className="facebook-title">
                                <BsFacebook className="" />
                            </div>
                            <div>
                                <div className="facebook-timeline">
                                    <iframe className="facebook-container" src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTnpcbOfficial%2F&tabs=timeline&width=415&height=500&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId" style={{ border: 'none', overflow: 'hidden' }} frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>
                                </div>
                            </div>
                            <p className="more-option"><a className="more-option-instagram" href="https://www.facebook.com/profile.php?id=61553377051915&mibextid=ZbWKwL" target="_blank">
                                {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Facebook"}
                            </a>
                            </p>
                        </div>
                    </div>
                    {/* <div className="col-lg-4 col-md-6 col-12">
                        <div className="instagram-title">
                            <AiFillInstagram className="" />
                        </div>
                        <div>
                            <div className="twitter-timeline">
                                <a className="instagram-title-name" href="https://www.instagram.com/tnpcb_meendum_manjappai/" target="_blank">
                                    <img className="instagram-logo" src={instagram1} alt="instagram-logo"></img> tnpcbofficial </a>
                                {instagramStatus === 1 ? <InstagramFeed token={instagramToken} /> : ""}
                            </div>
                        </div>
                        <p className="more-option"><a className="more-option-instagram" href="https://www.instagram.com/tnpcb_meendum_manjappai/" target="_blank">
                            {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Instagram"}
                        </a></p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
export default SocialMedia;