import React, { useState, useEffect, useRef } from "react";
import "./count.css";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import API_URL from "../../../Config/api";
function Counter({ className, ...rest }) {
    const dataFetchedRef = useRef(false);
    const [firstcounter, setFirstCounter] = useState(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        counterList();
    }, []);
    const [counter, setCounter] = useState([]);
    const counterList = () => {
        const apiUrl = API_URL + 'HomeApi/counter';
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
                    setCounter(result.data);
                }
            },
                (error) => { }
            )
    }
    return (
        <div className="total-section">
            <div className="container formobileonly">

                <div className="row">
                    {counter.map((counter, index) => (
                        <div className="col-lg-4 col-md-4 col-12">
                            <div className="total-count-card">
                                <img className="count-logo" src={counter.filePath + counter.counterImage} alt="count-logo"></img>
                                <div className="count-display">
                                    <h2 className="count-value">
                                        <CountUp {...rest} start={firstcounter ? null : 0} end={counter.countervalue}>
                                            {({ countUpRef }) => {
                                                return (
                                                    <ReactVisibilitySensor
                                                        active={!firstcounter}
                                                        onChange={(isVisible) => {
                                                            if (isVisible) {
                                                                setFirstCounter(true);
                                                            }
                                                        }}
                                                        delayedCall
                                                    >
                                                        <span className="number" ref={countUpRef} />
                                                    </ReactVisibilitySensor>
                                                );
                                            }}
                                        </CountUp>
                                    </h2>
                                    <> {localStorage.getItem("language") === 'Tamil' ?
                                        <p className="count-details">{counter.tamilcounterTitle === '' ? <>{counter.counterTitle}</> : <>{counter.tamilcounterTitle}</>}
                                        </p> :
                                        <p className="count-details">
                                            {counter.counterTitle}
                                        </p>}</>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Counter;