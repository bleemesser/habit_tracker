import { BrowserRouter, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import './NavBar.css';

function logoutClick() {
    window.sessionStorage.clear()
    console.log("Logged out successfully!")
}

export function NavBar() {
    return (
        <div className="nav">
        <p className='navp'>SEL Habit Tracker</p>
            <div className="box">
            <Link id="final" className="link" to="/">Home</Link>
            <Link id="final" className="link" to="/login">Login</Link>
            <button className="button" onClick={logoutClick}>Logout</button>
            </div>
        </div>
    );
}