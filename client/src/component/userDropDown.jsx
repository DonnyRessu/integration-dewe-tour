import { useContext } from "react";
import { BsFillTriangleFill } from "react-icons/bs";
import { FaRegUser, FaDonate } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/userContext";

const UserDropDown = ({ setIsLogin }) => {
  const [_, userDispatch] = useContext(UserContext);

  const logoutUser = () => {
    userDispatch({
      type: "LOGOUT",
    });
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <div className="relative mt-12 left-10">
        <div className={`absolute top-full z-20 right-9 text-white mt-1`}>
          <BsFillTriangleFill />
        </div>
        <div
          className={`absolute w-40 top-full right-7 mt-4 rounded-md py-2 bg-white z-10`}
        >
          <Link
            to={"/profile"}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5 mb-2"
          >
            <FaRegUser className="text-xl text-yellow-400" /> Profile
          </Link>
          <hr className="w-full h-2" />
          <Link
            onClick={logoutUser}
            className="flex items-center cursor-pointer gap-2 font-semibold px-5"
          >
            <IoLogOut className="text-xl text-yellow-400" /> Logout
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserDropDown;
