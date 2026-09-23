import { assets } from "../assets/assets.js";

const Header = () => {
    return (
        <div className="flex flex-col md:flex-row bg-primary rounded-lg px-6 md:px-10 lg:px-14 overflow-hidden">

            {/* -------- Left Side -------- */}
            <div className="md:w-1/2 flex flex-col items-start justify-center gap-5 py-10 md:py-16 lg:py-20">

                <p className="text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight">
                    Book Appointment <br />
                    With Trusted Doctors
                </p>

                {/* -------- Doctor Group + Description -------- */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3 text-white">

                    <img
                        className="w-24 md:w-28"
                        src={assets.group}
                        alt="Doctors"
                    />

                    <p className="text-white text-sm md:text-base font-medium leading-6">
                        Simply browse through our extensive list of trusted doctors,
                        <br className="hidden md:block" />
                        select your preferred doctor, and schedule your appointment hassle-free.
                    </p>

                </div>

                {/* -------- Button -------- */}
                <a
                    href="#speciality"
                    className="flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 text-sm hover:scale-105 transition-all duration-300"
                >
                    Book Appointment

                    <img
                        className="w-3"
                        src={assets.arrow_icon}
                        alt="Arrow"
                    />
                </a>

            </div>

            {/* -------- Right Side -------- */}
            <div className="md:w-1/2 relative flex items-end justify-center">

                <img
                    className="w-full max-w-[550px] md:max-w-none md:absolute bottom-0"
                    src={assets.header_img}
                    alt="Trusted Doctors"
                />

            </div>

        </div>
    );
};

export default Header;