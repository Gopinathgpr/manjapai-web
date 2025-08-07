import React from "react";
import { Link } from "react-router-dom";
function Pagenotfound ()  {
    return (
        <div className="pagenot-found-section">
            <div className="container formobileonly">
                <h1 className="pagenotfound">
                    404 Page Not Found
                </h1>
                <div className="redirect-btn">
                <button className="redirect-page">
                    <Link className="redirect-link" to={process.env.PUBLIC_URL+'/'}>Home Page</Link>
                    </button>
                </div>
            </div>
        </div>
    );
}
export default Pagenotfound;