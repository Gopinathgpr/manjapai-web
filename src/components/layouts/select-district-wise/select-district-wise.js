import React, { Fragment, useState, useEffect, useRef } from "react";
import "./select-district-wise.css";
import CountUp from "react-countup";
import ReactVisibilitySensor from "react-visibility-sensor";
import API_URL from "../../../Config/api";
import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { STYLES_MAP } from "../tn-map/constants";
import { MAP_JSON } from "../tn-map/constants";
import $ from "jquery";
const options = [
  { value: "Trichy", label: "Trichy" },
  { value: "Madurai", label: "Madurai" },
  { value: "Kovai", label: "Kovai" },
];
function District({ className, ...rest }) {
  const dataFetchedRef = useRef(false);
  const scale = 1300;
  const [tooltipfunction, settooltipfunction] = useState(false);
  const entertooltip = () => {
    settooltipfunction(true);
  };
  const leavetooltip = () => {
    settooltipfunction(false);
  };
  useEffect(() => {
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js"
    );
    document.body.appendChild(addScript);
    districtwiseList();
    districtdetail();
  }, []);
  const [districtfirstcounter, setDistrictFirstCounter] = useState(false);
  const [districtfirstcountervalue, setDistrictFirstCountervalue] =
    useState(178);
  const [districtsecondcounter, setDistrictSecondCounter] = useState(false);
  const [districtsecondcountervalue, setDistrictSecondCountervalue] =
    useState(20);
  const [districtthirdcounter, setDistrictThirdCounter] = useState(false);
  const [districtthirdcountervalue, setDistrictThirdCountervalue] =
    useState(650);
  const [districtfouthcounter, setDistrictFouthCounter] = useState(false);
  const [districtfouthcountervalue, setDistrictFouthCountervalue] =
    useState(270);
  const [districtfivthcounter, setDistrictFivthCounter] = useState(false);
  const [districtfivthcountervalue, setDistrictFivthCountervalue] =
    useState(300220);
  const [districtsixthcounter, setDistrictSixthCounter] = useState(false);
  const [districtsixthcountervalue, setDistrictSixthCountervalue] =
    useState(580);
  const [districtwise, setDistrictwise] = useState([]);
  const [districtName, setDistrictName] = useState("Chennai");
  const [districtDescription, setDistrictDescription] = useState("");
  const [tamildistrictName, settamilDistrictName] = useState("Chennai");
  const [tamildistrictDescription, settamilDistrictDescription] = useState("");
  const [districtArea, setdistrictArea] = useState("");
  const [districtIEC, setdistrictIEC] = useState("");
  const [districtEco, setdistrictEco] = useState("");
  const [districtEnforcemen, setdistrictEnforcemen] = useState("");
  const [districtManufacturers, setdistrictManufacturers] = useState("");
  const [districtRecyclers, setdistrictRecyclers] = useState("");
  const [EnforcemencounterTitle, setEnforcemencounterTitle] = useState("");
  const [EnforcementamilcounterTitle, setEnforcementamilcounterTitle] =
    useState("");
  const [ManufacturercounterTitle, setManufacturercounterTitle] = useState("");
  const [ManufacturertamilcounterTitle, setManufacturertamilcounterTitle] =
    useState("");
  const [RecyclerscounterTitle, setRecyclerscounterTitle] = useState("");
  const [RecyclerstamilcounterTitle, setRecyclerstamilcounterTitle] =
    useState("");
  const [districtAreacounterTitle, setdistrictAreacounterTitle] = useState("");
  const [districtAreatamilcounterTitle, setdistrictAreatamilcounterTitle] =
    useState("");
  const [ecocounterTitle, setecocounterTitle] = useState("");
  const [ecotamilcounterTitle, setecotamilcounterTitle] = useState("");
  const [ieccounterTitle, setieccounterTitle] = useState("");
  const [iectamilcounterTitle, setiectamilcounterTitle] = useState("");
  const districtdetail = () => {
    const apiUrl = API_URL + "HomeApi/district_name";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      districtName: districtName,
    });
    const options = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            setDistrictName(result.data.districtName);
            setDistrictDescription(result.data.districtDescription);
            settamilDistrictName(result.data.tamildistrictName);
            settamilDistrictDescription(result.data.tamildistrictDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
            setEnforcemencounterTitle(
              result.counterTitle.EnforcemencounterTitle
            );
            setEnforcementamilcounterTitle(
              result.counterTitle.EnforcementamilcounterTitle
            );
            setManufacturercounterTitle(
              result.counterTitle.ManufacturercounterTitle
            );
            setManufacturertamilcounterTitle(
              result.counterTitle.ManufacturertamilcounterTitle
            );
            setRecyclerscounterTitle(result.counterTitle.RecyclerscounterTitle);
            setRecyclerstamilcounterTitle(
              result.counterTitle.RecyclerstamilcounterTitle
            );
            setdistrictAreacounterTitle(
              result.counterTitle.districtAreacounterTitle
            );
            setdistrictAreatamilcounterTitle(
              result.counterTitle.districtAreatamilcounterTitle
            );
            setecocounterTitle(result.counterTitle.ecocounterTitle);
            setecotamilcounterTitle(result.counterTitle.ecotamilcounterTitle);
            setieccounterTitle(result.counterTitle.ieccounterTitle);
            setiectamilcounterTitle(result.counterTitle.iectamilcounterTitle);
          }
        },
        (error) => {}
      );
  };
  const districtwiseList = () => {
    const apiUrl = API_URL + "HomeApi/districtwise";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
    });
    const options = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            setDistrictwise(result.data);
          }
        },
        (error) => {}
      );
  };
  const [pointdistrict, setpointdistrict] = useState([80.2707, 13.0826]);
  const districtName_change = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    const apiUrl = API_URL + "HomeApi/district_name";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      districtName: value,
    });
    const options = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            setDistrictName(result.data.districtName);
            setpointdistrict([result.data.startPoint, result.data.endPoint]);
            setDistrictDescription(result.data.districtDescription);
            settamilDistrictName(result.data.tamildistrictName);
            settamilDistrictDescription(result.data.tamildistrictDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
            getdistict(result.data.districtName);
            setEnforcemencounterTitle(
              result.counterTitle.EnforcemencounterTitle
            );
            setEnforcementamilcounterTitle(
              result.counterTitle.EnforcementamilcounterTitle
            );
            setManufacturercounterTitle(
              result.counterTitle.ManufacturercounterTitle
            );
            setManufacturertamilcounterTitle(
              result.counterTitle.ManufacturertamilcounterTitle
            );
            setRecyclerscounterTitle(result.counterTitle.RecyclerscounterTitle);
            setRecyclerstamilcounterTitle(
              result.counterTitle.RecyclerstamilcounterTitle
            );
            setdistrictAreacounterTitle(
              result.counterTitle.districtAreacounterTitle
            );
            setdistrictAreatamilcounterTitle(
              result.counterTitle.districtAreatamilcounterTitle
            );
            setecocounterTitle(result.counterTitle.ecocounterTitle);
            setecotamilcounterTitle(result.counterTitle.ecotamilcounterTitle);
            setieccounterTitle(result.counterTitle.ieccounterTitle);
            setiectamilcounterTitle(result.counterTitle.iectamilcounterTitle);
          }
        },
        (error) => {}
      );
  };
  const getdistict = (districtname) => {
    $(".rsm-geography").removeClass("active");
    let setActiveClass = document.getElementById(districtname);
    console.log(setActiveClass);
    setActiveClass.classList.add("active");
    const apiUrl = API_URL + "HomeApi/district_name";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      districtName: districtname,
    });
    const options = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            districtName_change_click(districtname);
            setDistrictName(result.data.districtName);
            setDistrictDescription(result.data.districtDescription);
            settamilDistrictName(result.data.tamildistrictName);
            settamilDistrictDescription(result.data.tamildistrictDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
            setEnforcemencounterTitle(
              result.counterTitle.EnforcemencounterTitle
            );
            setEnforcementamilcounterTitle(
              result.counterTitle.EnforcementamilcounterTitle
            );
            setManufacturercounterTitle(
              result.counterTitle.ManufacturercounterTitle
            );
            setManufacturertamilcounterTitle(
              result.counterTitle.ManufacturertamilcounterTitle
            );
            setRecyclerscounterTitle(result.counterTitle.RecyclerscounterTitle);
            setRecyclerstamilcounterTitle(
              result.counterTitle.RecyclerstamilcounterTitle
            );
            setdistrictAreacounterTitle(
              result.counterTitle.districtAreacounterTitle
            );
            setdistrictAreatamilcounterTitle(
              result.counterTitle.districtAreatamilcounterTitle
            );
            setecocounterTitle(result.counterTitle.ecocounterTitle);
            setecotamilcounterTitle(result.counterTitle.ecotamilcounterTitle);
            setieccounterTitle(result.counterTitle.ieccounterTitle);
            setiectamilcounterTitle(result.counterTitle.iectamilcounterTitle);
          }
        },
        (error) => {}
      );
  };
  const districtName_change_click = (districtname) => {
    const apiUrl = API_URL + "HomeApi/district_name";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      districtName: districtname,
    });
    const options = {
      method: "POST",
      body: raw,
      headers: myHeaders,
      redirect: "follow",
    };
    fetch(apiUrl, options)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.status === 200) {
            setpointdistrict([result.data.startPoint, result.data.endPoint]);
            setDistrictDescription(result.data.districtDescription);
            setdistrictArea(result.data.districtArea);
            settamilDistrictName(result.data.tamildistrictName);
            settamilDistrictDescription(result.data.tamildistrictDescription);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
            setEnforcemencounterTitle(
              result.counterTitle.EnforcemencounterTitle
            );
            setEnforcementamilcounterTitle(
              result.counterTitle.EnforcementamilcounterTitle
            );
            setManufacturercounterTitle(
              result.counterTitle.ManufacturercounterTitle
            );
            setManufacturertamilcounterTitle(
              result.counterTitle.ManufacturertamilcounterTitle
            );
            setRecyclerscounterTitle(result.counterTitle.RecyclerscounterTitle);
            setRecyclerstamilcounterTitle(
              result.counterTitle.RecyclerstamilcounterTitle
            );
            setdistrictAreacounterTitle(
              result.counterTitle.districtAreacounterTitle
            );
            setdistrictAreatamilcounterTitle(
              result.counterTitle.districtAreatamilcounterTitle
            );
            setecocounterTitle(result.counterTitle.ecocounterTitle);
            setecotamilcounterTitle(result.counterTitle.ecotamilcounterTitle);
            setieccounterTitle(result.counterTitle.ieccounterTitle);
            setiectamilcounterTitle(result.counterTitle.iectamilcounterTitle);
          }
        },
        (error) => {}
      );
  };
  return (
    <div className="district-total-section">
      <div className="container formobileonly">
        <h5 className="district-header">
          {localStorage.getItem("language") === "Tamil" ? (
            <>
              எண்கள்{" "}
              <span className="district-header-highlight">நமக்கு என்ன </span>
              சொல்கின்றன
            </>
          ) : (
            <>
              What the{" "}
              <span className="district-header-highlight">Numbers </span>Tell Us
            </>
          )}
        </h5>
        <div className="district-search">
          <p className="district-search-title">
            {localStorage.getItem("language") === "Tamil"
              ? "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்"
              : "Select the District"}
          </p>
          <select
            id="district"
            name="district"
            className="selectdesign"
            value={districtName}
            onChange={districtName_change}
          >
            {districtwise.map((districtwise, index) => (
              <>
                {" "}
                {localStorage.getItem("language") === "Tamil" ? (
                  <option value={districtwise.districtName}>
                    {districtwise.tamildistrictName === "" ? (
                      <>{districtwise.districtName}</>
                    ) : (
                      <>{districtwise.tamildistrictName}</>
                    )}
                  </option>
                ) : (
                  <option value={districtwise.districtName}>
                    {districtwise.districtName}
                  </option>
                )}
              </>
            ))}
          </select>
        </div>
        <div className="row">
          <div className="col-lg-7 col-12">
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtsecondcounter ? null : 0}
                      end={districtArea}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtsecondcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictSecondCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {iectamilcounterTitle === "" ? (
                          <>{ieccounterTitle}</>
                        ) : (
                          <>{iectamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{ieccounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtfouthcounter ? null : 0}
                      end={districtIEC}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtfouthcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictFouthCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {EnforcementamilcounterTitle === "" ? (
                          <>{EnforcemencounterTitle}</>
                        ) : (
                          <>{EnforcementamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{EnforcemencounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtfirstcounter ? null : 0}
                      end={districtEco}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtfirstcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictFirstCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {districtAreatamilcounterTitle === "" ? (
                          <>{districtAreacounterTitle}</>
                        ) : (
                          <>{districtAreatamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{districtAreacounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtfivthcounter ? null : 0}
                      end={districtEnforcemen}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtfivthcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictFivthCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {ManufacturertamilcounterTitle === "" ? (
                          <>{ManufacturercounterTitle}</>
                        ) : (
                          <>{ManufacturertamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{ManufacturercounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-2"></div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtthirdcounter ? null : 0}
                      end={districtManufacturers}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtthirdcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictThirdCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {ecotamilcounterTitle === "" ? (
                          <>{ecocounterTitle}</>
                        ) : (
                          <>{ecotamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{ecocounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
              <div className="col-lg-5 col-md-6 col-6">
                <div className="full-district-count1">
                  <h5 className="district-count">
                    <CountUp
                      {...rest}
                      start={districtsixthcounter ? null : 0}
                      end={districtRecyclers}
                    >
                      {({ countUpRef }) => {
                        return (
                          <ReactVisibilitySensor
                            active={!districtsixthcounter}
                            onChange={(isVisible) => {
                              if (isVisible) {
                                setDistrictSixthCounter(true);
                              }
                            }}
                            delayedCall
                          >
                            <span className="number" ref={countUpRef} />
                          </ReactVisibilitySensor>
                        );
                      }}
                    </CountUp>
                  </h5>
                  <p className="district-count-details">
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        {RecyclerstamilcounterTitle === "" ? (
                          <>{RecyclerscounterTitle}</>
                        ) : (
                          <>{RecyclerstamilcounterTitle}</>
                        )}
                      </>
                    ) : (
                      <>{RecyclerscounterTitle}</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="full-card-district">
              <>
                {" "}
                {localStorage.getItem("language") === "Tamil" ? (
                  <>
                    <h5 className="district-sub-header">
                      {tamildistrictName === "" ? (
                        <>{districtName}</>
                      ) : (
                        <>{tamildistrictName}</>
                      )}
                    </h5>
                    <p className="district-details">
                      {tamildistrictDescription === "" ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: districtDescription
                              .replaceAll(/<script>/gi, "")
                              .replaceAll(/<\/script>/gi, "")
                              .replaceAll(/javascript/gi, "")
                              .replaceAll(/alert/gi, "")
                              .replaceAll(/Alert/gi, ""),
                          }}
                        />
                      ) : (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: tamildistrictDescription
                              .replaceAll(/<script>/gi, "")
                              .replaceAll(/<\/script>/gi, "")
                              .replaceAll(/javascript/gi, "")
                              .replaceAll(/alert/gi, "")
                              .replaceAll(/Alert/gi, ""),
                          }}
                        />
                      )}
                    </p>
                  </>
                ) : (
                  <>
                    <h5 className="district-sub-header">{districtName}</h5>
                    <p className="district-details">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: districtDescription
                            .replaceAll(/<script>/gi, "")
                            .replaceAll(/<\/script>/gi, "")
                            .replaceAll(/javascript/gi, "")
                            .replaceAll(/alert/gi, "")
                            .replaceAll(/Alert/gi, ""),
                        }}
                      />
                    </p>
                  </>
                )}
              </>
            </div>
          </div>
          <div className="col-lg-5 col-12">
            <center>
              <Fragment>
                <div
                  onMouseLeave={leavetooltip}
                  onMouseEnter={entertooltip}
                  id="mapcolor"
                >
                  <ComposableMap
                    projectionConfig={{ scale }}
                    width={300}
                    height={500}
                  >
                    <ZoomableGroup
                      zoom={4.4}
                      center={[78.25, 10.8]}
                      disablePanning
                    >
                      <Geographies geography={MAP_JSON}>
                        {({ geographies }) =>
                          geographies.map((geography, i) => (
                            <Geography
                              key={geography.properties.NAME}
                              id={geography.properties.district}
                              onClick={() =>
                                getdistict(`${geography.properties.district}`)
                              }
                              data-tooltip-id="map-tooltip" // ✅ New tooltip attribute
                              data-tooltip-content={`${
                                localStorage.getItem("language") === "Tamil"
                                  ? geography.properties.tamildistrict
                                  : geography.properties.district
                              }`}
                              data-tooltip-index={i}
                              geography={geography}
                              precision={0.5}
                              style={{
                                default: STYLES_MAP.default,
                                hover: STYLES_MAP.hover,
                                pressed: STYLES_MAP.pressed,
                                active: STYLES_MAP.active,
                              }}
                            />
                          ))
                        }
                      </Geographies>

                      <Annotation
                        subject={pointdistrict}
                        dx={-0}
                        dy={-0}
                        connectorProps={{
                          stroke: "#FF5533",
                          strokeWidth: 3,
                          strokeLinecap: "round",
                        }}
                      >
                        <text
                          x="-1"
                          textAnchor="end"
                          alignmentBaseline="middle"
                          fill="#F53"
                          style={{ fontSize: "4px" }}
                        ></text>
                      </Annotation>
                    </ZoomableGroup>
                  </ComposableMap>

                  {/* ✅ Updated Tooltip (react-tooltip v5) */}
                  {tooltipfunction && <Tooltip id="map-tooltip" />}
                </div>
              </Fragment>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
}
export default District;
