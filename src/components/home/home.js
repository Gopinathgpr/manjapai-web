import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Mainbanner from "../layouts/mainbanner";
import Count from "../layouts/total-count-block/count";
import News from "../layouts/latest-news/news";
import Awards from "../layouts/awards-recognitions/awards-recognitions";
import Departments from "../layouts/related-govt-departments/related-govt-departments";
import Gallery from "../layouts/gallery/gallery";
import Videos from "../layouts/videos/videos";
import Events from "../layouts/events/events";
import Machine from "../layouts/vending-machine/vending-machine";
import "../layouts/animation-video-meendum-manjapai/animation-video-meendum-manjapai.css";
import District from "../layouts/select-district-wise/select-district-wise";
import {
  MdCircle,
  MdArrowForward,
  MdOutlineVideoLibrary,
} from "react-icons/md";
import API_URL from "../../Config/api";
import SocialMedia from "../layouts/social-media/social-media";
function Home() {
  document.title = "Home | Meendummanjappai";
  useEffect(() => {
    homepagesecetionone();
    announcement();
    watchnew();
  }, []);
  const [sectiononeTitle, setSectiononeTitle] = useState("");
  const [sectiononeDescription, setSectiononeDescription] = useState("");
  const [tamilsectiononeTitle, settamilSectiononeTitle] = useState("");
  const [tamilsectiononeDescription, settamilSectiononeDescription] =
    useState("");
  const [sectiononeImage, setSectiononeImage] = useState("");
  const [filePath, setFilePath] = useState("");
  const [instagramToken, setinstagramToken] = useState("");
  const [instagramStatus, setinstagramStatus] = useState("");
  const [announcementoneTitle, setAnnouncementoneTitle] = useState("");
  const [announcementoneDescription, setAnnouncementoneDescription] =
    useState("");
  const [tamilannouncementoneTitle, settamilAnnouncementoneTitle] =
    useState("");
  const [tamilannouncementoneDescription, settamilAnnouncementoneDescription] =
    useState("");
  const [announcementoneImage, setAnnouncementoneImage] = useState("");
  const [announcementfilePath, setAnnouncementFilePath] = useState("");
  const [sectionthreeTitle, setsectionthreeTitle] = useState("");
  const [sectionthreeDescription, setsectionthreeDescription] = useState("");
  const [sectionthreelinkPage, setsectionthreelinkPage] = useState("");
  const [sectionthreeStatus, setsectionthreeStatus] = useState("");
  const [sectionthreeImage, setsectionthreeImage] = useState("");
  const [tamilsectionthreeTitle, settamilsectionthreeTitle] = useState("");
  const [tamilsectionthreeDescription, settamilsectionthreeDescription] =
    useState("");
  const [sectionthreefilePath, setsectionthreefilePath] = useState("");
  const [sectionthreefulllinkPage, setsectionthreefulllinkPage] = useState("");
  const buttonRef = useRef("accept-button");
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {}, [accepted]);

  const acceptCall = () => {
    window.onload = () => {
      document.querySelector('[data-bs-target="#exampleModal"]').click();
    };
  };
  const homepagesecetionone = () => {
    const apiUrl = API_URL + "HomeApi/homepagesection";
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
            setSectiononeTitle(result.data.sectiononeTitle);
            setSectiononeDescription(result.data.sectiononeDescription);
            settamilSectiononeTitle(result.data.tamilsectiononeTitle);
            settamilSectiononeDescription(
              result.data.tamilsectiononeDescription
            );
            setSectiononeImage(result.data.sectiononeImage);
            setFilePath(result.data.filePath);
            setinstagramToken(result.data.instagramToken);
            setinstagramStatus(result.data.instagramStatus);
          }
        },
        (error) => {}
      );
  };
  const announcement = () => {
    const apiUrl = API_URL + "HomeApi/announcement";
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
            if (result.data.sectiononeStatus === 1) {
              acceptCall();
              setAnnouncementoneTitle(result.data.sectiononeTitle);
              setAnnouncementoneDescription(result.data.sectiononeDescription);
              settamilAnnouncementoneTitle(result.data.tamilsectiononeTitle);
              settamilAnnouncementoneDescription(
                result.data.tamilsectiononeDescription
              );
              setAnnouncementoneImage(result.data.sectiononeImage);
              setAnnouncementFilePath(result.data.filePath);
            }
          }
        },
        (error) => {}
      );
  };
  const watchnew = () => {
    const apiUrl = API_URL + "HomeApi/watchnew";
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
            if (result.data.sectionthreeStatus === 1) {
              setsectionthreeTitle(result.data.sectionthreeTitle);
              setsectionthreeDescription(result.data.sectionthreeDescription);
              setsectionthreelinkPage(result.data.sectionthreelinkPage);
              setsectionthreeStatus(result.data.sectionthreeStatus);
              setsectionthreeImage(result.data.sectionthreeImage);
              settamilsectionthreeTitle(result.data.tamilsectionthreeTitle);
              settamilsectionthreeDescription(
                result.data.tamilsectionthreeDescription
              );
              setsectionthreefilePath(result.data.filePath);
              setsectionthreefulllinkPage(result.data.sectionthreefulllinkPage);
            }
          }
        },
        (error) => {}
      );
  };
  const myReftop = useRef(null);
  const myRef = useRef(null);
  const myRef2 = useRef(null);
  const myRef3 = useRef(null);
  const myRef5 = useRef(null);
  const myRef6 = useRef(null);
  const myRef8 = useRef(null);
  const executeScrolltop = () => myReftop.current.scrollIntoView();
  const executeScroll = () => myRef.current.scrollIntoView();
  const executeScroll2 = () => myRef2.current.scrollIntoView();
  const executeScroll3 = () => myRef3.current.scrollIntoView();
  const executeScroll5 = () => myRef5.current.scrollIntoView();
  const executeScroll6 = () => myRef6.current.scrollIntoView();
  const executeScroll8 = () => myRef8.current.scrollIntoView();
  useEffect(() => {
    const handleScroll = () => {
      const floatLeftIcons =
        document.getElementsByClassName("float-left-icons");
      const className = "float-left-icons-active";

      // Check if elements exist before accessing them
      if (floatLeftIcons.length === 0) return;

      const scrollY = window.scrollY || window.pageYOffset;
      const innerHeight = window.innerHeight;

      // Helper function to safely add/remove classes
      const toggleClass = (index, shouldAdd) => {
        if (floatLeftIcons[index]) {
          if (shouldAdd) {
            floatLeftIcons[index].classList.add(className);
          } else {
            floatLeftIcons[index].classList.remove(className);
          }
        }
      };

      // Section 1 - Home
      if (scrollY >= innerHeight * 0) {
        toggleClass(0, true);
      } else {
        toggleClass(0, false);
      }

      // Section 2 - Numbers
      if (scrollY >= innerHeight * 0.5) {
        toggleClass(1, true);
        toggleClass(0, false);
      } else {
        toggleClass(1, false);
      }

      // Section 3 - Meendum Manjapai
      if (scrollY >= innerHeight * 2) {
        toggleClass(2, true);
        toggleClass(1, false);
      } else {
        toggleClass(2, false);
      }

      // Section 4 - What Numbers Tell Us
      if (scrollY >= innerHeight * 3) {
        toggleClass(3, true);
        toggleClass(2, false);
      } else {
        toggleClass(3, false);
      }

      // Section 5 - Events
      if (scrollY >= innerHeight * 4.3) {
        toggleClass(4, true);
        toggleClass(3, false);
      } else {
        toggleClass(4, false);
      }

      // Section 6 - Videos
      if (scrollY >= innerHeight * 5.3) {
        toggleClass(5, true);
        toggleClass(4, false);
      } else {
        toggleClass(5, false);
      }

      // Section 7 - Awards & Departments
      if (scrollY >= innerHeight * 7) {
        toggleClass(6, true);
        toggleClass(5, false);
      } else {
        toggleClass(6, false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const preregistration = () => {
    // window.location = "/meendummanjappai"
  };
  return (
    <div>
      <div className="container formobileonly">
        {/* <button type="button" className="btn btn-primary popup-btn"
                    onClick={() => acceptCall()} data-bs-toggle="modal" data-bs-target="#exampleModal">
                    Notification
                </button> */}

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {localStorage.getItem("language") === "Tamil" ? (
                    <>
                      {tamilannouncementoneTitle === "" ? (
                        <>{announcementoneTitle}</>
                      ) : (
                        <>{tamilannouncementoneTitle}</>
                      )}
                    </>
                  ) : (
                    <>{announcementoneTitle}</>
                  )}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div
                className="modal-body"
                onClick={preregistration}
                data-toggle="tooltip"
              >
                <div>
                  <img
                    className="notification-image"
                    src={announcementfilePath + announcementoneImage}
                    alt="notification-image"
                  ></img>
                </div>
                <div>
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change notification-content">
                          {tamilannouncementoneDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: announcementoneDescription
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
                                __html: tamilannouncementoneDescription
                                  .replaceAll(/<script>/gi, "")
                                  .replaceAll(/<\/script>/gi, "")
                                  .replaceAll(/javascript/gi, "")
                                  .replaceAll(/alert/gi, "")
                                  .replaceAll(/Alert/gi, ""),
                              }}
                            />
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <div
                          className="editor-className content-text-change notification-content"
                          dangerouslySetInnerHTML={{
                            __html: announcementoneDescription
                              .replaceAll(/<script>/gi, "")
                              .replaceAll(/<\/script>/gi, "")
                              .replaceAll(/javascript/gi, "")
                              .replaceAll(/alert/gi, "")
                              .replaceAll(/Alert/gi, ""),
                          }}
                        />
                      </>
                    )}
                  </>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section" ref={myReftop}>
        <Mainbanner />
      </div>
      <div className="section">
        <Count />
      </div>
      <div className="section" ref={myRef}>
        <District />
      </div>
      <News />
      <div className="section" ref={myRef2}>
        <div className="animation-total-section">
          <div className="container formobileonly">
            <div className="row">
              <div className="col-lg-7 col-md-12 col-12">
                <video
                  className="pcb-tn-platics-video"
                  src={filePath + sectiononeImage}
                  muted
                  autoPlay={"autoplay"}
                  preLoad="auto"
                  loop
                ></video>
              </div>
              <div className="col-lg-5 col-md-12 col-12">
                <div className="full-card-animation">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <h5 className="animation-header">
                          {tamilsectiononeTitle === "" ? (
                            <>{sectiononeTitle}</>
                          ) : (
                            <>{tamilsectiononeTitle}</>
                          )}
                        </h5>
                        <p className="animation-details">
                          {tamilsectiononeDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: sectiononeDescription
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
                                __html: tamilsectiononeDescription
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
                        <h5 className="animation-header">{sectiononeTitle}</h5>
                        <p className="animation-details">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: sectiononeDescription
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
                  <div className="animation-button">
                    <button className="animation-btn" onClick={executeScroll6}>
                      {localStorage.getItem("language") === "Tamil"
                        ? "மீண்டும் மஞ்சப்பையின் அறிமுக வீடியோ"
                        : "Inauguration Video of Meendum Manjapai"}
                      <MdArrowForward style={{ margin: "0 0 0 10px" }} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section" ref={myRef3}>
        <SocialMedia />
      </div>

      <Machine />
      <div className="section" ref={myRef5}>
        <Events />
      </div>
      <div className="section" ref={myRef6}>
        <Videos />
      </div>
      <Gallery />
      <div className="section" ref={myRef8}>
        <Awards />
      </div>
      <div className="container formobileonly">
        <Departments />
      </div>
      <div className="float-left-top">
        <button
          type="button"
          className="float-left-icons-top"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          data-toggle="tooltip"
          title="Watch New"
        >
          <MdCircle className="notification-icon" />
          <MdOutlineVideoLibrary />
        </button>

        <div
          className="modal fade"
          id="exampleModal1"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <div className="row">
                  <div className="col-11">
                    <h5 className="modal-title" id="exampleModalLabel">
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          {tamilsectionthreeTitle === "" ? (
                            <>{sectionthreeTitle}</>
                          ) : (
                            <>{tamilsectionthreeTitle}</>
                          )}
                        </>
                      ) : (
                        <>{sectionthreeTitle}</>
                      )}
                    </h5>
                  </div>
                  <div className="col-1">
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                </div>
              </div>
              <div className="modal-body">
                {sectionthreeImage !== "" ? (
                  <video
                    className="pcb-tn-platics-video"
                    src={sectionthreefilePath + sectionthreeImage}
                    muted
                    autoPlay={"autoplay"}
                    preLoad="auto"
                    loop
                  ></video>
                ) : (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: sectionthreefulllinkPage
                        .replaceAll(/<script>/gi, "")
                        .replaceAll(/<\/script>/gi, "")
                        .replaceAll(/javascript/gi, "")
                        .replaceAll(/alert/gi, "")
                        .replaceAll(/Alert/gi, ""),
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-left">
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Home"
          onClick={executeScrolltop}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Numbers"
          onClick={executeScroll}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Meendum Manjapai"
          onClick={executeScroll2}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="What the Numbers Tell Us"
          onClick={executeScroll3}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Events"
          onClick={executeScroll5}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Our Videos"
          onClick={executeScroll6}
        >
          <MdCircle />
        </div>
        <div
          className="float-left-icons"
          data-toggle="tooltip"
          title="Awards & Departments"
          onClick={executeScroll8}
        >
          <MdCircle />
        </div>
      </div>
    </div>
  );
}
export default Home;
