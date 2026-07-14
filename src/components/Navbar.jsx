import React from 'react'
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets.js";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center text-sm p-4 mb-5  border-b border-gray-400 ">

            <img src={assets.logo} alt="logo" />

            <ul className="hidden md:flex items-start gap-5 font-medium" >

                <NavLink to="/">
                    <li className='py-1 '>HOME</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to="/doctors">
                    <li className='py-1 '> ALL DOCTORS </li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />                
                </NavLink>

                <NavLink to="/about">
                    <li className='py-1 '>ABOUT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

                <NavLink to="/contact">
                    <li className='py-1 '>CONTACT</li>
                    <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
                </NavLink>

            </ul>

            <div>
                <button> Create account </button>
            </div>

        </div>
    )
}

export default Navbar
