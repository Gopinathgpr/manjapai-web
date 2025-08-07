import React, { useState, useEffect, useRef } from "react";
import "./related-govt-departments.css";
import Slider from 'react-slick';
import API_URL from "../../../Config/api";
function Departments() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        departmentList();
    }, []);
    const [department, setDepartment] = useState([]);
    const departmentList = () => {
        const apiUrl = API_URL + 'HomeApi/department_home';
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
                    setDepartment(result.data);
                }
            },
                (error) => { }
            )
    }
    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#0F64B9", borderRadius: "100%" }}
                onClick={onClick}
            />
        );
    }
    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#0F64B9", borderRadius: "100%" }}
                onClick={onClick}
            />
        );
    }
    const settings = {
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: false,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    initialSlide: 2,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    nextArrow: <SampleNextArrow />,
                    prevArrow: <SamplePrevArrow />,
                }
            }
        ]
    };
    return (
        <div className="departments-total-section">
            <h3 className="departments-title">
                {localStorage.getItem("language") === 'Tamil' ? "தொடர்புடைய அரசு துறைகள்" : "Related Government Departments"}
            </h3>
            <div className="container formobileonly">
                <Slider {...settings}>
                    {department.map((department, index) => (
                        <div>
                            {department.departmentLink !== "" ? <a href={department.departmentLink} target="_blank">
                                <img className="departments-image" src={department.filePath + department.departmentImage} alt=""></img>
                            </a> : <img className="departments-image" src={department.filePath + department.departmentImage} alt=""></img>}

                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
}
export default Departments;