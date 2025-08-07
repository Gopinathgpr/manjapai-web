import React, { useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdMail } from "react-icons/md";
import { FaMobileAlt } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function PreRegistrationDetails() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [device, setDevice] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === "") {
      toast.error("Enter Your Name ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (name.length <= 3) {
      toast.error("Enter Your Full Name ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }
    if (email === "") {
      toast.error("Enter Your Email Id ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    } 

    if (mobile === "") {
      toast.error("Enter Your Mobile Number ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (mobile.length !== 10) {
      toast.error("Invalid Mobile Number ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    if (device === "") {
      toast.error("Select Your Device ...", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return false;
    }

    const data = {
      Name: name,
      Email: email,
      Mobile: mobile,
      Device: device,
    };

    if (data !== "") {
      toast.success(
        "Thank You for Registering for the App . You will received the app link shortly",
        {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        }
      );
    }

    axios
      .post(
        "https://sheet.best/api/sheets/1fde19bc-0459-4740-9ba8-3e31b7e05bf6",
        data
      )
      .then((response) => {
        setName("");
        setEmail("");
        setMobile("");
        setDevice("");
        window.location.href = "/";
      });
  };

  return (
    <>
      <div>
        <div className="page-layout-theme-6">
          <div className="container formobileonly">
            <div className="feedback-content-section">
              <h1 className="pre-registration-title">
                {localStorage.getItem("language") === "Tamil"
                  ? "முன் பதிவு"
                  : "Pre-Registration"}
              </h1>
              <div className="row">
                <div className="col-12">
                  <form autoComplete="off" onSubmit={handleSubmit}>
                    <div className="input-field">
                      <div className="all-input-field">
                        <span className="input-field-icon">
                          <BsFillPersonFill />
                        </span>
                        <input
                          type="text"
                          className="form-control1"
                          placeholder={
                            localStorage.getItem("language") === "Tamil"
                              ? "பெயர்"
                              : "Name "
                          }
                          aria-describedby="emailHelp"
                          onChange={(e) => setName(e.target.value)}
                          value={name}
                        />
                      </div>
                      <div className="all-input-field">
                        <span className="input-field-icon">
                          <MdMail />
                        </span>
                        <input
                          type="email"
                          className="form-control1"
                          placeholder={
                            localStorage.getItem("language") === "Tamil"
                              ? "மின்னஞ்சல்"
                              : "Email "
                          }
                          aria-describedby="emailHelp"
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                      </div>
                      <div className="all-input-field">
                        <span className="input-field-icon">
                          <FaMobileAlt />
                        </span>
                        <input
                          type="number"
                          className="form-control1"
                          placeholder={
                            localStorage.getItem("language") === "Tamil"
                              ? "கைபேசி எண்"
                              : "Mobile No. "
                          }
                          aria-describedby="emailHelp"
                          onChange={(e) => setMobile(e.target.value)}
                          value={mobile}
                        />
                      </div>
                      <div className="all-input-radio">
                        <h1 className="input-radio-title">
                          {localStorage.getItem("language") === "Tamil"
                            ? "உங்கள் சாதனத்தைத் தேர்ந்தெடுக்கவும்"
                            : "Select Your Device"}
                        </h1>
                        <div className="row">
                          <div className="col-lg-4 col-md-6 col-12">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="device"
                                id="flexRadioDefault1"
                                onChange={(e) => setDevice(e.target.value)}
                                value="Android"
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault1"
                              >
                                Android
                              </label>
                            </div>
                          </div>
                          <div className="col-lg-4 col-md-6 col-12">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="radio"
                                name="device"
                                id="flexRadioDefault2"
                                onChange={(e) => setDevice(e.target.value)}
                                value="iPhone"
                              />
                              <label
                                class="form-check-label"
                                for="flexRadioDefault2"
                              >
                                iPhone
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="feedback-send-btn">
                      <div className="feedback-view-btn">
                        <button className="feedback-btn" type="submit">
                          <TiLocationArrow className="feedback-btn-icon" />
                          <span className="feedback-btn-space">
                            {localStorage.getItem("language") === "Tamil"
                              ? "சமர்ப்பிக்க"
                              : "Submit"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}
export default PreRegistrationDetails;
