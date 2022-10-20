import './NavBar.css';
import React from "react";

//navbar!
class Navigator extends React.Component {
    //determines whether the user is a student or a teacher, updaing the destination of the "dashboard" button to be correct
    constructor(props) {
        super(props);
        this.state = {role:window.sessionStorage.getItem("roles"),href:""};
    }
    componentDidMount() {
        if (this.state.role === "teacher") {
            this.setState({href:"/t/dashboard"})
        }
        else if (this.state.role === "student") {
            this.setState({href:"/s/dashboard"})
        }
        else {
            this.setState({href:"/login"})
        }
    }

    render() {
        return (

            <nav className="navbar navbar-light navbar-expand-md py-3" style={{display:'flex',justifyContent:'center'}}>
                {/* <div className="container"> */}
                <div className='wrapper'>
                    <a id='dashboardbtn' className="btn btn-light me-2 navstyle" role='button' href={this.state.href} >Dashboard</a>
                </div>
                <div className='wrapper'>
                    <a className="navbar-brand navstyle" href="/" style={{justifyContent:'center', fontSize:'20pt',display:'flex'}}>
                        <span style={{textAlign:"center"}}>SEL Habits Analysis</span>
                    </a>
                </div>
                <div className='wrapper'>
                    <a id='loginbtn' className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a>

                    {/* <button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-4">
                        <span className="visually-hidden">Toggle navigation</span>
                        <span className="navbar-toggler-icon"></span>
                    </button> */}
                    {/* <div className="collapse navbar-collapse flex-grow-0 order-md-first" id="navcol-4"> */}
                        {/* <ul className="navbar-nav me-auto"> */}
                            {/* <li className="nav-item nav-link"> */}
                            {/* </li> */}
                            {/* <li className="nav-item nav-link visually-hidden"> */}
                            {/* <a className="btn btn-light me-2 navstyle" role="button" href="/login">Log In</a> */}
                            {/* </li> */}

                        {/* </ul> */}
                </div>
                {/* </div> */}
                    
                {/* </div> */}
            </nav>

            

        )
    }
}
export default Navigator;