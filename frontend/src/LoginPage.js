import React from 'react'
import axios from 'axios';
import './LoginPage.css'

//Auth page with login and signup. We have added inputs for students' teachers and block #
class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state= {email:"", password:"", name:"", teacher:"", block:"", loggedIn: false,teachers:[]};
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleTeacherChange = this.handleTeacherChange.bind(this);
        this.handleBlockChange = this.handleBlockChange.bind(this);
        this.logout = this.logout.bind(this);
        this.fetchTeachers = this.fetchTeachers.bind(this);
        this.renderTeachers = this.renderTeachers.bind(this);
    }
    componentDidMount() {
        this.fetchTeachers();
    }
    handleEmailChange = (e) => {
        this.setState({"email":e.target.value});
    }
    handlePasswordChange = (e) => {
        this.setState({"password":e.target.value});
    }
    handleNameChange = (e) => {
        this.setState({"name":e.target.value});
    }
    handleTeacherChange = (e) => {
        this.setState({"teacher":e.target.value});
    }
    handleBlockChange = (e) => {
        this.setState({"block":e.target.value});
    }

    handleLogin = (e) => {
        e.preventDefault();
        //logs out of current account (if there is one) so it can be replaced with new login
        window.sessionStorage.clear();
        axios({
            method: 'post',
            url: '/auth/login', // very cool: in package.json, we set a proxy to localhost:5000, so we can just use /auth/login instead of the full url
            headers: {
                'Content-Type': 'application/json', // must be specified to work with the backend
            },
            //these are our two login values, user email and password
            data: {
                "email": this.state.email,
                "password": this.state.password
            }
        })
        .then((res) => {
            console.log(res);
            if (res.data.status === "success") {
                window.sessionStorage.setItem("token", res.data.token); //set token in session storage
                window.sessionStorage.setItem("roles", res.data.roles); //set user roles in session storage
                // this.setState({loggedIn: true}); 
                if (res.data.roles === "teacher"){
                    window.location.replace("/t/dashboard");
                }
                else {
                    window.location.replace("/"); //send to homepage
                }
            }
            else {
                alert(res.data.message);
            }
        })
    }
    handleSignup = (e) => {
        e.preventDefault();
        let canContinue = "";
        //this checks to make sure the email entered is a valid nueva school address
        let domain = "nuevaschool.org"
        var parts = this.state.email.split('@');
        if (parts.length === 2) {
            if (parts[1] === domain) {
                canContinue = "complete";
            } else {
                canContinue = "emailfailed";
            }
        }
        //if the email is valid, axios post the new user. They now need to login with their new account.
        if (canContinue === "complete") {
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
                    "blocknum": this.state.block, //block number of the student's class
                    "name": this.state.name
                }
            })
            .then((res) => {
                if (res.data.status === "success") {
                    alert("Account created successfully!");
                    window.location.reload();
                }
                else {
                    alert("Error: " + res.data.message);
                }
            })
        }
        else if (canContinue === "emailfailed") {
            alert("Email must be a Nueva email address.");
        }
        else if (canContinue === "") {
            alert("Invalid teacher name. Please use one of the names in the dropdown.");
        }
    }
    fetchTeachers = () => {
        axios({
            method: 'get',
            url: '/teacher/teacher-names'
        })
        .then((res) => {
            let stringArray = `${res.data["data"]}`;
            let array = JSON.parse(stringArray);
            this.setState({teachers: array});
        })

    }
    renderTeachers = () => { //lists through all the teachers. This list updates when a new teacher is created. 
        //this is called later when the page is rendered, so the student can select their teacher
        let teachers = this.state.teachers;
        let out = [];
        for (let i = 0; i < teachers.length; i++) {
            let teacher = teachers[i];
            // console.log(teacher)
            out.push(<option key={i} value={teacher["name"]}>{teacher["name"]}</option>);
        }
        return out;
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
                        <input className="form-control form-input" type="text" placeholder='Email' name='email' required onChange={this.handleEmailChange}/>
                        <input className="form-control form-input" type="password" placeholder='Password' name='password' required onChange={this.handlePasswordChange}/>
                        <input className="form-control form-input btn submitbtn btn-dark" type="submit" onClick={this.handleLogin} value="Log In"/>
                    </form>
                    <form>
                        <input className="form-control form-input" type="text" placeholder="Name" name="name" required onChange={this.handleNameChange}/>
                        <input className="form-control form-input" type="text" placeholder='Email' name='email' required onChange={this.handleEmailChange}/>
                        <input className="form-control form-input" type="password" placeholder='Password' name='password' required onChange={this.handlePasswordChange}/>
                        {/* creating a dropdown with all the teachers */}
                        <select className="form-control form-input" name="teacher" defaultValue="" onChange={this.handleTeacherChange}>
                            <option value="" disabled>Select a teacher</option>
                            {this.renderTeachers()}
                        </select>
                        <input className="form-control form-input" type="number" min={1} max={8} placeholder='Block' name='block' required onChange={this.handleBlockChange}/>
                        <input className="form-control form-input btn submitbtn btn-dark" type="submit" onClick={this.handleSignup} value="Sign Up"/>
                    </form>
                    <button className="form-control form-input btn btn-dark" onClick={this.logout}>Log Out</button>

                </div>
            </div>
        )
    }
}
export default LoginPage;