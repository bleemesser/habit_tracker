import { Link } from "react-router-dom";
import './NavBar.css';
import React from "react";
import {Navigate}   from 'react-router-dom';

function logoutClick() {
    window.sessionStorage.clear()
    console.log("Logged out successfully!")
}



class Navigator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {role:window.sessionStorage.getItem("roles"),href:""};
    }


    render() {
        if (this.state.role === "teacher") {
            this.setState({href:"/t/dashboard"})
        }
        else if (this.state.role === "student") {
            this.setState({href:"/s/dashboard"})
        }
        else {
            this.setState({href:"/login"})
        }
    
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
                            <li className="nav-item nav-link"><a className="btn btn-light me-2 navstyle" href={this.state.href} >Dashboard</a></li>
                            <li className="nav-item nav-link visually-hidden"><a className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a></li>

                        </ul>
                    </div>
                    <a className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a>
                </div>
            </nav>

            

        )
    }
}
export default Navigator;