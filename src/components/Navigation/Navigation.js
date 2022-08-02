import React from "react";
import { NavLink } from "react-router-dom";
import "./Navigation.css";

const Navigation = () => {
    return(
        <nav>
            <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "link-active left-active" : "link")}
             >All</NavLink>
            <NavLink
                to="/favorites"
                className={({ isActive }) => (isActive ? "link-active right-active" : "link")}
            >My faves</NavLink>
        </nav>
    );
}

export default Navigation