import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import appointment_img from '../assets/appointment_img.png'

const Banner = () => {

    const navigate = useNavigate()

    return (
        <div className='relative flex bg-primary rounded-lg overflow-hidden px-6 sm:px-10 md:px-14 lg:px-14 my-16 md:my-20 min-h-[280px] md:min-h-[300px] lg:min-h-[320px]'>

            {/* -------- Left Side -------- */}
            <div className='w-full md:w-[60%] flex flex-col justify-center relative z-10 py-10'>

                <div className='text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-semibold text-white leading-tight'>
                    <p>Book Appointment</p>

                    <p className='mt-2'>
                        With 100+ Trusted Doctors
                    </p>
                </div>

                <button
                    onClick={() => {
                        navigate('/login')
                        scrollTo(0, 0)
                    }}
                    className=' bg-white text-gray-600 text-sm px-7 py-3 rounded-full mt-6 hover:scale-105 transition-all duration-300'
                >
                    Create account
                </button>

            </div>

            {/* -------- Right Side -------- */}
            <div className='hidden md:block absolute right-0 bottom-0 w-[45%] h-full leading-tight'>

                <img
                    src={assets.appointment_img}
                    alt='Doctor'
                    className='absolute bottom-0 right-5 h-full w-auto object-contain'
                />

            </div>

        </div>
    )
}

export default Banner