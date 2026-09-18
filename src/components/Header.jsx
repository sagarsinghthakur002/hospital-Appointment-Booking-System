import React from "react";
import { assets } from "../assets/assets.js";

const Header = () => {
    return (
        <div className='flex flex-col flex-wrap bg-primary rounded-lg  px-6  md:px-10 lg:px-20 '>

            {/* -------- Left Side -------- */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10">

                <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                    Book Appointment <br />
                    With Your Favorite Doctor
                </p>

                <div className="flex items-center gap-3">
                    <img
                        className="w-20"
                        src={assets.group}
                        alt=""
                    />

                    <p className="text-white text-sm font-light">
                        Simply browse through our extensive list of trusted doctors,
                        <br className="hidden md:block" />
                        select your preferred doctor, and schedule your appointment hassle-free.
                    </p>
                </div>

                <a
                    href="/doctors"
                    className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 text-sm"
                >
                    Book Appointment
                    <img
                        className="w-3"
                        src={assets.arrow_icon}
                        alt=""
                    />
                </a>

            </div>


            {/* -------- Right Side -------- */}
            <div className="md:w-1/2 relative">
                <img
                    className="w-full md:absolute bottom-0"
                    src={assets.header_img}
                    alt="Doctors"
                />
            </div>

        </div>
    );
};

export default Header;
