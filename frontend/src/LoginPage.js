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
        // axios.post("/auth/login",
        //     {
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         data: {
        //             "email": this.state.email,
        //             "password": this.state.password
        //         }
        //     })
        // })
        window.sessionStorage.clear();
        axios({
            method: 'post',
            url: '/auth/login',
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
            window.sessionStorage.setItem("token", res.data.token);
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
            console.log(res);
            if (res.data.status != "success" && res.data.message == "Token is invalid") {
                alert("Error submitting procrastination form: invalid token");
                // need to redirect to login page
            }
        })
    }
    render() {
        return(
            <div>
                <form onSubmit={this.handleLogin}>
                    <input type="text" placeholder='username' name='email' onChange={this.handleEmailChange}/>
                    <input type="text" placeholder='password' name='password' onChange={this.handlePasswordChange}/>
                    <input type="submit" value="Log In"/>
                </form>
                <form onSubmit={this.handleSignup}>
                    <input type="submit" value="Sign Up"/>
                </form>
                <button onClick={this.submitProcrastinationForm}>Submit procrastination</button>
            </div>
        )
    }
    
}
export default LoginPage;