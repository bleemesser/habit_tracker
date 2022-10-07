import { Link } from "react-router-dom";
import './NavBar.css';
import {Navigate}   from 'react-router-dom';

function logoutClick() {
    window.sessionStorage.clear()
    console.log("Logged out successfully!")
}

function dashboardLink () {
    if (window.sessionStorage.getItem("roles") === "teacher") {
        return <li className="nav-item nav-link"><a className="btn btn-light me-2 navstyle" href='/t/dashboard' >Dashboard</a></li>
    }
    else {
        return <li className="nav-item nav-link"><a className="btn btn-light me-2 navstyle" href='/s/dashboard' >Dashboard</a></li>
    }
}

export function Navigator() {
    return (

        <nav className="navbar navbar-light navbar-expand-md py-3">
            <div className="container">
                <a className="navbar-brand d-flex align-items-center navstyle" href="/" style={{marginRight:0, fontSize:'20pt',paddingRight:'3.5vw'}}>
                    <span >SEL Habits Analysis Tool</span>
                </a>
                <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-4">
                    <span className="visually-hidden">Toggle navigation</span>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-4">
                    <ul className="navbar-nav me-auto">
                        {dashboardLink()}
                        <li className="nav-item nav-link visually-hidden"><a className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a></li>

                    </ul>
                </div>
                <a className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a>
            </div>
        </nav>



    );
}