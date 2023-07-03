import React, {  useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { AiOutlineBars } from "react-icons/ai";
import { BiHomeCircle } from "react-icons/bi";
import useAdmin from "../../hooks/useAdmin";
import useInstructor from "../../hooks/useInstructor";
import { GrLogout } from "react-icons/gr";
import { FaUserFriends, FaCartPlus } from "react-icons/fa";
import { BsPlusCircleFill } from "react-icons/bs";
import { MdOutlineClass, MdPayment, MdClass } from "react-icons/md";
import useCart from "../../hooks/useCart";

const Sidebar = () => {
  const [cart] = useCart();
  const { logOut, user } = useAuth();
  const [isAdmin] = useAdmin();
  const [isInstructor] = useInstructor();
  const navigate = useNavigate();
  const [isActive, setActive] = useState("false");
  const handleToggle = () => {
    setActive(!isActive);
  };
  const handleLogOut = () => {
    logOut();
    navigate("/");
  };
  return (
    <>
      <div className="bg-gray-100 text-gray-800 flex z-50 justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold"></div>
        </div>
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>
      <div
        className={`z-50 md:fixed flex flex-col justify-between overflow-x-hidden bg-[#F9FBFA] w-80 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        <div>
          <ul className="menu p-4 w-80">
            <div></div>

            <div className="flex justify-center items-center">
              <Link to="/" className="text-xl md:text-2xl font-bold">
                <img
                  className="w-40"
                  src="https://i.ibb.co/TDQr4Xt/Rainbow-Art-Store-Business-Logo-1.png"
                  alt=""
                />
              </Link>
            </div>
            <div>
              <div className="flex flex-col items-center mt-6 -mx-2">
                <img
                  className="object-cover w-16 h-16 mx-2 rounded-full"
                  src={user?.photoURL}
                  alt="avatar"
                  referrerPolicy="no-referrer"
                />
                <h4 className="mx-2 mt-2 font-medium text-gray-800  ">
                  {user?.displayName}
                </h4>
                <p className="mx-2 mt-1 text-sm font-medium text-gray-600 ">
                  {user?.email}
                </p>
                <div className="flex items-center justify-center">
                  <button
                    onClick={handleLogOut}
                    className="flex w-full items-center mx-2 mt-1 text-gray-600"
                  >
                    <GrLogout className="w-5 h-5" />

                    <span className="mx-4 font-medium">Logout</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="divider"></div>

            {isAdmin && (
              <>
                <li>
                  <NavLink to="/dashboard/">
                    <BiHomeCircle></BiHomeCircle>admin home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-users">
                    <FaUserFriends></FaUserFriends>Manage Users
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/manage-classes">
                    <MdOutlineClass></MdOutlineClass> Manage classes
                  </NavLink>
                </li>
              </>
            )}

            {isInstructor && (
              <>
                <li>
                  <NavLink to="/dashboard/">
                    <BiHomeCircle></BiHomeCircle> instructor Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/add-class"><BsPlusCircleFill></BsPlusCircleFill>Add a class</NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/my-classes"><MdOutlineClass></MdOutlineClass>My classes</NavLink>
                </li>
              </>
            )}

            {!isAdmin && !isInstructor && (
              <>
                <li>
                  <NavLink to="/dashboard/">
                    <BiHomeCircle></BiHomeCircle>student Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/cart">
                  <FaCartPlus></FaCartPlus>  Selected Classes
                    {cart.length > 0 && (
                      <span className="badge badge-error">{cart.length}</span>
                    )}
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/enrolled-classes">
                   <MdClass></MdClass> Enrolled Classes
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/dashboard/payment-history">
                   <MdPayment></MdPayment> Payment History
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
