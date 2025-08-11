import React, { useEffect, useRef, useState } from "react";
import "./count.css";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import { useGetCounterMutation } from "../../../Api/CounterApi/counterApi";

function Counter({ className, ...rest }) {
  const dataFetchedRef = useRef(false);
  const [firstCounter, setFirstCounter] = useState(false);
  const [counter, setCounter] = useState([]);
  const [getCounter, { isLoading, error }] = useGetCounterMutation();

  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    getCounter()
      .unwrap()
      .then((result) => {
        if (result.status === 200) {
          setCounter(result.data);
        }
      })
      .catch((err) => {
        console.error("Counter fetch error:", err);
      });
  }, []);

  if (isLoading) {
    return <div className="loading-text">Loading counters...</div>;
  }

  if (error) {
    return <div className="error-text">Failed to load counter data. Please try again later.</div>;
  }

  return (
    <div className="total-section">
      <div className="container formobileonly">
        <div className="row">
          {counter.map((counterItem, index) => (
            <div className="col-lg-4 col-md-4 col-12" key={index}>
              <div className="total-count-card">
                <img
                  className="count-logo"
                  src={counterItem.filePath + counterItem.counterImage}
                  alt="count-logo"
                />
                <div className="count-display">
                  <h2 className="count-value">
                    <CountUp
                      {...rest}
                      start={firstCounter ? null : 0}
                      end={counterItem.countervalue}
                    >
                      {({ countUpRef }) => (
                        <ReactVisibilitySensor
                          active={!firstCounter}
                          onChange={(isVisible) => {
                            if (isVisible) {
                              setFirstCounter(true);
                            }
                          }}
                          delayedCall
                        >
                          <span className="number" ref={countUpRef} />
                        </ReactVisibilitySensor>
                      )}
                    </CountUp>
                  </h2>

                  {localStorage.getItem("language") === "Tamil" ? (
                    <p className="count-details">
                      {counterItem.tamilcounterTitle || counterItem.counterTitle}
                    </p>
                  ) : (
                    <p className="count-details">{counterItem.counterTitle}</p>
                  )}
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
