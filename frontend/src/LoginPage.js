import React from 'react'
import axios from 'axios';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {email:"", password:""};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.submitProcrastinationForm = this.submitProcrastinationForm.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.logout = this.logout.bind(this);
    }
    handleEmailChange = (e) => {
        this.setState({"email":e.target.value});
        console.log(this.state);
    }
    handlePasswordChange = (e) => {
        this.setState({"password":e.target.value});
        console.log(this.state);
    }
    handleLogin = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        axios({
            method: 'post',
            url: '/auth/login', // very cool: in package.json, we set a proxy to localhost:5000, so we can just use /auth/login instead of the full url
            headers: {
                'Content-Type': 'application/json', // must be specified to work with the backend
            },
            data: {
                "email": this.state.email,
                "password": this.state.password
            }
        })
        .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
                window.sessionStorage.setItem("token", res.data.token);
                this.setState({}); // need to call setstate to rerun the code hidden in checkToken() without full page reload
            }
            else {
                alert(res.data.message);
            }
        })
    }
    handleSignup = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/auth/signup',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                "email": this.state.email,
                "password": this.state.password
            }
        })
        .then((res) => {
            console.log(res);
        })
    }
    submitProcrastinationForm = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/submit/procrastination',
            headers: {
                'Content-Type': 'application/json',
                "token":window.sessionStorage.getItem("token")
            },
            data: {
                "q1": "some_value",
                "q2": "some_other_value",
                "q3": "some_other_other_value"
            }
        })
        .then((res) => {
            console.log(res); // while the request itself will return code 200 (success), the backend will return a custom status in res.data.status which is what
            // should be checked to see if the request was successful
            if (res.data.status === "success") {
                alert("success");
                // need to redirect to login page
            }
            else {
                alert(res.data.message);
            }
        })
    }
    logout = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        // need to redirect to login page in the future
        this.setState({});
    }
    checkToken() {
        if (window.sessionStorage.getItem("token") !== "undefined" && window.sessionStorage.getItem("token") != null){ 
            // if we have a token, someone successfully logged in. the token may be expired, however, so 
            // on every api request the backend checks if the token is valid. if it is valid, the backend returns what we requested.
            // if not, the backend returns {'status':'autherror', 'message': [something]}
            // this function only checks if it is present, not if it is valid
            return ( // these html components are revealed when the user is logged in
                <div>
            <form onSubmit={this.submitProcrastinationForm}><input type="submit" value="Submit Procrastination Form"/></form>
            <button onClick={this.logout}>Log Out</button>
            </div>
            )

        }
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                    <input type="text" placeholder='email' name='email' required onChange={this.handleEmailChange}/>
                    <input type="password" placeholder='password' name='password' required onChange={this.handlePasswordChange}/>
                    <input type="submit" value="Log In"/>
                </form>
                <form onSubmit={this.handleSignup}>
                    <input type="submit" value="Sign Up"/>
                </form>
                {this.checkToken()}
            </div>
        )
    }
    
}
export default LoginPage;