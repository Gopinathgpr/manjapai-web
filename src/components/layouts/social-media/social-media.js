import React, { useEffect, useState } from "react";
import API_URL from "../../../Config/api";
import "./social-media.css";
import { AiOutlineTwitter, AiFillInstagram } from 'react-icons/ai';
import { BsFacebook } from 'react-icons/bs';
import { InstagramEmbed } from 'react-social-media-embed';
import instagram1 from '../../../asset/images/logo-left-2.png';

function SocialMedia() {
    const [instagramStatus, setinstagramStatus] = useState('');
    
    useEffect(() => {
        loadTwitterScript();
        fetchInstagramStatus();
    }, []);

    const loadTwitterScript = () => {
        const script = document.createElement("script");
        script.src = "https://platform.twitter.com/widgets.js";
        script.async = true;
        document.body.appendChild(script);
    };

    const fetchInstagramStatus = async () => {
        try {
            const apiUrl = API_URL + 'HomeApi/homepagesection';
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ token: 'MeendumManjappai' }),
            });

            const result = await response.json();
            if (result.status === 200) {
                setinstagramStatus(result.data.instagramStatus);
            }
        } catch (error) {
            console.error("Error fetching Instagram status:", error);
        }
    };

    return (
        <div className="social-total-section">
            <div className="container formobileonly">
                <h3 className="news-title">
                    {localStorage.getItem("language") === 'Tamil' ? <> சமூக  <span className="news-title-highlight">ஊடகங்கள்</span></> : <> Social <span className="news-title-highlight">Media</span></>}
                </h3>
                <div className="row">
                    {/* Twitter */}
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="twitter-title"><AiOutlineTwitter className="twitter-chat" /></div>
                        <div>
                            <a className="twitter-timeline" data-theme="light" href="https://twitter.com/tnpcb_manjappai?t=Fb-eqTk4yqVgvXAxHsfgCg&s=09"></a>
                        </div>
                        <p className="more-option">
                            <a className="more-option-instagram" href="https://twitter.com/tnpcb_manjappai?t=Fb-eqTk4yqVgvXAxHsfgCg&s=09" target="_blank" rel="noopener noreferrer">
                                {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Twitter"}
                            </a>
                        </p>
                    </div>

                    {/* Facebook */}
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="facebook-card">
                            <div className="facebook-title"><BsFacebook /></div>
                            {/* <div className="facebook-timeline">
                                <iframe
                                    className="facebook-container"
                                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FTnpcbOfficial%2F&tabs=timeline&width=415&height=500&small_header=false&adapt_container_width=false&hide_cover=false&show_facepile=true&appId"
                                    style={{ border: 'none', overflow: 'hidden' }}
                                    frameBorder="0"
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                    allowFullScreen
                                    title="Facebook"
                                ></iframe>
                            </div> */}
                            <p className="more-option">
                                <a className="more-option-instagram" href="https://www.facebook.com/profile.php?id=61553377051915&mibextid=ZbWKwL" target="_blank" rel="noopener noreferrer">
                                    {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Facebook"}
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Instagram */}
                    <div className="col-lg-4 col-md-6 col-12">
                        <div className="instagram-title"><AiFillInstagram /></div>
                        <div className="twitter-timeline">
                            <a className="instagram-title-name" href="https://www.instagram.com/tnpcb_meendum_manjappai/" target="_blank" rel="noopener noreferrer">
                                <img className="instagram-logo" src={instagram1} alt="instagram-logo" /> tnpcbofficial
                            </a>
                            {instagramStatus === 1 && (
                                <InstagramEmbed
                                    url="https://www.instagram.com/p/C7ftozapC1N/" // Example post. You can use dynamic logic if needed
                                    width={328}
                                />
                            )}
                        </div>
                        <p className="more-option">
                            <a className="more-option-instagram" href="https://www.instagram.com/tnpcb_meendum_manjappai/" target="_blank" rel="noopener noreferrer">
                                {localStorage.getItem("language") === 'Tamil' ? "மேலும் அறியவும்" : "Visit Instagram"}
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SocialMedia;
