import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
    const navigate = useNavigate();
    const { token, logout, userData } = useContext(AppContext);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className="flex justify-between items-center text-sm p-4 mb-5 border-b border-gray-300">

            <img
                onClick={() => navigate('/')}
                className="w-44 h-10 cursor-pointer"
                src={assets.logo}
                alt="logo"
            />

            <ul className="hidden md:flex items-center gap-6 font-semibold text-gray-700">

                <NavLink
                    to="/emergency"
                    className={({ isActive }) =>
                        `flex items-center gap-1.5 px-4 py-2 rounded-full text-white bg-red-600 hover:bg-red-700 transition-all shadow-sm ${isActive ? 'ring-2 ring-red-300' : ''}`
                    }
                >
                    <span>🚨</span>
                    <li className="list-none">EMERGENCY</li>
                </NavLink>

                <NavLink to="/">
                    <li className="py-1 hover:text-primary transition-colors">HOME</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink to="/doctors">
                    <li className="py-1 hover:text-primary transition-colors">ALL DOCTORS</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink to="/about">
                    <li className="py-1 hover:text-primary transition-colors">ABOUT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

                <NavLink to="/contact">
                    <li className="py-1 hover:text-primary transition-colors">CONTACT</li>
                    <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
                </NavLink>

            </ul>

            <div className="flex items-center gap-4">

                {token ? (
                    <div className="flex items-center gap-2 cursor-pointer group relative">

                        <img
                            className="w-8 h-8 rounded-full object-cover"
                            src={userData.image || assets.profile_pic}
                            alt="profile"
                        />

                        <img
                            className="w-2.5"
                            src={assets.dropdown_icon}
                            alt="dropdown"
                        />

                        <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-700 z-20 hidden group-hover:block">
                            <div className="min-w-48 flex flex-col gap-4 bg-white border border-gray-200 p-4 rounded shadow-lg">

                                <p
                                    onClick={() => navigate("/my-profile")}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    My Profile
                                </p>

                                <p
                                    onClick={() => navigate("/my-appointments")}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    My Appointments
                                </p>

                                <p
                                    onClick={logout}
                                    className="hover:text-primary cursor-pointer"
                                >
                                    Logout
                                </p>

                            </div>
                        </div>

                    </div>
                ) : (
                    <button
                        onClick={() => navigate("/login")}
                        className="bg-primary text-white px-8 py-3 rounded-full font-semibold hidden md:block hover:opacity-90 transition-all"
                    >
                        Create account
                    </button>
                )}

                <img
                    onClick={() => setShowMenu(true)}
                    className="w-6 md:hidden cursor-pointer"
                    src={assets.menu_icon}
                    alt="menu"
                />

                {/* ------- Mobile Menu ------- */}
                <div className={`${showMenu ? 'fixed w-full' : 'h-0 w-0'} md:hidden right-0 top-0 bottom-0 z-30 overflow-hidden bg-white transition-all`}>
                    <div className="flex items-center justify-between px-5 py-6">
                        <img className="w-36" src={assets.logo} alt="logo" />
                        <img
                            className="w-7 cursor-pointer"
                            onClick={() => setShowMenu(false)}
                            src={assets.cross_icon}
                            alt="close"
                        />
                    </div>
                    <ul className="flex flex-col items-center gap-3 mt-5 px-5 text-lg font-semibold text-gray-800">
                        <NavLink
                            onClick={() => setShowMenu(false)}
                            to="/emergency"
                            className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full w-full justify-center"
                        >
                            <span>🚨</span> EMERGENCY
                        </NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/"><p className="px-4 py-2 rounded inline-block">HOME</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/doctors"><p className="px-4 py-2 rounded inline-block">ALL DOCTORS</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/about"><p className="px-4 py-2 rounded inline-block">ABOUT</p></NavLink>
                        <NavLink onClick={() => setShowMenu(false)} to="/contact"><p className="px-4 py-2 rounded inline-block">CONTACT</p></NavLink>
                        {!token && (
                            <button
                                onClick={() => { setShowMenu(false); navigate('/login') }}
                                className="bg-primary text-white px-8 py-3 rounded-full font-semibold mt-4"
                            >
                                Create account
                            </button>
                        )}
                    </ul>
                </div>

            </div>

        </div>
    );
};

export default Navbar;
