import React from 'react'
import { NavLink } from "react-router-dom"
import { assets } from "../assets/assets.js";

const Navbar = () => {
    return (
        <div>

            <img src={assets.logo} alt="logo" />

            <ul>
                <NavLink to="/">
                    <li>HOME</li>
                </NavLink>

                <NavLink to="/doctors">
                    <li> ALL DOCTORS </li>
                </NavLink>

                <NavLink to="/about">
                    <li>ABOUT</li>
                </NavLink>

                <NavLink to="/contact">
                    <li>CONTACT</li>
                </NavLink>

            </ul>

            <div>
                <button> Create account </button>
            </div>

        </div>
    )
}

export default Navbar
