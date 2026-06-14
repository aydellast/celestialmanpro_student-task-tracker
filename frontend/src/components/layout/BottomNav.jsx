import {
  Link,
  useLocation,
} from "react-router-dom";

import {
  FaHome,
  FaTasks,
  FaClock,
  FaUsers,
} from "react-icons/fa";

function BottomNav() {

  const location =
    useLocation();

  return (

    <div className="bottom-nav">

      <Link
        to="/dashboard"

        className={
          location.pathname ===
          "/dashboard"

          ? "nav-item active"

          : "nav-item"
        }
      >

        <FaHome />

        <span>
          Home
        </span>

      </Link>

      <Link
        to="/task"

        className={
          location.pathname ===
          "/task"

          ? "nav-item active"

          : "nav-item"
        }
      >

        <FaTasks />

        <span>
          Tasks
        </span>

      </Link>

      <Link
        to="/focus"

        className={
          location.pathname ===
          "/focus"

          ? "nav-item active"

          : "nav-item"
        }
      >

        <FaClock />

        <span>
          Focus
        </span>

      </Link>

      <Link
        to="/collaboration"

        className={
          location.pathname ===
          "/collaboration"

          ? "nav-item active"

          : "nav-item"
        }
      >

        <FaUsers />

        <span>
          Team
        </span>

      </Link>

    </div>
  );
}

export default BottomNav;