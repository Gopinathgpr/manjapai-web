import React, { useState } from "react";
import "./header.css";
import { AiOutlineMenu, AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import logo1 from '../../asset/images/logo-left-1.png';
import logo2 from '../../asset/images/logo-left-2.png';
import logo3 from '../../asset/images/logo-right.png';
import logo4 from '../../asset/images/logo-4.png';
import { useGetMenuQuery } from "../../Api/MenuApi/menuApi";


export default function Navbar() {
  const { data: header = [], isLoading, isError, error } = useGetMenuQuery();
  const [menu, setMenu] = useState('home');
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [menuopen, setmenuopen] = useState('yes');

  const closemenu = (MenuName) => {
    setIsNavExpanded(!isNavExpanded);
    setMenu(MenuName);
  };

  const menugo = () => {
    setMenu('');
    setIsNavExpanded(!isNavExpanded);
  };

  return (
    <>
      <div className="row">
        <nav className="navigation">
          <div className="menu-class mobileonly">
            <Link onClick={menugo} to={process.env.PUBLIC_URL + "/"} className="brand-name">
              <img className="logo1" src={logo1} alt="main-logo" />
              <img className="logo2" src={logo2} alt="second-logo" />
              <img className="logo3" src={logo3} alt="right-logo" />
              <img className="logo4" src={logo4} alt="right-logo" />
            </Link>
          </div>

          <div className="col-12">
            <button
              className="hamburger"
              onClick={() => setIsNavExpanded(!isNavExpanded)}
            >
              <AiOutlineMenu className="nav-bar-icon" />
            </button>

            <div className="row">
              <div className="col-lg-12 menu-logo-list">
                <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
                  <ul className="navbar-main-menu">
                    <li className="navbar-main-menu-list homeicon desktoponly_query">
                      <Link onClick={menugo} to={process.env.PUBLIC_URL + "/"}>
                        <AiFillHome />
                      </Link>
                    </li>
                    <li className="navbar-main-menu-list mobileonly_query hometext">
                      <Link onClick={menugo} to={process.env.PUBLIC_URL + "/"} className="homemenu">
                        {localStorage.getItem("language") === 'Tamil' ? "முகப்பு" : "Home"}
                      </Link>
                    </li>

                    {/* Loader & Error Handling */}
                    {isLoading && <li>Loading menu...</li>}
                    {isError && <li>Error: {error?.message || 'Something went wrong'}</li>}

                    {!isLoading && !isError && header.map((headerItem, index) => (
                      <li key={index} className="navbar-main-menu-list">
                        <button
                          type="button"
                          className="dropdown-toggle navbar-sub-menu"
                          id="dropdownMenuButton1"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          {menu === headerItem.categoryName
                            ? <span className="menucolor" style={{ borderBottom: "2px solid black" }}>
                                {localStorage.getItem("language") === 'Tamil'
                                  ? (headerItem.tamilcategoryName || headerItem.categoryName)
                                  : headerItem.categoryName}
                              </span>
                            : <span>
                                {localStorage.getItem("language") === 'Tamil'
                                  ? (headerItem.tamilcategoryName || headerItem.categoryName)
                                  : headerItem.categoryName}
                              </span>
                          }
                        </button>

                        {menuopen === "yes" && (
                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                            {headerItem.pagemenu.map((submenu, subIndex) => (
                              <li key={subIndex}>
                                <Link
                                  className="dropdown-item"
                                  onClick={() => closemenu(headerItem.categoryName)}
                                  to={`${process.env.PUBLIC_URL}/${headerItem.categoryUrl}/${submenu.pageUrl}`}
                                >
                                  {localStorage.getItem("language") === 'Tamil'
                                    ? (submenu.tamilpageTitle || submenu.pageTitle)
                                    : submenu.pageTitle}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
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
