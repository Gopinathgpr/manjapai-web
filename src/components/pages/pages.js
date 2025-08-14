import React, { Fragment, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import "./pages.css";
import "./information.css";
import "./media-and-events.css";
import "./citizen-center.css";
import "./plastic-waste-management.css";
import "./about.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FcTimeline } from "react-icons/fc";
import { MdOutlineArrowForward, MdLocationOn, MdMail } from "react-icons/md";
import $ from "jquery";
import { AiOutlineCalendar } from "react-icons/ai";
import { BsFillPersonFill, BsChatLeftDotsFill } from "react-icons/bs";
import { FaMobileAlt, FaFileUpload } from "react-icons/fa";
import { TiLocationArrow } from "react-icons/ti";
import API_URL from "../../Config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ComposableMap,
  ZoomableGroup,
  Geographies,
  Geography,
  Annotation,
} from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { STYLES_MAP1 } from "../layouts/tn-map/constants";
import { MAP_JSON } from "../layouts/tn-map/constants";
function Layouts() {
  var FileSaver = require("file-saver");
  const { categoryUrl, pageUrl } = useParams();
  const navigate = useNavigate();
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
    getpageId();
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
  }, [pageUrl]);
  const [districtwise, setDistrictwise] = useState([]);
  const [districtName, setDistrictName] = useState("Chennai");
  const [districtDescription, setDistrictDescription] = useState("");
  const [tamildistrictName, settamilDistrictName] = useState("Chennai");
  const [tamildistrictDescription, settamilDistrictDescription] = useState("");
  const [machineDescription, setMachineDescription] = useState("");
  const [tamilmachineDescription, settamilmachineDescription] = useState("");
  const [districtArea, setdistrictArea] = useState("");
  const [districtIEC, setdistrictIEC] = useState("");
  const [districtEco, setdistrictEco] = useState("");
  const [districtEnforcemen, setdistrictEnforcemen] = useState("");
  const [districtManufacturers, setdistrictManufacturers] = useState("");
  const [districtRecyclers, setdistrictRecyclers] = useState("");
  const [contact, setContacts] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });
  const [inputs, setInputs] = useState({
    categoryId: "",
    pageTitle: "",
    pageUrl: "",
    pageTemplate: "",
    pageType: "",
    pageShortdescription: "",
    pageStatus: "",
    pageOrder: "",
    pageImage: "",
    pageDescription: "",
    pagebgImage: "",
    metaTitle: "",
    metaDescription: "",
    metaKeyword: "",
    pageimageOne: "",
    pageimageTwo: "",
    pageimageThree: "",
    pageimageFour: "",
    pageimageFive: "",
    pageimageSix: "",
    pageoneLink: "",
    pagetwoLink: "",
    pageoneFile: "",
    pagetwoFile: "",
    linkOther: "",
    pagetwoDescription: "",
    filePath: "",
    blogTitle: "",
    blogImage: "",
    blogShortdescription: "",
    blogDescription: "",
    blogfilePath: "",
    blogDate: "",
    blogId: "",
    lastinternationalnewsTitle: "",
    lastinternationalnewsImage: "",
    lastinternationalnewsShortdescription: "",
    lastinternationalnewsDescription: "",
    lastinternationalnewsDate: "",
    lastinternationalnewsfilePath: "",
    lastinternationalnewsId: "",
    internationalnewsTitle: "",
    internationalnewsImage: "",
    internationalnewsShortdescription: "",
    internationalnewsDescription: "",
    internationalnewsDate: "",
    internationalnewsfilePath: "",
    internationalnewsId: "",
    lastnationalnewsTitle: "",
    lastnationalnewsImage: "",
    lastnationalnewsShortdescription: "",
    lastnationalnewsDescription: "",
    lastnationalnewsDate: "",
    lastnationalnewsfilePath: "",
    lastnationalnewsId: "",
    nationalnewsTitle: "",
    nationalnewsImage: "",
    nationalnewsShortdescription: "",
    nationalnewsDescription: "",
    nationalnewsDate: "",
    nationalnewsfilePath: "",
    nationalnewsId: "",
    laststatenewsTitle: "",
    laststatenewsImage: "",
    laststatenewsShortdescription: "",
    laststatenewsDescription: "",
    laststatenewsDate: "",
    laststatenewsfilePath: "",
    laststatenewsId: "",
    statenewsTitle: "",
    statenewsImage: "",
    statenewsShortdescription: "",
    statenewsDescription: "",
    statenewsDate: "",
    statenewsfilePath: "",
    statenewsId: "",
    tableHeading: "",
    labelOne: "",
    labelTwo: "",
    labelThree: "",
    labelFour: "",
    categoryName: "",
    tamilpageTitle: "",
    tamilpageShortdescription: "",
    tamilpageDescription: "",
    tamilmetaTitle: "",
    tamilmetaDescription: "",
    tamilmetaKeyword: "",
    tamilpagetwoDescription: "",
    tamilblogTitle: "",
    tamilblogShortdescription: "",
    tamilblogDescription: "",
    lastinternationaltamilnewsTitle: "",
    lastinternationaltamilnewsShortdescription: "",
    lastinternationaltamilnewsDescription: "",
    tamilinternationalnewsTitle: "",
    internationaltamilnewsShortdescription: "",
    internationaltamilnewsDescription: "",
    lastnationaltamilnewsTitle: "",
    lastnationaltamilnewsShortdescription: "",
    lastnationaltamilnewsDescription: "",
    nationaltamilnewsTitle: "",
    nationaltamilnewsShortdescription: "",
    nationaltamilnewsDescription: "",
    laststatetamilnewsTitle: "",
    laststatetamilnewsShortdescription: "",
    laststatetamilnewsDescription: "",
    statetamilnewsTitle: "",
    statetamilnewsShortdescription: "",
    statetamilnewsDescription: "",
    tamiltableHeading: "",
    tamillabelOne: "",
    tamillabelTwo: "",
    tamillabelThree: "",
    tamillabelFour: "",
    tamilcategoryName: "",
    labelFive: "",
    labelSix: "",
    labelSeven: "",
    labelEight: "",
    tamillabelFive: "",
    tamillabelSix: "",
    tamillabelSeven: "",
    tamillabelEight: "",
    timelineTitle: "",
    tamiltimelineTitle: "",
    tamiltimelineDescription: "",
    timelineDescription: "",
    tamilmachineDescription: "",
    machineDescription: "",
    updateDate: "",
  });
  const [contactImage, setcontactImage] = useState("");
  const [contactImagename, setcontactImagename] = useState("");
  const [submenu, setSubmenu] = useState([]);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "mobile") {
      if (isNaN(value)) {
        setContacts((values) => ({ ...values, mobile: "" }));
        toast.error("Enter Valid Number ...", {
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
      } else {
        if (value.length <= 12) {
          setContacts((values) => ({ ...values, mobile: contact.mobile }));
        } else {
          setContacts((values) => ({ ...values, mobile: "" }));
          toast.error("Enter Valid Number ...", {
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
      }
    }
    if (name === "contactImage") {
      const file = event.target.files[0];
      var filesize = event.target.files[0].size / 1024;
      if (event.target.files[0].size > 1000000) {
        document.getElementById("contactImage").focus();
        document.getElementById("contactImage").value = "";
        toast.error("Sorry, your file is too large.", {
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
      var size = Math.ceil(filesize);
      var filetype = event.target.files[0].type;
      var type = filetype.replace("image/", "");
      type = type.replace("application/", "");
      type = type.replace("video/", "");
      if (
        type === "png" ||
        type === "PNG" ||
        type === "gif" ||
        type === "GIF" ||
        type === "jpeg" ||
        type === "jpg" ||
        type === "JPG" ||
        type === "JPEG" ||
        type === "bmp" ||
        type === "BMP" ||
        type === "mp4" ||
        type === "MP4" ||
        type === "mp3" ||
        type === "mp3" ||
        type === "pdf" ||
        type === "PDF"
      ) {
      } else {
        document.getElementById("contactImage").value = "";
        document.getElementById("contactImage").focus();
        toast.error("Only Jpg, Png, Gif,video format allowed", {
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
      setcontactImage(file);
      setcontactImagename(event.target.files[0].name);
    }
    setContacts((values) => ({ ...values, [name]: value }));
  };
  const blogcategory_change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    if (name === "categoryId") {
      const apiUrl = API_URL + "HomeApi/blogall";
      const myHeaders = new Headers();
      var raw = JSON.stringify({
        token: "MeendumManjappai",
        categoryId: value,
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
              setBlogall(result.data);
            }
          },
          (error) => {}
        );
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    contact.name = contact.name.trim();
    if (contact.name === "") {
      document.getElementById("name").focus();
      setContacts((values) => ({ ...values, name: contact.name }));
      toast.error("Enter Name ...", {
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
    } else {
      setContacts((values) => ({ ...values, name: contact.name }));
    }
    contact.email = contact.email.trim();
    if (contact.email === "") {
      document.getElementById("email").focus();
      setContacts((values) => ({ ...values, email: contact.email }));
      toast.error("Enter Email ...", {
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
    } else {
      setContacts((values) => ({ ...values, email: contact.email }));
    }
    var email = contact.email;
    if (email === "") {
      document.getElementById("email").focus();
      toast.error("Enter Email ...", {
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
    } else {
      if (email !== "") {
        var atpos = email.indexOf("@");
        var dotpos = email.lastIndexOf(".");
        if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= email.length) {
          toast.error("Enter Valid Email Id ...", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          document.getElementById("email").focus();
          return false;
        }
      }
    }
    contact.mobile = contact.mobile.trim();
    if (contact.mobile === "") {
      document.getElementById("mobile").focus();
      setContacts((values) => ({ ...values, mobile: contact.mobile }));
      toast.error("Enter Mobile No ...", {
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
    } else {
      setContacts((values) => ({ ...values, mobile: contact.mobile }));
    }
    contact.message = contact.message.trim();
    if (contact.message === "") {
      document.getElementById("message").focus();
      setContacts((values) => ({ ...values, message: contact.message }));
      toast.error("Enter Message ...", {
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
    } else {
      setContacts((values) => ({ ...values, message: contact.message }));
    }

    if (contact.name !== "") {
      const apiUrl = API_URL + "HomeApi/contact_form";
      const formData = new FormData();
      formData.append("name", contact.name);
      formData.append("token", "MeendumManjappai");
      formData.append("email", contact.email);
      formData.append("mobile", contact.mobile);
      formData.append("message", contact.message);
      formData.append("contactImage", contactImage);
      formData.append("contactfileName", contactImagename);
      var options = {
        method: "POST",
        body: formData,
        redirect: "follow",
      };
      fetch(apiUrl, options)
        .then((res) => res.json())
        .then(
          (result) => {
            if (result.status === 200) {
              document.getElementById("name").value = "";
              document.getElementById("email").value = "";
              document.getElementById("mobile").value = "";
              document.getElementById("message").value = "";
              document.getElementById("contactImage").value = "";
              document.getElementById("thanksmessage").style.display = "block";
            }
          },
          (error) => {}
        );
    }
  };
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
            setMachineDescription(result.data.machineDescription);
            settamilmachineDescription(result.data.tamilmachineDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
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
            setMachineDescription(result.data.machineDescription);
            settamilmachineDescription(result.data.tamilmachineDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
            getdistict(result.data.districtName);
          }
        },
        (error) => {}
      );
  };
  const getdistict = (districtname) => {
    $(".rsm-geography").removeClass("active1");
    let setActiveClass = document.getElementById(districtname);
    console.log(setActiveClass);
    setActiveClass.classList.add("active1");
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
            setMachineDescription(result.data.machineDescription);
            settamilmachineDescription(result.data.tamilmachineDescription);
            setdistrictArea(result.data.districtArea);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
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
            setMachineDescription(result.data.machineDescription);
            settamilmachineDescription(result.data.tamilmachineDescription);
            setdistrictIEC(result.data.districtIEC);
            setdistrictEco(result.data.districtEco);
            setdistrictEnforcemen(result.data.districtEnforcemen);
            setdistrictManufacturers(result.data.districtManufacturers);
            setdistrictRecyclers(result.data.districtRecyclers);
          }
        },
        (error) => {}
      );
  };
  const menugo = () => {
    $("html, body").animate({ scrollTop: 0 }, "300");
    $(".menucolor").css({ "border-bottom": "" });
  };
  const getpageId = () => {
    const apiUrl = API_URL + "HomeApi/getPage";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
      categoryUrl: categoryUrl,
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
          if (result.data === null) {
            navigate(`${process.env.PUBLIC_URL + "/404"}`);
          }
          if (result.status === 200) {
            setInputs((values) => ({
              ...values,
              pageUrl: result.data.pageUrl,
            }));
            setInputs((values) => ({
              ...values,
              categoryName: result.data.categoryName,
            }));
            setInputs((values) => ({
              ...values,
              tamilcategoryName: result.data.tamilcategoryName,
            }));
            setInputs((values) => ({
              ...values,
              pageTemplate: result.data.pageTemplate,
            }));
            setInputs((values) => ({
              ...values,
              pageType: result.data.pageType,
            }));
            setInputs((values) => ({
              ...values,
              metaKeyword: result.data.metaKeyword,
            }));
            setInputs((values) => ({
              ...values,
              tamilmetaKeyword: result.data.tamilmetaKeyword,
            }));
            setInputs((values) => ({
              ...values,
              metaDescription: result.data.metaDescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilmetaDescription: result.data.tamilmetaDescription,
            }));
            setInputs((values) => ({
              ...values,
              metaTitle: result.data.metaTitle,
            }));
            setInputs((values) => ({
              ...values,
              tamilmetaTitle: result.data.tamilmetaTitle,
            }));
            setInputs((values) => ({
              ...values,
              pageTitle: result.data.pageTitle,
            }));
            setInputs((values) => ({
              ...values,
              tamilpageTitle: result.data.tamilpageTitle,
            }));
            setInputs((values) => ({
              ...values,
              updateDate: result.data.updateDate,
            }));
            setInputs((values) => ({
              ...values,
              pageShortdescription: result.data.pageShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilpageShortdescription: result.data.tamilpageShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              categoryId: result.data.categoryId,
            }));
            setInputs((values) => ({
              ...values,
              pageOrder: result.data.pageOrder,
            }));
            setInputs((values) => ({
              ...values,
              pageStatus: result.data.status,
            }));
            setInputs((values) => ({
              ...values,
              pageoneLink: result.data.pageoneLink,
            }));
            setInputs((values) => ({
              ...values,
              pageTemplate: result.data.pageTemplate,
            }));
            setInputs((values) => ({
              ...values,
              pagetwoLink: result.data.pagetwoLink,
            }));
            setInputs((values) => ({
              ...values,
              linkOther: result.data.linkOther,
            }));
            setInputs((values) => ({
              ...values,
              pageDescription: result.data.pageDescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilpageDescription: result.data.tamilpageDescription,
            }));
            setInputs((values) => ({
              ...values,
              pagetwoDescription: result.data.pagetwoDescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilpagetwoDescription: result.data.tamilpagetwoDescription,
            }));
            setInputs((values) => ({
              ...values,
              pageOrder: result.data.pageOrder,
            }));
            setInputs((values) => ({
              ...values,
              pageImage: result.data.pageImage,
            }));
            setInputs((values) => ({
              ...values,
              pageoneFile: result.data.pageoneFile,
            }));
            setInputs((values) => ({
              ...values,
              pagetwoFile: result.data.pagetwoFile,
            }));
            setInputs((values) => ({
              ...values,
              pagebgImage: result.data.pagebgImage,
            }));
            setInputs((values) => ({
              ...values,
              pageimageOne: result.data.pageimageOne,
            }));
            setInputs((values) => ({
              ...values,
              pageimageTwo: result.data.pageimageTwo,
            }));
            setInputs((values) => ({
              ...values,
              pageimageThree: result.data.pageimageThree,
            }));
            setInputs((values) => ({
              ...values,
              pageimageFour: result.data.pageimageFour,
            }));
            setInputs((values) => ({
              ...values,
              pageimageFive: result.data.pageimageFive,
            }));
            setInputs((values) => ({
              ...values,
              pageimageSix: result.data.pageimageSix,
            }));
            setInputs((values) => ({
              ...values,
              filePath: result.data.filePath,
            }));
            setInputs((values) => ({
              ...values,
              tableHeading: result.data.tableHeading,
            }));
            setInputs((values) => ({
              ...values,
              tamiltableHeading: result.data.tamiltableHeading,
            }));
            setInputs((values) => ({
              ...values,
              labelOne: result.data.labelOne,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelOne: result.data.tamillabelOne,
            }));
            setInputs((values) => ({
              ...values,
              labelTwo: result.data.labelTwo,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelTwo: result.data.tamillabelTwo,
            }));
            setInputs((values) => ({
              ...values,
              labelThree: result.data.labelThree,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelThree: result.data.tamillabelThree,
            }));
            setInputs((values) => ({
              ...values,
              labelFour: result.data.labelFour,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelFour: result.data.tamillabelFour,
            }));
            setInputs((values) => ({
              ...values,
              labelFive: result.data.labelFive,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelFive: result.data.tamillabelFive,
            }));
            setInputs((values) => ({
              ...values,
              labelSix: result.data.labelSix,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelSix: result.data.tamillabelSix,
            }));
            setInputs((values) => ({
              ...values,
              labelSeven: result.data.labelSeven,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelSeven: result.data.tamillabelSeven,
            }));
            setInputs((values) => ({
              ...values,
              labelEight: result.data.labelEight,
            }));
            setInputs((values) => ({
              ...values,
              tamillabelEight: result.data.tamillabelEight,
            }));
            setInputs((values) => ({
              ...values,
              tamiltimelineDescription: result.data.tamiltimelineDescription,
            }));
            setInputs((values) => ({
              ...values,
              timelineDescription: result.data.timelineDescription,
            }));
            setInputs((values) => ({
              ...values,
              timelineTitle: result.data.timelineTitle,
            }));
            setInputs((values) => ({
              ...values,
              tamiltimelineTitle: result.data.tamiltimelineTitle,
            }));
            setInputs((values) => ({
              ...values,
              machineDescription: result.data.machineDescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilmachineDescription: result.data.tamilmachineDescription,
            }));
            setSubmenu(result.dependmenu);
            if (result.data.pageTemplate === "7") {
              getcardOne();
            }
            if (result.data.pageTemplate === "8") {
              getcardTwo();
            }
            if (
              result.data.pageTemplate === "9" ||
              result.data.pageTemplate === "12"
            ) {
              getcardTable();
            }
            if (result.data.pageTemplate === "14") {
              getcardTableeight();
            }
            if (
              result.data.pageTemplate === "10" ||
              result.data.pageTemplate === "11"
            ) {
              getcardAccordion();
            }
            if (result.data.pageTemplate === "16") {
              getTimeline();
            }
            if (result.data.linkOther === "Gallery") {
              getGalleryAll();
            }
            if (result.data.linkOther === "Events") {
              getEventsAll();
            }
            if (result.data.linkOther === "Videos") {
              getVideosAll();
            }
            if (result.data.linkOther === "Awards") {
              getAwardsAll();
            }
            if (result.data.linkOther === "Departments") {
              getDepartmentsAll();
            }
            if (result.data.linkOther === "Blogs") {
              getBlogsAll();
              getBlogbyId();
            }
            if (result.data.linkOther === "News") {
              internationalList();
              nationalList();
              stateList();
              getInternalnewsbyId();
              getNationalnewsbyId();
              getStatenewsbyId();
            }
          } else {
            navigate(`${process.env.PUBLIC_URL + "/404"}`);
          }
        },
        (error) => {}
      );
  };
  document.title = inputs.pageTitle + " | Meendummanjappai";
  const getBlogbyId = () => {
    const apiUrl = API_URL + "HomeApi/blogby_Id_desc";
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
            setInputs((values) => ({
              ...values,
              blogTitle: result.data.blogTitle,
            }));
            setInputs((values) => ({
              ...values,
              tamilblogTitle: result.data.tamilblogTitle,
            }));
            setInputs((values) => ({
              ...values,
              blogImage: result.data.blogImage,
            }));
            setInputs((values) => ({
              ...values,
              blogShortdescription: result.data.blogShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilblogShortdescription: result.data.tamilblogShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              blogDescription: result.data.blogDescription,
            }));
            setInputs((values) => ({
              ...values,
              tamilblogDescription: result.data.tamilblogDescription,
            }));
            setInputs((values) => ({
              ...values,
              blogDate: result.data.blogDate,
            }));
            setInputs((values) => ({
              ...values,
              blogfilePath: result.data.filePath,
            }));
            setInputs((values) => ({ ...values, blogId: result.data.id }));
          }
        },
        (error) => {}
      );
  };

  const getInternalnewsbyId = () => {
    const apiUrl = API_URL + "HomeApi/internationalby_Id_desc";
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
            setInputs((values) => ({
              ...values,
              lastinternationalnewsTitle: result.data.newsTitle,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationaltamilnewsTitle: result.data.tamilnewsTitle,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsImage: result.data.newsImage,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsShortdescription:
                result.data.newsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationaltamilnewsShortdescription:
                result.data.tamilnewsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsDescription: result.data.newsDescription,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationaltamilnewsDescription:
                result.data.tamilnewsDescription,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsDate: result.data.newsDate,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsfilePath: result.data.filePath,
            }));
            setInputs((values) => ({
              ...values,
              lastinternationalnewsId: result.data.id,
            }));
            if (result.beforedata === null) {
            } else {
              setInputs((values) => ({
                ...values,
                internationalnewsTitle: result.beforedata.newsTitle,
              }));
              setInputs((values) => ({
                ...values,
                tamilinternationalnewsTitle: result.beforedata.tamilnewsTitle,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsImage: result.beforedata.newsImage,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsShortdescription:
                  result.beforedata.newsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                internationaltamilnewsShortdescription:
                  result.beforedata.tamilnewsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsDescription: result.beforedata.newsDescription,
              }));
              setInputs((values) => ({
                ...values,
                internationaltamilnewsDescription:
                  result.beforedata.tamilnewsDescription,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsDate: result.beforedata.newsDate,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsfilePath: result.beforedata.filePath,
              }));
              setInputs((values) => ({
                ...values,
                internationalnewsId: result.beforedata.id,
              }));
            }
          }
        },
        (error) => {}
      );
  };
  const getNationalnewsbyId = () => {
    const apiUrl = API_URL + "HomeApi/nationalby_Id_desc";
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
            setInputs((values) => ({
              ...values,
              lastnationalnewsTitle: result.data.newsTitle,
            }));
            setInputs((values) => ({
              ...values,
              lastnationaltamilnewsTitle: result.data.tamilnewsTitle,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsImage: result.data.newsImage,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsShortdescription:
                result.data.newsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              lastnationaltamilnewsShortdescription:
                result.data.tamilnewsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsDescription: result.data.newsDescription,
            }));
            setInputs((values) => ({
              ...values,
              lastnationaltamilnewsDescription:
                result.data.tamilnewsDescription,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsDate: result.data.newsDate,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsfilePath: result.data.filePath,
            }));
            setInputs((values) => ({
              ...values,
              lastnationalnewsId: result.data.id,
            }));
            if (result.beforedata === null) {
            } else {
              setInputs((values) => ({
                ...values,
                nationalnewsTitle: result.beforedata.newsTitle,
              }));
              setInputs((values) => ({
                ...values,
                nationaltamilnewsTitle: result.beforedata.tamilnewsTitle,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsImage: result.beforedata.newsImage,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsShortdescription:
                  result.beforedata.newsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                nationaltamilnewsShortdescription:
                  result.beforedata.tamilnewsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsDescription: result.beforedata.newsDescription,
              }));
              setInputs((values) => ({
                ...values,
                nationaltamilnewsDescription:
                  result.beforedata.tamilnewsDescription,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsDate: result.beforedata.newsDate,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsfilePath: result.beforedata.filePath,
              }));
              setInputs((values) => ({
                ...values,
                nationalnewsId: result.beforedata.id,
              }));
            }
          }
        },
        (error) => {}
      );
  };
  const getStatenewsbyId = () => {
    const apiUrl = API_URL + "HomeApi/stateby_Id_desc";
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
            setInputs((values) => ({
              ...values,
              laststatenewsTitle: result.data.newsTitle,
            }));
            setInputs((values) => ({
              ...values,
              laststatetamilnewsTitle: result.data.tamilnewsTitle,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsImage: result.data.newsImage,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsShortdescription: result.data.newsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              laststatetamilnewsShortdescription:
                result.data.tamilnewsShortdescription,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsDescription: result.data.newsDescription,
            }));
            setInputs((values) => ({
              ...values,
              laststatetamilnewsDescription: result.data.tamilnewsDescription,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsDate: result.data.newsDate,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsfilePath: result.data.filePath,
            }));
            setInputs((values) => ({
              ...values,
              laststatenewsId: result.data.id,
            }));
            if (result.beforedata === null) {
            } else {
              setInputs((values) => ({
                ...values,
                statenewsTitle: result.beforedata.newsTitle,
              }));
              setInputs((values) => ({
                ...values,
                statetamilnewsTitle: result.beforedata.tamilnewsTitle,
              }));
              setInputs((values) => ({
                ...values,
                statenewsImage: result.beforedata.newsImage,
              }));
              setInputs((values) => ({
                ...values,
                statenewsShortdescription:
                  result.beforedata.newsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                statetamilnewsShortdescription:
                  result.beforedata.tamilnewsShortdescription,
              }));
              setInputs((values) => ({
                ...values,
                statenewsDescription: result.beforedata.newsDescription,
              }));
              setInputs((values) => ({
                ...values,
                statetamilnewsDescription:
                  result.beforedata.tamilnewsDescription,
              }));
              setInputs((values) => ({
                ...values,
                statenewsDate: result.beforedata.newsDate,
              }));
              setInputs((values) => ({
                ...values,
                statenewsfilePath: result.beforedata.filePath,
              }));
              setInputs((values) => ({
                ...values,
                statenewsId: result.beforedata.id,
              }));
            }
          }
        },
        (error) => {}
      );
  };
  const [internationnews, setInternationnews] = useState([]);
  const [nationnews, setNationnews] = useState([]);
  const [statenews, setStatenews] = useState([]);
  const internationalList = () => {
    const apiUrl = API_URL + "HomeApi/internationalnews";
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
            setInternationnews(result.data);
          }
        },
        (error) => {}
      );
  };
  const nationalList = () => {
    const apiUrl = API_URL + "HomeApi/nationalnews";
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
            setNationnews(result.data);
          }
        },
        (error) => {}
      );
  };
  const stateList = () => {
    const apiUrl = API_URL + "HomeApi/statenews";
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
            setStatenews(result.data);
          }
        },
        (error) => {}
      );
  };
  const [cardoneall, setCardoneall] = useState([]);
  const getcardOne = () => {
    const apiUrl = API_URL + "HomeApi/getPage_Cardone";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setCardoneall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [cardtwoall, setCardtwoall] = useState([]);
  const getcardTwo = () => {
    const apiUrl = API_URL + "HomeApi/getPage_Cardtwo";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setCardtwoall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [cardtableeightall, setCardtableeightall] = useState([]);
  const getcardTableeight = () => {
    const apiUrl = API_URL + "HomeApi/getPage_Cardtableeight";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setCardtableeightall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [cardtableall, setCardtableall] = useState([]);
  const getcardTable = () => {
    const apiUrl = API_URL + "HomeApi/getPage_Cardtable";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setCardtableall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [timelineall, setTimelineall] = useState([]);
  const getTimeline = () => {
    const apiUrl = API_URL + "HomeApi/getPage_timeline";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setTimelineall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [cardaccordionall, setCardAccordionall] = useState([]);
  const getcardAccordion = () => {
    const apiUrl = API_URL + "HomeApi/getPage_Cardaccordion";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      pageUrl: pageUrl,
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
            setCardAccordionall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [galleryall, setGalleryall] = useState([]);
  const getGalleryAll = () => {
    const apiUrl = API_URL + "HomeApi/gallery";
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
            setGalleryall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [eventall, setEventall] = useState([]);
  const getEventsAll = () => {
    const apiUrl = API_URL + "HomeApi/event_all";
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
            setEventall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [videosall, setVideosall] = useState([]);
  const getVideosAll = () => {
    const apiUrl = API_URL + "HomeApi/videoall";
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
            setVideosall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [awardsall, setAwardsall] = useState([]);
  const getAwardsAll = () => {
    const apiUrl = API_URL + "HomeApi/awardsall";
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
            setAwardsall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [blogall, setBlogall] = useState([]);
  const getBlogsAll = () => {
    const apiUrl = API_URL + "HomeApi/blogall";
    const myHeaders = new Headers();
    var raw = JSON.stringify({
      token: "MeendumManjappai",
      categoryId: "",
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
            setBlogall(result.data);
          }
        },
        (error) => {}
      );
  };
  const [departmentall, setDepartmentall] = useState([]);
  const getDepartmentsAll = () => {
    const apiUrl = API_URL + "HomeApi/departmentall";
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
            setDepartmentall(result.data);
          }
        },
        (error) => {}
      );
  };
  document.querySelectorAll(".link-other a").forEach(function (elem) {
    elem.setAttribute("target", "_blank");
  });

  function DownloadFile(filePath, fileName) {
    var url = "filePath" + fileName;
    var req = new XMLHttpRequest();
    req.open("GET", url, true);
    req.responseType = "blob";
    req.onload = function () {
      var blob = new Blob([req.response], { type: "application/octetstream" });
      var isIE = false || !!document.documentMode;
      if (isIE) {
        window.navigator.msSaveBlob(blob, fileName);
      } else {
        var url = window.URL || window.webkitURL;
        url = url.createObjectURL(blob);
        var a = document.createElement("a");
        a.setAttribute("download", fileName);
        a.setAttribute("href", url);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    };
    req.send();
  }
  return (
    <>
      <div className="page-design">
        <div className="page-layout-theme-1">
          <div className="theme-header">
            <div>
              <img
                className="theme-bg-image"
                src={inputs.filePath + inputs.pagebgImage}
                alt=""
              />
            </div>
            <div className="row">
              <div className="col-12">
                <div className="theme-title-card">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <h1 className="theme-head-line">
                        {inputs.tamilpageTitle === "" ? (
                          <>{inputs.pageTitle}</>
                        ) : (
                          <>{inputs.tamilpageTitle}</>
                        )}
                      </h1>
                    ) : (
                      <h1 className="theme-head-line">{inputs.pageTitle}</h1>
                    )}
                  </>
                  {submenu.length === 2 ? (
                    <div className="title-card-navigation">
                      <div className="row">
                        <div className="col-12">
                          <ul className="theme-title-card-navigation">
                            {submenu.map((menu, index) => (
                              <>
                                {inputs.pageUrl === menu.pageUrl ? (
                                  <li className="theme-title-highlighter-active">
                                    <div className="theme-active-btn">
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </div>
                                  </li>
                                ) : (
                                  <li className="theme-title-highlighter">
                                    <Link
                                      className="theme-btn"
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/" +
                                        categoryUrl +
                                        "/" +
                                        menu.pageUrl
                                      }
                                    >
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </Link>
                                  </li>
                                )}
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {submenu.length === 3 ? (
                    <div className="title-card-navigation">
                      <div className="row">
                        <div className="col-12">
                          <ul className="theme-title-card-navigation">
                            {submenu.map((menu, index) => (
                              <>
                                {inputs.pageUrl === menu.pageUrl ? (
                                  <li className="theme-title-highlighter-active">
                                    <div className="theme-active-btn">
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </div>
                                  </li>
                                ) : (
                                  <li className="theme-title-highlighter">
                                    <Link
                                      className="theme-btn"
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/" +
                                        categoryUrl +
                                        "/" +
                                        menu.pageUrl
                                      }
                                    >
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </Link>
                                  </li>
                                )}
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {submenu.length === 4 ? (
                    <div className="title-card-navigation">
                      <div className="row">
                        <div className="col-12">
                          <ul className="theme-title-card-navigation">
                            {submenu.map((menu, index) => (
                              <>
                                {inputs.pageUrl === menu.pageUrl ? (
                                  <li className="theme-title-highlighter-active">
                                    <div className="theme-active-btn">
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </div>
                                  </li>
                                ) : (
                                  <li className="theme-title-highlighter">
                                    <Link
                                      className="theme-btn"
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/" +
                                        categoryUrl +
                                        "/" +
                                        menu.pageUrl
                                      }
                                    >
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </Link>
                                  </li>
                                )}
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                  {submenu.length !== 2 &&
                  submenu.length !== 3 &&
                  submenu.length !== 4 ? (
                    <div className="title-card-navigation">
                      <div className="row">
                        <div className="col-12">
                          <ul className="theme-title-card-navigation">
                            {submenu.map((menu, index) => (
                              <>
                                {inputs.pageUrl === menu.pageUrl ? (
                                  <li className="theme-title-highlighter-active">
                                    <div className="theme-active-btn">
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </div>
                                  </li>
                                ) : (
                                  <li className="theme-title-highlighter">
                                    <Link
                                      className="theme-btn"
                                      to={
                                        process.env.PUBLIC_URL +
                                        "/" +
                                        categoryUrl +
                                        "/" +
                                        menu.pageUrl
                                      }
                                    >
                                      {localStorage.getItem("language") ===
                                      "Tamil" ? (
                                        <>
                                          {menu.tamilpageTitle !== "" ? (
                                            <>{menu.tamilpageTitle}</>
                                          ) : (
                                            <>{menu.pageTitle}</>
                                          )}
                                        </>
                                      ) : (
                                        <>{menu.pageTitle}</>
                                      )}
                                    </Link>
                                  </li>
                                )}
                              </>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {inputs.pageTemplate === "1" ? (
          <div className="container formobileonly">
            <div className="page-layout-content-theme-1">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-7 col-md-12 col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                  <div className="row">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-4">
                      {inputs.pageimageTwo !== "" ? (
                        <img
                          className="theme-1-image-signature"
                          src={inputs.filePath + inputs.pageimageTwo}
                          alt="honorable-image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="col-lg-4"></div>
                  </div>
                </div>
                <div className="col-lg-5 col-md-12 col-12">
                  {inputs.pageimageOne !== "" ? (
                    <img
                      className="theme-1-image"
                      src={inputs.filePath + inputs.pageimageOne}
                      alt="honorable-image"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {inputs.pageoneLink !== "" ? (
                    <div className="pdf-download-btn">
                      <a
                        rel="noreferrer"
                        href={inputs.pageoneLink}
                        className="task-pdf-download-btn"
                        target="_blank"
                      >
                        {localStorage.getItem("language") === "Tamil"
                          ? "(click to view full details)"
                          : "(click to view full details)"}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {inputs.pageoneFile !== "" ? (
                    <div className="pdf-download-btn">
                      <a
                        rel="noreferrer"
                        href={inputs.filePath + inputs.pageoneFile}
                        className="task-pdf-download-btn"
                        target="_blank"
                      >
                        {localStorage.getItem("language") === "Tamil"
                          ? "(click to view full details)"
                          : "(click to view full details)"}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div>
                  {inputs.pagetwoLink !== "" ? (
                    <div className="pdf-download-btn">
                      <a
                        rel="noreferrer"
                        href={inputs.pagetwoLink}
                        className="task-pdf-download-btn"
                        target="_blank"
                      >
                        {localStorage.getItem("language") === "Tamil"
                          ? "(click to view full details)"
                          : "(click to view full details)"}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                  {inputs.pagetwoFile !== "" ? (
                    <div className="pdf-download-btn">
                      <a
                        rel="noreferrer"
                        href={inputs.filePath + inputs.pagetwoFile}
                        className="task-pdf-download-btn"
                        target="_blank"
                      >
                        {localStorage.getItem("language") === "Tamil"
                          ? "(click to view full details)"
                          : "(click to view full details)"}
                      </a>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              {inputs.pagetwoDescription !== "" ? (
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpagetwoDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pagetwoDescription
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
                                  __html: inputs.tamilpagetwoDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pagetwoDescription
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
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "2" ? (
          <>
            {inputs.pageDescription !== "" ? (
              <div className="page-layout-theme-2">
                <div className="container formobileonly">
                  <div className="row">
                    <div className="col-lg-8 col-md-7 col-12">
                      <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link onClick={menugo} to="../">
                              {localStorage.getItem("language") === "Tamil"
                                ? "முகப்பு"
                                : "Home"}
                            </Link>
                          </li>
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <>
                                <li className="breadcrumb-item">
                                  <Link to=".">
                                    {inputs.tamilcategoryName === "" ? (
                                      <>{inputs.categoryName}</>
                                    ) : (
                                      <>{inputs.tamilcategoryName}</>
                                    )}
                                  </Link>
                                </li>
                                <>
                                  <li
                                    className="breadcrumb-item active"
                                    aria-current="page"
                                  >
                                    {inputs.tamilpageTitle === "" ? (
                                      <>{inputs.pageTitle}</>
                                    ) : (
                                      <>{inputs.tamilpageTitle}</>
                                    )}
                                  </li>
                                </>
                              </>
                            ) : (
                              <>
                                <li className="breadcrumb-item">
                                  <Link to=".">{inputs.categoryName}</Link>
                                </li>
                                <li
                                  className="breadcrumb-item active"
                                  aria-current="page"
                                >
                                  {inputs.pageTitle}
                                </li>
                              </>
                            )}
                          </>
                        </ol>
                      </nav>
                    </div>
                    <div className="col-lg-4 col-md-5 col-12">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          {localStorage.getItem("language") === "Tamil"
                            ? "புதுப்பிக்கப்பட்ட தேதி : "
                            : "Last Updated On : "}
                          {new Date(inputs.updateDate)
                            .toLocaleDateString("en-GB")
                            .slice(0, 10)
                            .split("/")
                            .join("-")}
                        </li>
                      </ol>
                    </div>
                  </div>
                  <div className="">
                    <div className="row">
                      <div className="col-12">
                        <>
                          {" "}
                          {localStorage.getItem("language") === "Tamil" ? (
                            <>
                              <div className="editor-class content-text-change">
                                {inputs.tamilpageDescription === "" ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: inputs.pageDescription
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
                                      __html: inputs.tamilpageDescription
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
                                className="editor-class content-text-change"
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                    <div className="row">
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="theme-2-image-section">
                          {inputs.pageimageOne !== "" ? (
                            <img
                              className="theme-2-image"
                              src={inputs.filePath + inputs.pageimageOne}
                              alt="theme--image"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="theme-2-image-section">
                          {inputs.pageimageTwo !== "" ? (
                            <img
                              className="theme-2-image"
                              src={inputs.filePath + inputs.pageimageTwo}
                              alt="theme--image"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-12">
                        <div className="theme-2-image-section">
                          {inputs.pageimageThree !== "" ? (
                            <img
                              className="theme-2-image"
                              src={inputs.filePath + inputs.pageimageThree}
                              alt="theme--image"
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                    {inputs.pagetwoDescription !== "" ? (
                      <div className="row">
                        <div className="col-12">
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <>
                                <div className="editor-class content-text-change">
                                  {inputs.tamilpagetwoDescription === "" ? (
                                    <div
                                      dangerouslySetInnerHTML={{
                                        __html: inputs.pagetwoDescription
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
                                        __html: inputs.tamilpagetwoDescription
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
                                  className="editor-class content-text-change"
                                  dangerouslySetInnerHTML={{
                                    __html: inputs.pagetwoDescription
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
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {inputs.pageoneLink !== "" ? (
                      <div className="pdf-download-btn">
                        <a
                          rel="noreferrer"
                          href={inputs.pageoneLink}
                          className="task-pdf-download-btn"
                          target="_blank"
                        >
                          {localStorage.getItem("language") === "Tamil"
                            ? "(click to view full details)"
                            : "(click to view full details)"}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    {inputs.pageoneFile !== "" ? (
                      <div className="pdf-download-btn">
                        <a
                          rel="noreferrer"
                          href={inputs.filePath + inputs.pageoneFile}
                          className="task-pdf-download-btn"
                          target="_blank"
                        >
                          {localStorage.getItem("language") === "Tamil"
                            ? "(click to view full details)"
                            : "(click to view full details)"}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <div>
                    {inputs.pagetwoLink !== "" ? (
                      <div className="pdf-download-btn">
                        <a
                          rel="noreferrer"
                          href={inputs.pagetwoLink}
                          className="task-pdf-download-btn"
                          target="_blank"
                        >
                          {localStorage.getItem("language") === "Tamil"
                            ? "(click to view full details)"
                            : "(click to view full details)"}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                    {inputs.pagetwoFile !== "" ? (
                      <div className="pdf-download-btn">
                        <a
                          rel="noreferrer"
                          href={inputs.filePath + inputs.pagetwoFile}
                          className="task-pdf-download-btn"
                          target="_blank"
                        >
                          {localStorage.getItem("language") === "Tamil"
                            ? "(click to view full details)"
                            : "(click to view full details)"}
                        </a>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "3" ? (
          <div className="page-layout-theme-3">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
                <div className="row">
                  <div className="col-lg-4 col-md-4 col-12">
                    {inputs.pageimageOne !== "" ? (
                      <img
                        className="theme-3-image-1"
                        src={inputs.filePath + inputs.pageimageOne}
                        alt="info-image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    {inputs.pageimageTwo !== "" ? (
                      <img
                        className="theme-3-image-2"
                        src={inputs.filePath + inputs.pageimageTwo}
                        alt="info-image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="col-lg-4 col-md-4 col-12">
                    {inputs.pageimageThree !== "" ? (
                      <img
                        className="theme-3-image-3"
                        src={inputs.filePath + inputs.pageimageThree}
                        alt="info-image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
              <div>
                {inputs.pageoneLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pageoneLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pageoneFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pageoneFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {inputs.pagetwoLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pagetwoLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pagetwoFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pagetwoFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {inputs.pagetwoDescription !== "" ? (
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpagetwoDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pagetwoDescription
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
                                  __html: inputs.tamilpagetwoDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pagetwoDescription
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
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "4" ? (
          <div className="page-layout-theme-4">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                  {inputs.pageimageOne !== "" ? (
                    <img
                      className="theme-4-image"
                      src={inputs.filePath + inputs.pageimageOne}
                      alt="honorable-image"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
              <div>
                {inputs.pageoneLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pageoneLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pageoneFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pageoneFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {inputs.pagetwoLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pagetwoLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pagetwoFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pagetwoFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {inputs.pagetwoDescription !== "" ? (
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpagetwoDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pagetwoDescription
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
                                  __html: inputs.tamilpagetwoDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pagetwoDescription
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
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "5" ? (
          <div className="page-layout-theme-5">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="">
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageOne !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageOne}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageTwo !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageTwo}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageThree !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageThree}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
                <div className="row">
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageFour !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageFour}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageFive !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageFive}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageSix !== "" ? (
                        <img
                          className="theme-5-image"
                          src={inputs.filePath + inputs.pageimageSix}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  {inputs.pagetwoDescription !== "" ? (
                    <div className="row">
                      <div className="col-12">
                        <>
                          {" "}
                          {localStorage.getItem("language") === "Tamil" ? (
                            <>
                              <div className="editor-class content-text-change">
                                {inputs.tamilpagetwoDescription === "" ? (
                                  <div
                                    dangerouslySetInnerHTML={{
                                      __html: inputs.pagetwoDescription
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
                                      __html: inputs.tamilpagetwoDescription
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
                                className="editor-class content-text-change"
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pagetwoDescription
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
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div>
                {inputs.pageoneLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pageoneLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pageoneFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pageoneFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {inputs.pagetwoLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pagetwoLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pagetwoFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pagetwoFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "6" ? (
          <div className="page-layout-theme-6">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-6 col-12">
                  <div className="">
                    {inputs.pageimageOne !== "" ? (
                      <img
                        className="theme-6-image"
                        src={inputs.filePath + inputs.pageimageOne}
                        alt="theme--image"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="col-lg-8 col-md-6 col-12">
                  <div className="">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
              <div>
                {inputs.pageoneLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pageoneLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pageoneFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pageoneFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {inputs.pagetwoLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pagetwoLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pagetwoFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pagetwoFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              {inputs.pagetwoDescription !== "" ? (
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpagetwoDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pagetwoDescription
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
                                  __html: inputs.tamilpagetwoDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pagetwoDescription
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
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="">
                      {inputs.pageimageTwo !== "" ? (
                        <img
                          className="theme-6-image"
                          src={inputs.filePath + inputs.pageimageTwo}
                          alt="theme--image"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "7" ? (
          <div className="container formobileonly">
            <div className="throwaway-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div></div>
                {cardoneall.map((cardoneall, index) => (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="throwaway-each-block">
                      {inputs.cardoneImage !== "" ? (
                        <img
                          className="throwaway-image"
                          src={cardoneall.filePath + cardoneall.cardoneImage}
                          alt="throwaway-image"
                        />
                      ) : (
                        ""
                      )}
                      <div className="throwaway-text-area">
                        <>
                          {" "}
                          {localStorage.getItem("language") === "Tamil" ? (
                            <h3 className="throwaway-content-title">
                              {cardoneall.tamilcardoneTitle === "" ? (
                                <>{cardoneall.cardoneTitle}</>
                              ) : (
                                <>{cardoneall.tamilcardoneTitle}</>
                              )}
                            </h3>
                          ) : (
                            <h3 className="throwaway-content-title">
                              {cardoneall.cardoneTitle}
                            </h3>
                          )}
                        </>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "8" ? (
          <div className="recycle-content-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div style={{ marginTop: "10px" }}></div>

                {cardtwoall.map((cardtwoall, index) => (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="recycle-content-total-card">
                      {cardtwoall.cardtwoImage !== "" ? (
                        <img
                          className="recycle-image"
                          src={cardtwoall.filePath + cardtwoall.cardtwoImage}
                          alt=""
                        ></img>
                      ) : (
                        ""
                      )}
                      <div className="row">
                        <div className="col-6">
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <h5 className="recycle-content-header">
                                {cardtwoall.tamilcardtwoTitle === "" ? (
                                  <>{cardtwoall.cardtwoTitle}</>
                                ) : (
                                  <>{cardtwoall.tamilcardtwoTitle}</>
                                )}
                              </h5>
                            ) : (
                              <h5 className="recycle-content-header">
                                {cardtwoall.cardtwoTitle}
                              </h5>
                            )}
                          </>
                        </div>
                        <div className="col-6 recycle-view-btn">
                          {cardtwoall.pageLink !== "" ? (
                            <Link
                              to={
                                process.env.PUBLIC_URL +
                                "/" +
                                categoryUrl +
                                "/" +
                                cardtwoall.pageUrl
                              }
                              className="recycle-btn"
                            >
                              {localStorage.getItem("language") === "Tamil"
                                ? "காண"
                                : "View"}
                              <MdOutlineArrowForward className="event-block-btn-icon" />
                            </Link>
                          ) : (
                            ""
                          )}
                          {cardtwoall.cardtwoLink !== "" ? (
                            <a
                              rel="noreferrer"
                              href={cardtwoall.cardtwoLink}
                              className="recycle-btn"
                              target="_blank"
                            >
                              {localStorage.getItem("language") === "Tamil"
                                ? "காண"
                                : "View"}
                              <MdOutlineArrowForward className="event-block-btn-icon" />
                            </a>
                          ) : (
                            ""
                          )}
                          {cardtwoall.cardtwoFile !== "" ? (
                            <a
                              rel="noreferrer"
                              href={
                                cardtwoall.filePath + cardtwoall.cardtwoFile
                              }
                              className="recycle-btn"
                              target="_blank"
                            >
                              {localStorage.getItem("language") === "Tamil"
                                ? "காண"
                                : "View"}
                              <MdOutlineArrowForward className="event-block-btn-icon" />
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "9" ? (
          <div className="recycle-content-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="enforcement-page">
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
                  <div style={{ marginTop: "10px" }}></div>
                  <div className="col-12">
                    <div className="recycle-content-table-title">
                      <div className="row">
                        <div className="col-lg-1 col-md-2 col-2 recycle-location-icon-space">
                          <div className="recycle-location-icon">
                            <MdLocationOn />
                          </div>
                        </div>

                        <div className="col-lg-9 col-md-8 col-6">
                          <h1 className="recycle-content-table-header">
                            <>
                              {" "}
                              {localStorage.getItem("language") === "Tamil" ? (
                                <div className="editor-class content-text-change">
                                  {inputs.tamiltableHeading !== "" ? (
                                    <>{inputs.tamiltableHeading}</>
                                  ) : (
                                    <>{inputs.tableHeading}</>
                                  )}
                                </div>
                              ) : (
                                <>{inputs.tableHeading}</>
                              )}
                            </>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <table className="table table-borderless">
                      <thead className="recycle-table-header">
                        <tr>
                          <th className="col-lg-3 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelOne !== "" ? (
                                  <>{inputs.labelOne}</>
                                ) : (
                                  "Label One"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelOne !== "" ? (
                                  <>{inputs.tamillabelOne}</>
                                ) : (
                                  <>
                                    {inputs.labelOne !== "" ? (
                                      <>{inputs.labelOne}</>
                                    ) : (
                                      "Label One"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          <th className="col-lg-4 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelTwo !== "" ? (
                                  <>{inputs.labelTwo}</>
                                ) : (
                                  "Label Two"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelTwo !== "" ? (
                                  <>{inputs.tamillabelTwo}</>
                                ) : (
                                  <>
                                    {inputs.labelTwo !== "" ? (
                                      <>{inputs.labelTwo}</>
                                    ) : (
                                      "Label Two"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          <th className="col-lg-4 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelThree !== "" ? (
                                  <>{inputs.labelThree}</>
                                ) : (
                                  "Label Three"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelThree !== "" ? (
                                  <>{inputs.tamillabelThree}</>
                                ) : (
                                  <>
                                    {inputs.labelThree !== "" ? (
                                      <>{inputs.labelThree}</>
                                    ) : (
                                      "Label Three"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          {inputs.labelFour !== "" ? (
                            <th className="col-lg-4 recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelFour !== "" ? (
                                    <>{inputs.labelFour}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelFour !== "" ? (
                                    <>{inputs.tamillabelFour}</>
                                  ) : (
                                    <>
                                      {inputs.labelFour !== "" ? (
                                        <>{inputs.labelFour}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {cardtableall.map((cardtableall, index) => (
                          <tr className="recycle-table-content">
                            <td className="recycle-table-profile-2">
                              {cardtableall.tableImage !== "" ? (
                                <>
                                  <img
                                    className="recycle-state-image"
                                    src={
                                      cardtableall.filePath +
                                      cardtableall.tableImage
                                    }
                                    alt="recycle-state-image"
                                  />
                                </>
                              ) : (
                                ""
                              )}
                              <div className="">
                                {localStorage.getItem("language") ===
                                "Tamil" ? (
                                  <>
                                    {cardtableall.tamiltableTitle === "" ? (
                                      <>{cardtableall.tableTitle}</>
                                    ) : (
                                      <>{cardtableall.tamiltableTitle}</>
                                    )}
                                  </>
                                ) : (
                                  <>{cardtableall.tableTitle}</>
                                )}
                              </div>
                            </td>
                            {cardtableall.tableDescription !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div className="editor-class content-text-change">
                                        {cardtableall.tamiltableDescription ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.tableDescription
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
                                                  .replaceAll(/alert/gi, "")
                                                  .replaceAll(/Alert/gi, ""),
                                            }}
                                          />
                                        ) : (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.tamiltableDescription
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        className="editor-class content-text-change"
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.tableDescription
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
                              </td>
                            ) : (
                              ""
                            )}

                            <td>
                              <div className="recycle-view-button">
                                {cardtableall.onelinkPage !== "" ? (
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/" +
                                      categoryUrl +
                                      "/" +
                                      cardtableall.pageUrl
                                    }
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </Link>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tableoneLink !== "" &&
                                cardtableall.onelinkPage === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={cardtableall.tableoneLink}
                                    className="recycle-pdf-download-btn"
                                    target="_blank"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tableoneFile !== "" &&
                                cardtableall.tableoneLink === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={
                                      cardtableall.filePath +
                                      cardtableall.tableoneFile
                                    }
                                    target="_blank"
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                            <td>
                              <div className="recycle-view-button">
                                {cardtableall.twolinkPage !== "" ? (
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/" +
                                      categoryUrl +
                                      "/" +
                                      cardtableall.pageUrl
                                    }
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </Link>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tabletwoLink !== "" &&
                                cardtableall.twolinkPage === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={cardtableall.tabletwoLink}
                                    className="recycle-pdf-download-btn"
                                    target="_blank"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tabletwoFile !== "" &&
                                cardtableall.tabletwoLink === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={
                                      cardtableall.filePath +
                                      cardtableall.tabletwoFile
                                    }
                                    target="_blank"
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "12" ? (
          <div className="recycle-content-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="enforcement-page">
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
                  <div style={{ marginTop: "10px" }}></div>
                  <div className="col-12">
                    <div className="recycle-content-table-title">
                      <div className="row">
                        <div className="col-lg-1 col-md-2 col-2 recycle-location-icon-space">
                          <div className="recycle-location-icon">
                            <MdLocationOn />
                          </div>
                        </div>
                        <div className="col-lg-9 col-md-8 col-6">
                          <h1 className="recycle-content-table-header">
                            <>
                              {" "}
                              {localStorage.getItem("language") === "Tamil" ? (
                                <div className="editor-class content-text-change">
                                  {inputs.tamiltableHeading !== "" ? (
                                    <>{inputs.tamiltableHeading}</>
                                  ) : (
                                    <>{inputs.tableHeading}</>
                                  )}
                                </div>
                              ) : (
                                <>{inputs.tableHeading}</>
                              )}
                            </>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <table className="table table-borderless">
                      <thead className="recycle-table-header">
                        <tr>
                          <th className="col-lg-3 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelOne !== "" ? (
                                  <>{inputs.labelOne}</>
                                ) : (
                                  "Label One"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelOne !== "" ? (
                                  <>{inputs.tamillabelOne}</>
                                ) : (
                                  <>
                                    {inputs.labelOne !== "" ? (
                                      <>{inputs.labelOne}</>
                                    ) : (
                                      "Label One"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          <th className="col-lg-4 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelTwo !== "" ? (
                                  <>{inputs.labelTwo}</>
                                ) : (
                                  "Label Two"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelTwo !== "" ? (
                                  <>{inputs.tamillabelTwo}</>
                                ) : (
                                  <>
                                    {inputs.labelTwo !== "" ? (
                                      <>{inputs.labelTwo}</>
                                    ) : (
                                      "Label Two"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          <th className="col-lg-4 recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelThree !== "" ? (
                                  <>{inputs.labelThree}</>
                                ) : (
                                  "Label Three"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelThree !== "" ? (
                                  <>{inputs.tamillabelThree}</>
                                ) : (
                                  <>
                                    {inputs.labelThree !== "" ? (
                                      <>{inputs.labelThree}</>
                                    ) : (
                                      "Label Three"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {cardtableall.map((cardtableall, index) => (
                          <tr className="recycle-table-content">
                            <td className="recycle-table-sno">{index + 1}</td>
                            <>
                              {" "}
                              {localStorage.getItem("language") === "Tamil" ? (
                                <td className="recycle-table-profile">
                                  {cardtableall.tamiltableTitle === "" ? (
                                    <>{cardtableall.tableTitle}</>
                                  ) : (
                                    <>{cardtableall.tamiltableTitle}</>
                                  )}
                                </td>
                              ) : (
                                <td className="recycle-table-profile">
                                  {cardtableall.tableTitle}
                                </td>
                              )}
                            </>
                            <td>
                              <div className="recycle-view-button">
                                {cardtableall.onelinkPage !== "" ? (
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/" +
                                      categoryUrl +
                                      "/" +
                                      cardtableall.pageUrl
                                    }
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </Link>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tableoneLink !== "" &&
                                cardtableall.onelinkPage === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={cardtableall.tableoneLink}
                                    className="recycle-pdf-download-btn"
                                    target="_blank"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                                {cardtableall.tableoneFile !== "" &&
                                cardtableall.tableoneLink === "" ? (
                                  <a
                                    rel="noreferrer"
                                    href={
                                      cardtableall.filePath +
                                      cardtableall.tableoneFile
                                    }
                                    target="_blank"
                                    className="recycle-pdf-download-btn"
                                  >
                                    <span className="recycle-view-hover">
                                      {localStorage.getItem("language") ===
                                      "Tamil"
                                        ? "காண"
                                        : "View"}
                                    </span>{" "}
                                    <MdOutlineArrowForward className="ico" />
                                  </a>
                                ) : (
                                  ""
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "10" ? (
          <div className="container formobileonly">
            <div className="contact-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div style={{ marginTop: "10px" }}></div>
                <div className="accordion" id="accordionExample">
                  <div className="row">
                    {cardaccordionall.map((cardaccordionall, index) => (
                      <div className="col-lg-6 col-md-6 col-12">
                        <div className="accordion-item">
                          <div className="accordion-item-contact-page">
                            <h2
                              className="accordion-header"
                              id={`heading${index}`}
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <h3 className="accordion-button-contact-title">
                                      {cardaccordionall.tamilaccordionTitle ===
                                      "" ? (
                                        <>{cardaccordionall.accordionTitle}</>
                                      ) : (
                                        <>
                                          {cardaccordionall.tamilaccordionTitle}
                                        </>
                                      )}
                                    </h3>
                                  ) : (
                                    <h3 className="accordion-button-contact-title">
                                      {cardaccordionall.accordionTitle}{" "}
                                    </h3>
                                  )}
                                </>
                              </button>
                            </h2>
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse${
                                index === 0 ? "show" : ""
                              }`}
                              data-bs-parent="#accordionExample"
                              aria-labelledby={`heading${index}`}
                            >
                              <div className="accordion-body">
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div className="editor-class content-text-change">
                                        {cardaccordionall.tamilaccordionDescription ===
                                        "" ? (
                                          <>
                                            <div
                                              className="link-other"
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  cardaccordionall.accordionDescription
                                                    .replaceAll(
                                                      /<script>/gi,
                                                      ""
                                                    )
                                                    .replaceAll(
                                                      /<\/script>/gi,
                                                      ""
                                                    )
                                                    .replaceAll(
                                                      /javascript/gi,
                                                      ""
                                                    )
                                                    .replaceAll(/alert/gi, "")
                                                    .replaceAll(/Alert/gi, ""),
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <div
                                            className="link-other"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardaccordionall.tamilaccordionDescription
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        className="editor-class content-text-change link-other"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            cardaccordionall.accordionDescription
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.pageTemplate === "11" ? (
          <div className="container formobileonly">
            <div className="govt-notice-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div style={{ marginTop: "10px" }}></div>
                <div className="accordion" id="accordionExample">
                  <div className="row">
                    {cardaccordionall.map((cardaccordionall, index) => (
                      <div className="col-12">
                        <div className="accordion-item">
                          <div className="accordion-item-contact-page">
                            <h2
                              className="accordion-header"
                              id={`heading${index}`}
                            >
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#collapse${index}`}
                                aria-expanded="true"
                                aria-controls={`collapse${index}`}
                              >
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <h3 className="accordion-button-contact-title">
                                      {cardaccordionall.tamilaccordionTitle ===
                                      "" ? (
                                        <>{cardaccordionall.accordionTitle}</>
                                      ) : (
                                        <>
                                          {cardaccordionall.tamilaccordionTitle}
                                        </>
                                      )}
                                    </h3>
                                  ) : (
                                    <h3 className="accordion-button-contact-title">
                                      {cardaccordionall.accordionTitle}{" "}
                                    </h3>
                                  )}
                                </>
                              </button>
                            </h2>
                            <div
                              id={`collapse${index}`}
                              className={`accordion-collapse collapse ${
                                index === 0 ? "show" : ""
                              }`}
                              data-bs-parent="#accordionExample"
                              aria-labelledby={`heading${index}`}
                            >
                              <div className="accordion-body">
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div className="editor-class content-text-change">
                                        {cardaccordionall.tamilaccordionDescription ===
                                        "" ? (
                                          <>
                                            <div
                                              className="link-other"
                                              dangerouslySetInnerHTML={{
                                                __html:
                                                  cardaccordionall.accordionDescription
                                                    .replaceAll(
                                                      /<script>/gi,
                                                      ""
                                                    )
                                                    .replaceAll(
                                                      /<\/script>/gi,
                                                      ""
                                                    )
                                                    .replaceAll(
                                                      /javascript/gi,
                                                      ""
                                                    )
                                                    .replaceAll(/alert/gi, "")
                                                    .replaceAll(/Alert/gi, ""),
                                              }}
                                            />
                                          </>
                                        ) : (
                                          <div
                                            className="link-other"
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardaccordionall.tamilaccordionDescription
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        className="editor-class content-text-change link-other"
                                        dangerouslySetInnerHTML={{
                                          __html:
                                            cardaccordionall.accordionDescription
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
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.linkOther === "Gallery" ? (
          <div className="container formobileonly">
            <div className="media-gallery-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div style={{ marginTop: "10px" }}></div>
              </div>
              {galleryall.map((gallery, index) => (
                <div className="row media-gallery-image-hover">
                  <div className="col-lg-3 media-gallery-text-section">
                    <div className="media-gallery-text-area">
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <h3 className="media-gallery-titles">
                            {gallery.tamilcategoryName === "" ? (
                              <>{gallery.tamilcategoryName}</>
                            ) : (
                              <>{gallery.categoryName}</>
                            )}
                          </h3>
                        ) : (
                          <h3 className="media-gallery-titles">
                            {gallery.categoryName}
                          </h3>
                        )}
                      </>
                      <button className="gallery-view-btn">
                        <Link
                          className="gallery-select"
                          to={
                            process.env.PUBLIC_URL +
                            "/events/media-gallery/" +
                            `${gallery.id}`
                          }
                        >
                          {localStorage.getItem("language") === "Tamil"
                            ? "மேலும் பார்க்க"
                            : "view more"}
                        </Link>
                      </button>
                    </div>
                  </div>
                  {gallery.gallery.map((subgallery, index) => (
                    <div className="col-lg-3 media-gallery-image-section">
                      {inputs.galleryImage !== "" ? (
                        <img
                          className="media-gallery-image"
                          src={subgallery.filePath + subgallery.galleryImage}
                          alt=""
                        ></img>
                      ) : (
                        ""
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.linkOther === "Events" ? (
          <div className="container formobileonly">
            <div className="event-block-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <div className="editor-class content-text-change">
                          {inputs.tamilpageDescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.pageDescription
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
                                __html: inputs.tamilpageDescription
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
                          className="editor-class content-text-change"
                          dangerouslySetInnerHTML={{
                            __html: inputs.pageDescription
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
                <div style={{ marginTop: "10px" }}></div>
                {eventall.map((event, index) => (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="main-event-card-list">
                      {inputs.eventImage !== "" ? (
                        <img
                          className="events-image1"
                          src={event.filePath + event.eventImage}
                          alt=""
                        ></img>
                      ) : (
                        ""
                      )}
                      <div className="recent-blog-card-event">
                        <>
                          {" "}
                          {localStorage.getItem("language") === "Tamil" ? (
                            <>
                              <h5 className="recent-blog-header">
                                {event.tamileventTitle === "" ? (
                                  <>
                                    {event.eventTitle.length > 60
                                      ? `${event.eventTitle.substring(
                                          0,
                                          60
                                        )}...`
                                      : event.eventTitle}
                                  </>
                                ) : (
                                  <>
                                    {event.tamileventTitle.length > 40
                                      ? `${event.tamileventTitle.substring(
                                          0,
                                          40
                                        )}...`
                                      : event.tamileventTitle}
                                  </>
                                )}
                              </h5>
                              <p className="recent-blog-details">
                                {event.tamileventShortdescription === "" ? (
                                  <>{event.eventShortdescription}</>
                                ) : (
                                  <>{event.tamileventShortdescription}</>
                                )}
                              </p>
                            </>
                          ) : (
                            <>
                              <h5 className="recent-blog-header">
                                {event.eventTitle.length > 60
                                  ? `${event.eventTitle.substring(0, 60)}...`
                                  : event.eventTitle}
                              </h5>
                              <p className="recent-blog-details">
                                {event.eventShortdescription}
                              </p>
                            </>
                          )}
                        </>
                        <div className="event-block-calender-section">
                          <AiOutlineCalendar className="event-block-calender-icon" />
                          <p className="event-block-calender">
                            {/* {event.eventDate} */}
                            {new Date(event.eventDate)
                              .toLocaleDateString("en-GB")
                              .slice(0, 10)
                              .split("/")
                              .join("-")}
                          </p>
                        </div>
                        <div className="event-block-view-btn">
                          <Link
                            to={
                              process.env.PUBLIC_URL +
                              "/events/event-block/" +
                              `${event.id}`
                            }
                          >
                            <button className="event-block-btn">
                              {localStorage.getItem("language") === "Tamil"
                                ? "காண"
                                : "View"}
                              <MdOutlineArrowForward className="event-block-btn-icon" />
                            </button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.linkOther === "News" ? (
          <div className="container formobileonly">
            <div className="news-and-updates-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <h3 className="news-and-updates-title">
                  {localStorage.getItem("language") === "Tamil"
                    ? "சர்வதேச"
                    : "INTERNATIONAL"}
                </h3>
                <div className="col-lg-6 col-12">
                  <hr className="hr-line"></hr>
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "இடம்பெற்றது"
                      : "Featured"}
                  </h5>
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/news/news-block/" +
                      `${inputs.lastinternationalnewsId}`
                    }
                  >
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <p className="news-and-updates-details">
                          {inputs.lastinternationaltamilnewsTitle !== "" ? (
                            <>{inputs.lastinternationaltamilnewsTitle}</>
                          ) : (
                            <>{inputs.lastinternationalnewsTitle}</>
                          )}
                        </p>
                      ) : (
                        <p className="news-and-updates-details">
                          {inputs.lastinternationalnewsTitle}
                        </p>
                      )}
                    </>
                  </Link>
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <p className="event-left-content-description">
                        {inputs.lastinternationaltamilnewsShortdescription !==
                        "" ? (
                          <>
                            {inputs.lastinternationaltamilnewsShortdescription}
                          </>
                        ) : (
                          <>{inputs.lastinternationalnewsShortdescription}</>
                        )}
                      </p>
                    ) : (
                      <p className="event-left-content-description">
                        {inputs.lastinternationalnewsShortdescription}
                      </p>
                    )}
                  </>
                  <div className="news-and-updates-calender-section">
                    <AiOutlineCalendar className="recent-blog-calender-icon" />
                    <p className="recent-blog-calender">
                      {" "}
                      {new Date(
                        inputs.lastinternationalnewsDate
                      ).toDateString()}
                    </p>
                  </div>
                  <hr className="hr-line"></hr>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-image-top1">
                    <img
                      className="news-and-updates-image-top"
                      src={
                        inputs.lastinternationalnewsfilePath +
                        inputs.lastinternationalnewsImage
                      }
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "கடந்த செய்திகள்"
                      : "Past News"}
                  </h5>
                  <hr className="hr-line"></hr>
                  <img
                    className="news-and-updates-image"
                    src={
                      inputs.internationalnewsfilePath +
                      inputs.internationalnewsImage
                    }
                    alt=""
                  ></img>
                  <div className="news-and-updates-past-news">
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/news/news-block/" +
                        `${inputs.internationalnewsId}`
                      }
                    >
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <p className="news-and-updates-past-news-details">
                            {inputs.tamilinternationalnewsTitle === "" ? (
                              <>{inputs.internationalnewsTitle}</>
                            ) : (
                              <>{inputs.tamilinternationalnewsTitle}</>
                            )}
                          </p>
                        ) : (
                          <p className="news-and-updates-past-news-details">
                            {inputs.internationalnewsTitle}
                          </p>
                        )}
                      </>
                    </Link>
                    <div className="news-and-updates-calender-section">
                      {inputs.internationalnewsDate === "" ? (
                        "No Past News"
                      ) : (
                        <>
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(
                              inputs.internationalnewsDate
                            ).toDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-news" id="news">
                    {internationnews.map((news, index) => (
                      <>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/news/news-block/" +
                            `${news.id}`
                          }
                        >
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <p className="news-and-updates-news-details">
                                {news.tamilnewsTitle === "" ? (
                                  <>{news.newsTitle}</>
                                ) : (
                                  <>{news.tamilnewsTitle}</>
                                )}
                              </p>
                            ) : (
                              <p className="news-and-updates-news-details">
                                {news.newsTitle}
                              </p>
                            )}
                          </>
                        </Link>
                        <div className="news-and-updates-calender-section">
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(news.newsDate).toDateString()}
                          </p>
                        </div>
                        <hr className="hr-line"></hr>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                <h3 className="news-and-updates-title national">
                  {localStorage.getItem("language") === "Tamil"
                    ? "தேசிய"
                    : "NATIONAL"}
                </h3>
                <div className="col-lg-6 col-12">
                  <hr className="hr-line"></hr>
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "இடம்பெற்றது"
                      : "Featured"}
                  </h5>
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/news/news-block/" +
                      `${inputs.lastnationalnewsId}`
                    }
                  >
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <p className="news-and-updates-details">
                          {inputs.lastnationaltamilnewsTitle === "" ? (
                            <>{inputs.lastnationalnewsTitle}</>
                          ) : (
                            <>{inputs.lastnationaltamilnewsTitle}</>
                          )}
                        </p>
                      ) : (
                        <p className="news-and-updates-details">
                          {inputs.lastnationalnewsTitle}
                        </p>
                      )}
                    </>
                  </Link>
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <p className="event-left-content-description">
                          {inputs.lastnationaltamilnewsShortdescription ===
                          "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.lastnationalnewsShortdescription
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
                                __html:
                                  inputs.lastnationaltamilnewsShortdescription
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
                        <p className="event-left-content-description">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: inputs.lastnationalnewsShortdescription
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

                  <div className="news-and-updates-calender-section">
                    <AiOutlineCalendar className="recent-blog-calender-icon" />
                    <p className="recent-blog-calender">
                      {" "}
                      {new Date(inputs.lastnationalnewsDate).toDateString()}
                    </p>
                  </div>
                  <hr className="hr-line"></hr>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-image-top1">
                    <img
                      className="news-and-updates-image-top"
                      src={
                        inputs.lastnationalnewsfilePath +
                        inputs.lastnationalnewsImage
                      }
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "கடந்த செய்திகள்"
                      : "Past News"}
                  </h5>
                  <hr className="hr-line"></hr>
                  <img
                    className="news-and-updates-image"
                    src={inputs.nationalnewsfilePath + inputs.nationalnewsImage}
                    alt=""
                  ></img>
                  <div className="news-and-updates-past-news">
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/news/news-block/" +
                        `${inputs.nationalnewsId}`
                      }
                    >
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <p className="news-and-updates-past-news-details">
                            {inputs.nationaltamilnewsTitle === "" ? (
                              <>{inputs.nationalnewsTitle}</>
                            ) : (
                              <>{inputs.nationaltamilnewsTitle}</>
                            )}
                          </p>
                        ) : (
                          <p className="news-and-updates-past-news-details">
                            {inputs.nationalnewsTitle}
                          </p>
                        )}
                      </>
                    </Link>
                    <div className="news-and-updates-calender-section">
                      {inputs.nationalnewsDate === "" ? (
                        "No Past News"
                      ) : (
                        <>
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(inputs.nationalnewsDate).toDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-news" id="news">
                    {nationnews.map((news, index) => (
                      <>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/news/news-block/" +
                            `${news.id}`
                          }
                        >
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <p className="news-and-updates-news-details">
                                {news.tamilnewsTitle === "" ? (
                                  <>{news.newsTitle}</>
                                ) : (
                                  <>{news.tamilnewsTitle}</>
                                )}
                              </p>
                            ) : (
                              <p className="news-and-updates-news-details">
                                {news.newsTitle}
                              </p>
                            )}
                          </>
                        </Link>
                        <div className="news-and-updates-calender-section">
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(news.newsDate).toDateString()}
                          </p>
                        </div>
                        <hr className="hr-line"></hr>
                      </>
                    ))}
                  </div>
                </div>
              </div>
              <div className="row">
                <h3 className="news-and-updates-title state">
                  {localStorage.getItem("language") === "Tamil"
                    ? "மாநில"
                    : "STATE"}
                </h3>
                <div className="col-lg-6 col-12">
                  <hr className="hr-line"></hr>
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "இடம்பெற்றது"
                      : "Featured"}
                  </h5>
                  <Link
                    to={
                      process.env.PUBLIC_URL +
                      "/news/news-block/" +
                      `${inputs.laststatenewsId}`
                    }
                  >
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <p className="news-and-updates-details">
                          {inputs.laststatetamilnewsTitle === "" ? (
                            <>{inputs.laststatenewsTitle}</>
                          ) : (
                            <>{inputs.laststatetamilnewsTitle}</>
                          )}
                        </p>
                      ) : (
                        <p className="news-and-updates-details">
                          {inputs.laststatenewsTitle}
                        </p>
                      )}
                    </>
                  </Link>
                  <>
                    {" "}
                    {localStorage.getItem("language") === "Tamil" ? (
                      <>
                        <p className="event-left-content-description">
                          {inputs.laststatetamilnewsShortdescription === "" ? (
                            <div
                              dangerouslySetInnerHTML={{
                                __html: inputs.laststatenewsShortdescription
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
                                __html:
                                  inputs.laststatetamilnewsShortdescription
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
                        <p className="event-left-content-description">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: inputs.laststatenewsShortdescription
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
                  <div className="news-and-updates-calender-section">
                    <AiOutlineCalendar className="recent-blog-calender-icon" />
                    <p className="recent-blog-calender">
                      {" "}
                      {new Date(inputs.laststatenewsDate).toDateString()}
                    </p>
                  </div>
                  <hr className="hr-line"></hr>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-image-top1">
                    <img
                      className="news-and-updates-image-top"
                      src={
                        inputs.laststatenewsfilePath + inputs.laststatenewsImage
                      }
                      alt=""
                    ></img>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 col-12">
                  <h5 className="news-and-updates-header">
                    {localStorage.getItem("language") === "Tamil"
                      ? "கடந்த செய்திகள்"
                      : "Past News"}
                  </h5>
                  <hr className="hr-line"></hr>
                  <img
                    className="news-and-updates-image"
                    src={inputs.statenewsfilePath + inputs.statenewsImage}
                    alt=""
                  ></img>
                  <div className="news-and-updates-past-news">
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/news/news-block/" +
                        `${inputs.statenewsId}`
                      }
                    >
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <p className="news-and-updates-past-news-details">
                            {inputs.statetamilnewsTitle === "" ? (
                              <>{inputs.statenewsTitle}</>
                            ) : (
                              <>{inputs.statetamilnewsTitle}</>
                            )}
                          </p>
                        ) : (
                          <p className="news-and-updates-past-news-details">
                            {inputs.statenewsTitle}
                          </p>
                        )}
                      </>
                    </Link>
                    <div className="news-and-updates-calender-section">
                      {inputs.statenewsDate === "" ? (
                        "No Past News"
                      ) : (
                        <>
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(inputs.statenewsDate).toDateString()}
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-lg-6 col-12">
                  <div className="news-and-updates-news" id="news">
                    {statenews.map((news, index) => (
                      <>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/news/news-block/" +
                            `${news.id}`
                          }
                        >
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <p className="news-and-updates-details">
                                {news.tamilnewsTitle === "" ? (
                                  <>{news.newsTitle}</>
                                ) : (
                                  <>{news.tamilnewsTitle}</>
                                )}
                              </p>
                            ) : (
                              <p className="news-and-updates-news-details">
                                {news.newsTitle}
                              </p>
                            )}
                          </>
                        </Link>
                        <div className="news-and-updates-calender-section">
                          <AiOutlineCalendar className="recent-blog-calender-icon" />
                          <p className="recent-blog-calender">
                            {" "}
                            {new Date(news.newsDate).toDateString()}
                          </p>
                        </div>
                        <hr className="hr-line"></hr>
                      </>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "13" ? (
          <div className="page-layout-theme-6">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-12">
                  <div className="">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
              <div>
                {inputs.pageoneLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pageoneLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pageoneFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pageoneFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div>
                {inputs.pagetwoLink !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.pagetwoLink}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
                {inputs.pagetwoFile !== "" ? (
                  <div className="pdf-download-btn">
                    <a
                      rel="noreferrer"
                      href={inputs.filePath + inputs.pagetwoFile}
                      className="task-pdf-download-btn"
                      target="_blank"
                    >
                      {localStorage.getItem("language") === "Tamil"
                        ? "(click to view full details)"
                        : "(click to view full details)"}
                    </a>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="feedback-content-section">
                <div className="row">
                  <div className="col-12">
                    <form onSubmit={handleSubmit} autoComplete="off">
                      <div className="input-field">
                        <div className="all-input-field">
                          <span className="input-field-icon">
                            <BsFillPersonFill />
                          </span>
                          <input
                            type="text"
                            className="form-control1"
                            id="name"
                            name="name"
                            value={contact.name}
                            onChange={handleChange}
                            placeholder={
                              localStorage.getItem("language") === "Tamil"
                                ? "பெயர்"
                                : "Name "
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="all-input-field">
                          <span className="input-field-icon">
                            <MdMail />
                          </span>
                          <input
                            type="email"
                            className="form-control1"
                            id="email"
                            name="email"
                            value={contact.email}
                            onChange={handleChange}
                            placeholder={
                              localStorage.getItem("language") === "Tamil"
                                ? "மின்னஞ்சல்"
                                : "Email "
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="all-input-field">
                          <span className="input-field-icon">
                            <FaMobileAlt />
                          </span>
                          <input
                            type="text"
                            className="form-control1"
                            id="mobile"
                            name="mobile"
                            value={contact.mobile}
                            onChange={handleChange}
                            placeholder={
                              localStorage.getItem("language") === "Tamil"
                                ? "கைபேசி எண்"
                                : "Mobile No. "
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                        <div className="all-input-field">
                          <span className="input-field-icon">
                            <BsChatLeftDotsFill />
                          </span>
                          <textarea
                            className="form-control2"
                            id="message"
                            name="message"
                            value={contact.message}
                            onChange={handleChange}
                            placeholder={
                              localStorage.getItem("language") === "Tamil"
                                ? "செய்தி"
                                : "Type Your Message/ Feedback here... "
                            }
                            rows="4"
                          ></textarea>
                        </div>
                        <div className="all-input-field">
                          <span className="input-field-icon">
                            <FaFileUpload />
                          </span>
                          <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg, application/pdf, application/vnd.ms-excel,video/mp4,video/mp3"
                            className="form-control1"
                            id="contactImage"
                            name="contactImage"
                            onChange={handleChange}
                            placeholder={
                              localStorage.getItem("language") === "Tamil"
                                ? "கோப்பு பதிவேற்றம்"
                                : "File Upload "
                            }
                            aria-describedby="emailHelp"
                          />
                        </div>
                      </div>
                      <div className="feedback-send-btn">
                        <div className="feedback-view-btn">
                          <button className="feedback-btn" type="submit">
                            <TiLocationArrow className="feedback-btn-icon" />
                            <span className="feedback-btn-space">
                              {localStorage.getItem("language") === "Tamil"
                                ? "அனுப்பு"
                                : "Send"}
                            </span>
                          </button>
                        </div>
                      </div>
                      <div
                        id="thanksmessage"
                        style={{ display: "none", color: "green" }}
                      >
                        Thanks for your feedback....
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {inputs.linkOther === "Blogs" ? (
          <div className="container formobileonly">
            <div className="recent-blog-content-section">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row  recent-blog-main-image-overlap">
                <div className="col-12"></div>
              </div>
              <div className="row">
                <div className="col-lg-8 col-md-6 col-7">
                  <h5 className="recent-blog-title">
                    {localStorage.getItem("language") === "Tamil"
                      ? "வெளியீடுகள்"
                      : "Publications"}{" "}
                  </h5>
                </div>
                <div className="col-lg-4 col-md-6 col-5">
                  <select
                    id="categoryId"
                    name="categoryId"
                    className="blogcategory_change"
                    onChange={blogcategory_change}
                  >
                    <option value="">Select All</option>
                    <option value="International">
                      {localStorage.getItem("language") === "Tamil"
                        ? "சர்வதேச"
                        : "International"}
                    </option>
                    <option value="National">
                      {localStorage.getItem("language") === "Tamil"
                        ? "தேசிய"
                        : "National"}
                    </option>
                    <option value="State">
                      {localStorage.getItem("language") === "Tamil"
                        ? "மாநிலம்"
                        : "State"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="row">
                {blogall.map((blog, index) => (
                  <div className="col-lg-4 col-md-6 col-12">
                    <div className="main-event-card-list">
                      <div className="recent-blog-head-line-main">
                        <button className="recent-blog-head-line-btn">
                          {localStorage.getItem("language") === "Tamil" ? (
                            <>
                              {blog.blogCategory === "International"
                                ? "சர்வதேச"
                                : ""}
                              {blog.blogCategory === "National" ? "தேசிய" : ""}
                              {blog.blogCategory === "State" ? "மாநிலம்" : ""}
                            </>
                          ) : (
                            <>{blog.blogCategory}</>
                          )}
                        </button>
                      </div>
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          "/blog/blog-block/" +
                          `${blog.id}`
                        }
                      >
                        <img
                          className="events-image1"
                          src={blog.filePath + blog.blogImage}
                          alt=""
                        ></img>
                        <div className="recent-blog-card-event">
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <h5 className="recent-blog-header">
                                {blog.tamilblogTitle === "" ? (
                                  <>{blog.blogTitle}</>
                                ) : (
                                  <>{blog.tamilblogTitle}</>
                                )}
                              </h5>
                            ) : (
                              <h5 className="recent-blog-header">
                                {blog.blogTitle}
                              </h5>
                            )}
                          </>

                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <p className="recent-blog-details">
                                {blog.tamilblogShortdescription === "" ? (
                                  <>{blog.blogShortdescription}</>
                                ) : (
                                  <>{blog.tamilblogShortdescription}</>
                                )}
                              </p>
                            ) : (
                              <p className="recent-blog-details">
                                {blog.blogShortdescription}
                              </p>
                            )}
                          </>
                          <div className="recent-blog-calender-section">
                            <AiOutlineCalendar className="recent-blog-calender-icon" />
                            <p className="recent-blog-calender">
                              {" "}
                              {new Date(blog.blogDate).toDateString()}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "16" ? (
          <div className="timeline-content-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="timeline-block">
                <div className="timeline-details">
                  <VerticalTimeline lineColor={"#E4E7EB"}>
                    {timelineall.map((timeline, index) => (
                      <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{
                          background: "#ffffff",
                          color: "#000000",
                        }}
                        contentArrowStyle={{
                          borderRight: "7px solid  rgb(33, 150, 243)",
                        }}
                        date={new Date(timeline.timelineDate)
                          .toLocaleDateString("en-GB")
                          .slice(0, 10)
                          .split("/")
                          .join("-")}
                        iconStyle={{ background: "#fff", color: "#fff" }}
                        icon={<FcTimeline />}
                      >
                        <div className="clearfix"></div>
                        <p className="timelinetext">
                          <>
                            {" "}
                            {localStorage.getItem("language") === "Tamil" ? (
                              <>
                                <div className="vertical-timeline-element-title">
                                  {inputs.tamiltimelineTitle === "" ? (
                                    <h3
                                      className="vertical-timeline-element-title"
                                      dangerouslySetInnerHTML={{
                                        __html: timeline.timelineTitle
                                          .replaceAll(/<script>/gi, "")
                                          .replaceAll(/<\/script>/gi, "")
                                          .replaceAll(/javascript/gi, "")
                                          .replaceAll(/alert/gi, "")
                                          .replaceAll(/Alert/gi, ""),
                                      }}
                                    ></h3>
                                  ) : (
                                    <h3
                                      className="vertical-timeline-element-title"
                                      dangerouslySetInnerHTML={{
                                        __html: timeline.tamiltimelineTitle
                                          .replaceAll(/<script>/gi, "")
                                          .replaceAll(/<\/script>/gi, "")
                                          .replaceAll(/javascript/gi, "")
                                          .replaceAll(/alert/gi, "")
                                          .replaceAll(/Alert/gi, ""),
                                      }}
                                    ></h3>
                                  )}
                                </div>
                              </>
                            ) : (
                              <>
                                <h3
                                  className="vertical-timeline-element-title"
                                  dangerouslySetInnerHTML={{
                                    __html: timeline.timelineTitle
                                      .replaceAll(/<script>/gi, "")
                                      .replaceAll(/<\/script>/gi, "")
                                      .replaceAll(/javascript/gi, "")
                                      .replaceAll(/alert/gi, "")
                                      .replaceAll(/Alert/gi, ""),
                                  }}
                                ></h3>
                              </>
                            )}
                          </>
                          {localStorage.getItem("language") === "Tamil" ? (
                            <>
                              <div className="vertical-timeline-element-title">
                                {inputs.tamiltimelineDescription === "" ? (
                                  <h3
                                    className="vertical-timeline-element-title"
                                    dangerouslySetInnerHTML={{
                                      __html: timeline.timelineDescription
                                        .replaceAll(/<script>/gi, "")
                                        .replaceAll(/<\/script>/gi, "")
                                        .replaceAll(/javascript/gi, "")
                                        .replaceAll(/alert/gi, "")
                                        .replaceAll(/Alert/gi, ""),
                                    }}
                                  ></h3>
                                ) : (
                                  <h3
                                    className="vertical-timeline-element-title"
                                    dangerouslySetInnerHTML={{
                                      __html: timeline.tamiltimelineDescription
                                        .replaceAll(/<script>/gi, "")
                                        .replaceAll(/<\/script>/gi, "")
                                        .replaceAll(/javascript/gi, "")
                                        .replaceAll(/alert/gi, "")
                                        .replaceAll(/Alert/gi, ""),
                                    }}
                                  ></h3>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              <div
                                className="vertical-timeline-element-details"
                                dangerouslySetInnerHTML={{
                                  __html: timeline.timelineDescription
                                    .replaceAll(/<script>/gi, "")
                                    .replaceAll(/<\/script>/gi, "")
                                    .replaceAll(/javascript/gi, "")
                                    .replaceAll(/alert/gi, "")
                                    .replaceAll(/Alert/gi, ""),
                                }}
                              />
                            </>
                          )}
                        </p>
                      </VerticalTimelineElement>
                    ))}
                  </VerticalTimeline>
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {inputs.pageTemplate === "14" ? (
          <div className="recycle-content-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
              <div className="enforcement-page">
                <div className="row">
                  <div className="col-12">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <div className="editor-class content-text-change">
                            {inputs.tamilpageDescription === "" ? (
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: inputs.pageDescription
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
                                  __html: inputs.tamilpageDescription
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
                            className="editor-class content-text-change"
                            dangerouslySetInnerHTML={{
                              __html: inputs.pageDescription
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
                  <div style={{ marginTop: "10px" }}></div>
                  <div className="col-12">
                    <div className="recycle-content-table-title">
                      <div className="row">
                        <div className="col-lg-1 col-md-2 col-2 recycle-location-icon-space">
                          <div className="recycle-location-icon">
                            <MdLocationOn />
                          </div>
                        </div>

                        <div className="col-lg-9 col-md-8 col-6">
                          <h1 className="recycle-content-table-header">
                            <>
                              {" "}
                              {localStorage.getItem("language") === "Tamil" ? (
                                <div className="editor-class content-text-change">
                                  {inputs.tamiltableHeading !== "" ? (
                                    <>{inputs.tamiltableHeading}</>
                                  ) : (
                                    <>{inputs.tableHeading}</>
                                  )}
                                </div>
                              ) : (
                                <>{inputs.tableHeading}</>
                              )}
                            </>
                          </h1>
                        </div>
                      </div>
                    </div>
                    <table className="table table-borderless">
                      <thead className="recycle-table-header">
                        <tr>
                          <th className="col recycle-table-title-header">
                            {localStorage.getItem("language") !== "Tamil" ? (
                              <>
                                {inputs.labelOne !== "" ? (
                                  <>{inputs.labelOne}</>
                                ) : (
                                  "Label One"
                                )}
                              </>
                            ) : (
                              <>
                                {inputs.tamillabelOne !== "" ? (
                                  <>{inputs.tamillabelOne}</>
                                ) : (
                                  <>
                                    {inputs.labelOne !== "" ? (
                                      <>{inputs.labelOne}</>
                                    ) : (
                                      "Label One"
                                    )}
                                  </>
                                )}
                              </>
                            )}
                          </th>
                          {inputs.labelTwo !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelTwo !== "" ? (
                                    <>{inputs.labelTwo}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelTwo !== "" ? (
                                    <>{inputs.tamillabelTwo}</>
                                  ) : (
                                    <>
                                      {inputs.labelTwo !== "" ? (
                                        <>{inputs.labelTwo}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelThree !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelThree !== "" ? (
                                    <>{inputs.labelThree}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelThree !== "" ? (
                                    <>{inputs.tamillabelThree}</>
                                  ) : (
                                    <>
                                      {inputs.labelThree !== "" ? (
                                        <>{inputs.labelThree}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelTwo !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelFour !== "" ? (
                                    <>{inputs.labelFour}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelFour !== "" ? (
                                    <>{inputs.tamillabelFour}</>
                                  ) : (
                                    <>
                                      {inputs.labelFour !== "" ? (
                                        <>{inputs.labelFour}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelFive !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelFive !== "" ? (
                                    <>{inputs.labelFive}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelFive !== "" ? (
                                    <>{inputs.tamillabelFive}</>
                                  ) : (
                                    <>
                                      {inputs.labelFive !== "" ? (
                                        <>{inputs.labelFive}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelSix !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelSix !== "" ? (
                                    <>{inputs.labelSix}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelSix !== "" ? (
                                    <>{inputs.tamillabelSix}</>
                                  ) : (
                                    <>
                                      {inputs.labelSix !== "" ? (
                                        <>{inputs.labelSix}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelSeven !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelSeven !== "" ? (
                                    <>{inputs.labelSeven}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelSeven !== "" ? (
                                    <>{inputs.tamillabelSeven}</>
                                  ) : (
                                    <>
                                      {inputs.labelSeven !== "" ? (
                                        <>{inputs.labelSeven}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                          {inputs.labelEight !== "" ? (
                            <th className="col recycle-table-title-header">
                              {localStorage.getItem("language") !== "Tamil" ? (
                                <>
                                  {inputs.labelEight !== "" ? (
                                    <>{inputs.labelEight}</>
                                  ) : (
                                    ""
                                  )}
                                </>
                              ) : (
                                <>
                                  {inputs.tamillabelEight !== "" ? (
                                    <>{inputs.tamillabelEight}</>
                                  ) : (
                                    <>
                                      {inputs.labelEight !== "" ? (
                                        <>{inputs.labelEight}</>
                                      ) : (
                                        ""
                                      )}
                                    </>
                                  )}
                                </>
                              )}
                            </th>
                          ) : (
                            ""
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {cardtableeightall.map((cardtableall, index) => (
                          <tr className="recycle-table-content">
                            <td>
                              {localStorage.getItem("language") === "Tamil" ? (
                                <>
                                  <div>
                                    {cardtableall.tamillabelonecode === "" ? (
                                      <div
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelonecode
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
                                          __html: cardtableall.tamillabelonecode
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
                                    dangerouslySetInnerHTML={{
                                      __html: cardtableall.labelonecode
                                        .replaceAll(/<script>/gi, "")
                                        .replaceAll(/<\/script>/gi, "")
                                        .replaceAll(/javascript/gi, "")
                                        .replaceAll(/alert/gi, "")
                                        .replaceAll(/Alert/gi, ""),
                                    }}
                                  />
                                </>
                              )}
                            </td>
                            {cardtableall.labeltwocode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabeltwocode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: cardtableall.labeltwocode
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
                                              __html:
                                                cardtableall.tamillabeltwocode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labeltwocode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labelthreecode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabelthreecode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.labelthreecode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
                                                  .replaceAll(/alert/gi, "")
                                                  .replaceAll(/Alert/gi, ""),
                                            }}
                                          />
                                        ) : (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.tamillabelthreecode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelthreecode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labelfourcode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabelfourcode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: cardtableall.labelfourcode
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
                                              __html:
                                                cardtableall.tamillabelfourcode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelfourcode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labelfivecode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabelfivecode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: cardtableall.labelfivecode
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
                                              __html:
                                                cardtableall.tamillabelfivecode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelfivecode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labelsixcode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabelsixcode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html: cardtableall.labelsixcode
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
                                              __html:
                                                cardtableall.tamillabelsixcode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelsixcode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labelsevencode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabelsevencode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.labelsevencode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
                                                  .replaceAll(/alert/gi, "")
                                                  .replaceAll(/Alert/gi, ""),
                                            }}
                                          />
                                        ) : (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.tamillabelsevencode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labelsevencode
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
                              </td>
                            ) : (
                              ""
                            )}

                            {cardtableall.labeleightcode !== "" ? (
                              <td>
                                <>
                                  {" "}
                                  {localStorage.getItem("language") ===
                                  "Tamil" ? (
                                    <>
                                      <div>
                                        {cardtableall.tamillabeleightcode ===
                                        "" ? (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.labeleightcode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
                                                  .replaceAll(/alert/gi, "")
                                                  .replaceAll(/Alert/gi, ""),
                                            }}
                                          />
                                        ) : (
                                          <div
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                cardtableall.tamillabeleightcode
                                                  .replaceAll(/<script>/gi, "")
                                                  .replaceAll(
                                                    /<\/script>/gi,
                                                    ""
                                                  )
                                                  .replaceAll(
                                                    /javascript/gi,
                                                    ""
                                                  )
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
                                        dangerouslySetInnerHTML={{
                                          __html: cardtableall.labeleightcode
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
                              </td>
                            ) : (
                              ""
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* map=15 */}

        {inputs.pageTemplate === "15" ? (
          <div className="district-wise-theme-section">
            <div className="container formobileonly">
              <div className="row">
                <div className="col-lg-8 col-md-7 col-12">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link onClick={menugo} to="../">
                          {localStorage.getItem("language") === "Tamil"
                            ? "முகப்பு"
                            : "Home"}
                        </Link>
                      </li>
                      <>
                        {" "}
                        {localStorage.getItem("language") === "Tamil" ? (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">
                                {inputs.tamilcategoryName === "" ? (
                                  <>{inputs.categoryName}</>
                                ) : (
                                  <>{inputs.tamilcategoryName}</>
                                )}
                              </Link>
                            </li>
                            <>
                              <li
                                className="breadcrumb-item active"
                                aria-current="page"
                              >
                                {inputs.tamilpageTitle === "" ? (
                                  <>{inputs.pageTitle}</>
                                ) : (
                                  <>{inputs.tamilpageTitle}</>
                                )}
                              </li>
                            </>
                          </>
                        ) : (
                          <>
                            <li className="breadcrumb-item">
                              <Link to=".">{inputs.categoryName}</Link>
                            </li>
                            <li
                              className="breadcrumb-item active"
                              aria-current="page"
                            >
                              {inputs.pageTitle}
                            </li>
                          </>
                        )}
                      </>
                    </ol>
                  </nav>
                </div>
                <div className="col-lg-4 col-md-5 col-12">
                  <div className="last-update">
                    <p className="last-update-item">
                      {localStorage.getItem("language") === "Tamil"
                        ? "புதுப்பிக்கப்பட்ட தேதி : "
                        : "Last Updated On : "}
                      {new Date(inputs.updateDate)
                        .toLocaleDateString("en-GB")
                        .slice(0, 10)
                        .split("/")
                        .join("-")}
                    </p>
                  </div>
                </div>
              </div>
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
                  <div className="full-card-district">
                    <>
                      {" "}
                      {localStorage.getItem("language") === "Tamil" ? (
                        <>
                          <h5 className="district-name-header"></h5>
                          <div className="district-details editor-class content-text-change">
                            {tamilmachineDescription === "" ? (
                              <div
                                className="link-other"
                                dangerouslySetInnerHTML={{
                                  __html: machineDescription
                                    .replaceAll(/<script>/gi, "")
                                    .replaceAll(/<\/script>/gi, "")
                                    .replaceAll(/javascript/gi, "")
                                    .replaceAll(/alert/gi, "")
                                    .replaceAll(/Alert/gi, ""),
                                }}
                              />
                            ) : (
                              <div
                                className="link-other"
                                dangerouslySetInnerHTML={{
                                  __html: tamilmachineDescription
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
                          <h5 className="district-name-header">
                            {/* {districtName} */}
                          </h5>
                          <div className="district-details editor-class content-text-change">
                            <div
                              className="link-other"
                              dangerouslySetInnerHTML={{
                                __html: machineDescription
                                  .replaceAll(/<script>/gi, "")
                                  .replaceAll(/<\/script>/gi, "")
                                  .replaceAll(/javascript/gi, "")
                                  .replaceAll(/alert/gi, "")
                                  .replaceAll(/Alert/gi, ""),
                              }}
                            />
                          </div>
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
                          width={299}
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
                                      getdistict(
                                        `${geography.properties.district}`
                                      )
                                    }
                                    data-tooltip-id="map-tooltip"
                                    data-tooltip-content={`${
                                      localStorage.getItem("language") ===
                                      "Tamil"
                                        ? geography.properties.tamildistrict
                                        : geography.properties.district
                                    }`}
                                    data-tooltip-index={i}
                                    geography={geography}
                                    precision={0.5}
                                    style={{
                                      default: STYLES_MAP1.default,
                                      hover: STYLES_MAP1.hover,
                                      pressed: STYLES_MAP1.pressed,
                                      active1: STYLES_MAP1.active1,
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
                                stroke: "#000",
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

                        {/* ✅ Updated Tooltip for react-tooltip v5 */}
                        {tooltipfunction && <Tooltip id="map-tooltip" />}
                      </div>
                    </Fragment>
                  </center>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
    </>
  );
}

export default Layouts;
