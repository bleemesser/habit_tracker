import React from 'react'
import axios from 'axios';
import './LoginPage.css'
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {email:"", password:"", name:"", teacher:"", block:""};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTeacherChange = this.handleTeacherChange.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
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
    handleNameChange = (e) => {
        this.setState({"name":e.target.value});
        console.log(this.state);
    }
    handleTeacherChange = (e) => {
        this.setState({"teacher":e.target.value});
        console.log(this.state);
    }
    handleBlockChange = (e) => {
        this.setState({"block":e.target.value});
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
                window.sessionStorage.setItem("roles", res.data.roles);
                this.setState({});            }
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
                "password": this.state.password,
                "teacher": this.state.teacher,
                "blocknum": this.state.block,
                "name": this.state.name
            }
        })
        .then((res) => {
            console.log(res);
        })
    }
    
    logout = (e) => {
        e.preventDefault();
        window.sessionStorage.clear();
        // need to redirect to login page in the future
        this.setState({});
    }
    render() {
        return(
            <div className='container'>
                <div className='form-group form-1'>
                    <form>
                        <input className="form-control" type="text" placeholder='Email' name='email' required onChange={this.handleEmailChange}/>
                        <input className="form-control" type="password" placeholder='Password' name='password' required onChange={this.handlePasswordChange}/>
                        <input className="form-control btn submitbtn btn-secondary" type="submit" onClick={this.handleLogin} value="Log In"/>
                    </form>
                    <form>
                        <input className="form-control" type="text" placeholder="Name" name="name" required onChange={this.handleNameChange}/>
                        <input className="form-control" type="text" placeholder='Email' name='email' required onChange={this.handleEmailChange}/>
                        <input className="form-control" type="password" placeholder='Password' name='password' required onChange={this.handlePasswordChange}/>
                        <input className="form-control" type="text" placeholder='Teacher' name='teacher' required onChange={this.handleTeacherChange}/>
                        <input className="form-control" type="number" min={1} max={8} placeholder='Block' name='block' required onChange={this.handleBlockChange}/>
                        <input className="form-control btn submitbtn btn-secondary" type="submit" onClick={this.handleSignup} value="Sign Up"/>
                    </form>
                    <button className="form-control btn btn-danger" onClick={this.logout}>Log Out</button>

                </div>
            </div>
        )
    }
}
export default LoginPage;