import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <footer className='mt-20'>

            <div className='max-w-6xl mx-auto px-6 md:px-10'>

                {/* Main Footer */}
                <div className='grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-16 pb-14'>

                    {/* Left Section */}
                    <div>
                        <img
                            src={assets.logo}
                            alt='Logo'
                            className='w-44 mb-8'
                        />

                        <p className='text-sm text-gray-600 leading-6 max-w-lg'>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                        </p>
                    </div>


                    {/* Company */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-700 mb-7'>
                            COMPANY
                        </h3>

                        <ul className='space-y-4 text-sm text-gray-600'>
                            <li className='cursor-pointer hover:text-primary'>
                                Home
                            </li>

                            <li className='cursor-pointer hover:text-primary'>
                                About us
                            </li>

                            <li className='cursor-pointer hover:text-primary'>
                                Contact us
                            </li>

                            <li className='cursor-pointer hover:text-primary'>
                                Privacy policy
                            </li>
                        </ul>
                    </div>


                    {/* Get In Touch */}
                    <div>
                        <h3 className='text-base font-semibold text-gray-700 mb-7'>
                            GET IN TOUCH
                        </h3>

                        <ul className='space-y-4 text-sm text-gray-600'>
                            <li>
                                +1-212-456-7890
                            </li>

                            <li>
                                greatstackdev@gmail.com
                            </li>
                        </ul>
                    </div>

                </div>


                {/* Copyright */}
                <div className='border-t border-gray-300 py-6 text-center'>
                    <p className='text-sm text-gray-600'>
                        Copyright © {new Date().getFullYear()} GreatStack - All Right Reserved.
                    </p>
                </div>

            </div>

        </footer>
    )
}

export default Footer