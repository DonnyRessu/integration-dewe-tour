import navbar from "../images/navbar.png";
import iconNavbar from "../images/icon-navbar.png";
import Login from "./login";
import Register from "./Register";
import { useContext, useEffect, useState } from "react";
import avatarLogin from "../images/avatar-login.png";
import UserDropDown from "./userDropDown";
import AdminDropDown from "./adminDropdown";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [userState, _] = useContext(UserContext);
  const [userDropdown, setUserDropdown] = useState(false);
  return (
    <>
      <div>
        <img src={navbar} className="absolute" />
        <div className="navbar px-16">
          <div className="flex-1">
            <Link to={"/"}>
              <img src={iconNavbar} className="absolute top-0" />
            </Link>
          </div>
          {/* not login */}
          {!userState.isLogin && (
            <div className="flex-none gap-3">
              <Login />
              <Register />
            </div>
          )}

          {/* login */}
          {userState.isLogin && (
            <button onClick={() => setUserDropdown(!userDropdown)}>
              <img
                className="absolute right-10 top-3  z-20"
                src={avatarLogin}
              />
            </button>
          )}

          {userState.user.role === "admin" && userDropdown && (
            <div onClick={() => setUserDropdown(false)}>
              <AdminDropDown />
            </div>
          )}

          {userState.user.role === "user" && userDropdown && (
            <div onClick={() => setUserDropdown(false)}>
              <UserDropDown />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
