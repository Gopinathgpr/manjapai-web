import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header/header';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import EventsDetails from './components/media-and-events/events-details';
import { MdCircle } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiFontSize } from "react-icons/bi";
import useLocalStorage from 'use-local-storage';
import React, { useState, useEffect } from "react";
import Layouts from './components/pages/pages';
import Gallerylist from './components/media-and-events/media-gallery-titles';
import NewsDetails from './components/media-and-events/news-details';
import BlogDetails from './components/media-and-events/blog-details';
import Pagenotfound from './components/pages/notfoundpage';
import logo1 from '../src/asset/images/logo-1.png'
import logo2 from '../src/asset/images/logo-left-2.png'
import logo3 from '../src/asset/images/logo-3.png'
import logo4 from '../src/asset/images/logo-4.png'

import ReactGA from 'react-ga';
import PreRegistrationDetails from './components/media-and-events/pre-registration-form';
import { AiOutlineUnorderedList } from 'react-icons/ai';

const TRACKING_ID = "G-2W9DGVJCE1"

    ReactGA.initialize(TRACKING_ID);


function App() {

    

    const defaultDark = window.matchMedia('(prefers-color-scheme: drak)').matches;
    const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'drak' : 'light');
    const switchTheme = (theme) => {
        if (theme === "light") {
            setTheme('light')
        }
        if (theme === "dark") {
            setTheme('dark')
        }
        if (theme === "lighter") {
            setTheme('lighter')
        }
    }

    const [activeButton, setActiveButton] = useState(null);
    const handleClick = (buttonId) => {
      setActiveButton(buttonId);
    };

    const defaultLanguage = window.matchMedia('(prefers-color-scheme: Tamil)').matches;
    const [defaultlanguage, setDefaultlanguage] = useLocalStorage('theme', defaultLanguage ? 'Tamil' : 'English');
    const languageTheme = (defaultlanguage) => {
        if (defaultlanguage === "English") {
            setDefaultlanguage('English')
        }
        if (defaultlanguage === "Tamil") {
            setDefaultlanguage('Tamil')
        }
    }


    const defaultText = window.matchMedia('(prefers-color-scheme: small)').matches;
    const [theme1, setTheme1] = useLocalStorage('theme1', defaultText ? 'small' : 'normal');
    const textTheme = (theme1) => {
        if (theme1 === "normal") {
            setTheme1('normal')
        }
        if (theme1 === "small") {
            setTheme1('small')
        }
        if (theme1 === "high") {
            setTheme1('high')
        }
    }
    const [activetabone, setactivetabone] = useState(false);
    const [activetabtwo, setactivetabtwo] = useState(false);
    const [activetabthree, setactivetabthree] = useState(false);
    const prev = (id) => {
        if (id === 3) {
            setactivetabone(!activetabone)
            setactivetabthree(false)
            setactivetabtwo(false)
        }
        if (id === 2) {
            setactivetabone(false)
        }
        if (id === 5) {
            setactivetabthree(!activetabthree)
            setactivetabone(false)
            setactivetabtwo(false)
        }
        if (id === 4) {
            setactivetabthree(false)
        }
        if (id === 1) {
            setactivetabtwo(!activetabtwo)
            setactivetabthree(false)
            setactivetabone(false)
        }
        if (id === 0) {
            setactivetabtwo(false)
        }
        setTimeout(() => { setactivetabone(false); setactivetabtwo(false); setactivetabthree(false) }, 10000)
    }
    const languages = (name) => {
        localStorage.setItem("language", name);

    }

    return (
        <>
            <div data-theme={theme} text-theme={theme1} language-theme={defaultlanguage}>
                <Router basename=''>
                    <div className='top-header-themes'>
                        <div className='container formobileonly'>
                            <div className='row'>
                                <div className='col-lg-3'>
                                    <div className="desktoponly">
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <Link to={process.env.PUBLIC_URL+"/"} className="">
                                                    <img className="logo1" src={logo1} alt="main-logo"></img>
                                                </Link>
                                            </div>
                                            <div className='col-lg-6'>
                                                <Link to={process.env.PUBLIC_URL+"/"} className="">
                                                    <img className="logo2" src={logo2} alt="second-logo"></img>
                                                </Link>
                                            </div>
                                        </div>
                                     </div>
                                </div>
                                <div className='col-lg-2 col-4'>
                                    <div className="top-header-space">
                                        <div className='row'>
                                            <div className='col-lg-3 col-4'>
                                                <button className="yellow" data-toggle="tooltip" title="Theme Color Active" onClick={() => switchTheme('light')} >
                                                    <MdCircle className="yellow-theme" /></button>
                                            </div>

                                            <div className='col-lg-3 col-4'>
                                                <button className="green" data-toggle="tooltip" title="Theme Color Active" onClick={() => switchTheme('dark')} >
                                                    <MdCircle className="green-theme" /></button>
                                            </div>

                                            <div className='col-lg-3 col-4'>
                                                <button className="pink" data-toggle="tooltip" title="Theme Color Active" onClick={() => switchTheme('lighter')} >
                                                    <MdCircle className="pink-theme" /></button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-4'>
                                    <div className="top-header-space">
                                        <div className='row'>
                                            <div className='col-lg-4 col-6' data-toggle="tooltip" title="English Language">
                                            <div className="language">
                                                {localStorage.getItem("language") === 'English' ?
                                                    <button className={activeButton === 1 ? 'activebtn' : 'activebtn'} style={{ border: "none" }}>
                                                        English</button>
                                                    : <button className={activeButton === 1 ? 'activebtn' : ''} style={{ border: "none", backgroundColor: "transparent", marginTop: "5px" }} onClick={() => { languageTheme('English'); languages('English'); handleClick(1) }}>English</button>
                                                }
                                                </div>
                                            </div>
                                            <div className='col-lg-4 col-6' data-toggle="tooltip" title="Tamil Language">
                                            <div className="language">
                                                {localStorage.getItem("language") === 'Tamil' ?
                                                    <button className={activeButton === 2 ? 'activebtn' : ''} style={{ border: "none" }}>
                                                        தமிழ்</button>
                                                    : <button className={activeButton === 2 ? 'activebtn' : ''} style={{ border: "none", backgroundColor: "transparent", marginTop: "5px" }} onClick={() => { languageTheme('Tamil'); languages('Tamil') ; handleClick(2) }}>தமிழ்</button>
                                                }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-2 col-4'>
                                    <div className="top-header-space">
                                        <div className='row'>
                                            <div className='col-lg-3 col-4'>
                                                <button className="text-resize-btn" data-toggle="tooltip" title="Small Text Size" onClick={() => textTheme('small')}>
                                                    <BiFontSize className="text-resize-1" /></button>
                                            </div>
                                            <div className='col-lg-3 col-4'>
                                                <button className="text-resize-btn" data-toggle="tooltip" title="Normal Text Size" onClick={() => textTheme('normal')} >
                                                    <BiFontSize className="text-resize-2" />
                                                </button>
                                            </div>

                                            <div className='col-lg-3 col-4'>
                                                <button className="text-resize-btn" data-toggle="tooltip" title="High Text Size" onClick={() => textTheme('high')} >
                                                    <BiFontSize className="text-resize-3" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-3'>
                                    <div className="last-logo-icon">
                                        <div className='row'>
                                            <div className='col-lg-6'>
                                                <Link to={process.env.PUBLIC_URL+"/"} className="">
                                                    <img className="logo4 logo3_none" src={logo4} alt="right-logo"></img>
                                                </Link>
                                            </div>
                                            <div className='col-lg-6'>
                                                <Link to={process.env.PUBLIC_URL+"/"} className="">
                                                    <img className="logo3 logo3_none" src={logo3} alt="right-logo"></img>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Header />
                    <Routes>
                        <Route path={process.env.PUBLIC_URL+'/'} exact element={<Home />} />
                        <Route path={process.env.PUBLIC_URL+'/index'} exact element={<Home />} />
                        <Route path={process.env.PUBLIC_URL+'*'} exact element={<Home />} />
                        <Route path={process.env.PUBLIC_URL+'/:categoryUrl/:pageUrl'} exact element={<Layouts />} />
                        <Route path={process.env.PUBLIC_URL+'/events/event-block/:id'} exact element={<EventsDetails />} />
                        <Route path={process.env.PUBLIC_URL+'/news/news-block/:id'} exact element={<NewsDetails />} />
                        <Route path={process.env.PUBLIC_URL+'/blog/blog-block/:id'} exact element={<BlogDetails />} />
                        <Route path={process.env.PUBLIC_URL+'/events/media-gallery/:id'} exact element={<Gallerylist />} />
                        <Route path={process.env.PUBLIC_URL+'/PreRegistration'} element={<PreRegistrationDetails />} />
                        <Route path={process.env.PUBLIC_URL+'/404'} element={<Pagenotfound />} />
                    </Routes>
                    <Footer />
                </Router>
            </div>
        </>
    );
}
export default App;
