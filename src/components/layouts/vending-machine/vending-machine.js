import React, { useRef, useState, useEffect } from "react";
import "./vending-machine.css";
import API_URL from "../../../Config/api";
function Machine() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        homepagesecetiontwo();
    }, []);
    const [sectiontwoTitle, setSectiontwoTitle] = useState('');
    const [sectiontwoDescription, setSectiontwoDescription] = useState('');
    const [tamilsectiontwoTitle, settamilSectiontwoTitle] = useState('');
    const [tamilsectiontwoDescription, settamilSectiontwoDescription] = useState('');
    const [sectiontwoImage, setSectiontwoImage] = useState('');
    const [filePath, setFilePath] = useState('');
    const homepagesecetiontwo = () => {
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
                    setSectiontwoTitle(result.data.sectiontwoTitle);
                    setSectiontwoDescription(result.data.sectiontwoDescription);
                    settamilSectiontwoTitle(result.data.tamilsectiontwoTitle);
                    settamilSectiontwoDescription(result.data.tamilsectiontwoDescription);
                    setSectiontwoImage(result.data.sectiontwoImage);
                    setFilePath(result.data.filePath);
                }
            },
                (error) => { }
            )
    }
    return (
        <div className="machine-total-section">
            <div className="container formobileonly">
                <div className="row">
                    <div className="col-lg-7 col-md-6 col-12">
                        <div className="full-card-machine">
                            <> {localStorage.getItem("language") === 'Tamil' ?
                                <>
                                    <h5 className="machine-header">{tamilsectiontwoTitle === '' ? <>{sectiontwoTitle}</> : <>{tamilsectiontwoTitle}</>}</h5>
                                    <p className="animation-details">
                                        {tamilsectiontwoDescription === '' ?
                                            <div dangerouslySetInnerHTML={{ __html: sectiontwoDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /> :
                                            <div dangerouslySetInnerHTML={{ __html: tamilsectiontwoDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} />
                                        }
                                    </p>
                                </> :
                                <>
                                    <h5 className="machine-header">
                                        {sectiontwoTitle}
                                    </h5>
                                    <p className="animation-details"><div dangerouslySetInnerHTML={{ __html: sectiontwoDescription.replaceAll(/<script>/gi, "").replaceAll(/<\/script>/gi, "").replaceAll(/javascript/gi, "").replaceAll(/alert/gi, "").replaceAll(/Alert/gi, "") }} /></p>
                                </>
                            }</>
                        </div>
                    </div>
                    <div className="col-lg-5 col-md-6 col-12">
                        <video className="manjapai-machine-video"
                            src={filePath + sectiontwoImage}
                            muted
                            autoPlay={"autoplay"}
                            preLoad="auto"
                            loop
                        ></video>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Machine;