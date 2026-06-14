import "../../styles/layout.css";
import {
    Link
} from "react-router-dom";

import logo from "../../assets/logo.png";

function Topbar() {

    return (

        <div className="topbar">

            <div className="logo-section">

                <h1>
                    Student Task Tracker
                </h1>

                <p>
                    by Celestial Team
                </p>

            </div>

            <Link
                to="/profile"
                className="profile-icon"
            >

                <img
                    src={logo}
                    alt="Celestial Logo"
                    className="topbar-logo"
                />

            </Link>

        </div>
    );
}

export default Topbar;