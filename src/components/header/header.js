import React, { useState, useEffect, useRef } from "react";
import "./header.css"
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import API_URL from "../../Config/api";
import logo1 from '../../asset/images/logo-left-1.png'
import logo2 from '../../asset/images/logo-left-2.png'
import logo3 from '../../asset/images/logo-right.png'
// import logo4 from '../../asset/images/life-logo.png'
import logo4 from '../../asset/images/logo-4.png'



export default function Navbar() {
    const dataFetchedRef = useRef(false);
    useEffect(() => {
        if (dataFetchedRef.current) return;
        dataFetchedRef.current = true;
        
        menuList();
    }, []);
    const [menu, setMenu] = useState('home');
    const [isNavExpanded, setIsNavExpanded] = useState(false)
    const [header, setHeader] = useState([]);
    const menuList = () => {
        const apiUrl = API_URL + 'HomeApi/menu';
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
                    setHeader(result.data);
                }
            },
                (error) => { }
            )
    }
    const closemenu = (MenuName) => {
       
        setIsNavExpanded(!isNavExpanded)
        setMenu(MenuName)
    }
    const menugo = () => {
        setMenu('')
        setIsNavExpanded(!isNavExpanded)
    }
    const [menuopen, setmenuopen] = useState('yes');
    return (
        <>
            <div className="row">
                <nav className="navigation">
                    <div className="menu-class mobileonly">
                        <Link onClick={menugo} to={process.env.PUBLIC_URL+"/"} className="brand-name">
                            <img className="logo1" src={logo1} alt="main-logo"></img>
                            <img className="logo2" src={logo2} alt="second-logo"></img>
                            <img className="logo3" src={logo3} alt="right-logo"></img>
                            <img className="logo4" src={logo4} alt="right-logo"></img>

                        </Link>
                    </div>
                    <div className="col-12">
                        <button
                            className="hamburger"
                            onClick={() => {
                                setIsNavExpanded(!isNavExpanded)
                            }}
                        >
                            <AiOutlineMenu className="nav-bar-icon" />
                        </button>
                        <div className="row">
                            <div className="col-lg-12 menu-logo-list">
                                <div
                                    className={
                                        isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
                                    }
                                >
                                    <ul className="navbar-main-menu">
                                        <li className="navigation-menu-search navbar-main-menu-list"></li>
                                        <li className="navbar-main-menu-list homeicon desktoponly_query">
                                            <Link onClick={menugo} to={process.env.PUBLIC_URL+"/"}> <AiFillHome /></Link>
                                        </li>
                                        <li className="navbar-main-menu-list mobileonly_query hometext">
                                            <Link onClick={menugo} to={process.env.PUBLIC_URL+"/"} className="homemenu">
                                                {localStorage.getItem("language") === 'Tamil' ? "முகப்பு" : "Home"}
                                            </Link>
                                        </li>
                                        {header.map((header, index) => (
                                            <li className="navbar-main-menu-list">
                                                <button type="button" className="dropdown-toggle navbar-sub-menu" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                    {/* {menu === header.categoryName ?
                                                        <span className="menucolor" style={{ borderBottom: "2px solid black" }}>{header.categoryName}</span>
                                                        : <span>{header.categoryName}</span>} */}


                                                    {menu === header.categoryName ? <span className="menucolor" style={{ borderBottom: "2px solid black" }}>
                                                        {localStorage.getItem("language") === 'Tamil' ?
                                                            <>{header.tamilcategoryName !== "" ? <>{header.tamilcategoryName}</> :
                                                                <>{header.categoryName}</>}</> : <>{header.categoryName}</>}

                                                    </span> :
                                                        <span>{localStorage.getItem("language") === 'Tamil' ?
                                                            <>{header.tamilcategoryName !== "" ? <>{header.tamilcategoryName}</> : <>{header.categoryName}</>}</> :
                                                            <>{header.categoryName}</>}
                                                        </span>
                                                    }
                                                </button>
                                                {menuopen === "yes" ?
                                                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                                        {header.pagemenu.map((submenu, index) => (
                                                            <li>
                                                                <Link className="dropdown-item" onClick={() => closemenu(`${header.categoryName}`)} to={process.env.PUBLIC_URL+'/'+header.categoryUrl + '/' + submenu.pageUrl}>
                                                                    {localStorage.getItem("language") === 'Tamil' ? <>{submenu.tamilpageTitle !== "" ? <>{submenu.tamilpageTitle}</> : <>{submenu.pageTitle}</>}</> : <>{submenu.pageTitle}</>}

                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                    : ""}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </>
    );
}
