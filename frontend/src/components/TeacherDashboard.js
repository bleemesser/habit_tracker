import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import './TeacherDashboard.css';
//Renders a table of student information for the teachers' use
class TeacherDashboard extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {Students: [], loggedIn: true,selectedStudent: {name: "", email: "", teacher: "", block: ""}, studentToDelete: "", teacherToCreate:{name:"", email:"", password:""}, openForm: "",teachers:[]};
        this.studentsList = this.studentsList.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.showForm = this.showForm.bind(this);
        this.onChangeBlock = this.onChangeBlock.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeTeacher = this.onChangeTeacher.bind(this);
        this.eventsList = this.eventsList.bind(this);
        this.selectStudent = this.selectStudent.bind(this);
        this.editStudent = this.editStudent.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
        this.tokenIsValid = this.tokenIsValid.bind(this);
        this.createTeacher = this.createTeacher.bind(this);
        this.onChangeTeacherName = this.onChangeTeacherName.bind(this);
        this.onChangeTeacherEmail = this.onChangeTeacherEmail.bind(this);
        this.onChangeTeacherPassword = this.onChangeTeacherPassword.bind(this);
        this.showTeacherForm = this.showTeacherForm.bind(this);
        this.checkIfStudentIsSame = this.checkIfStudentIsSame.bind(this);
        this.fetchTeachers = this.fetchTeachers.bind(this);
        this.createDataList = this.createDataList.bind(this);

    } 
    
    // Axios call to grab our student information under /teacher/dashboard, set it equal to Students
    componentDidMount() {
        if (window.sessionStorage.getItem('token') != null) {
            axios({
                method: 'get',
                url: '/teacher/dashboard',
                headers: {
                    'Content-Type': 'application/json',
                    'token': window.sessionStorage.getItem('token')
                }
            })
            .then(response => {
                
                if (response.data.status === "autherror") {
                    alert("Authentication error: session has expired or is invalid. Please log in again.");
                    this.setState({loggedIn: false});
                }
                if (response.data.status === "success") {
                    this.fetchTeachers();
                    let data = JSON.parse(JSON.parse(JSON.stringify(response.data))["data"]) // takes the string, converts it to json, selects the "data" string of an array, converts it to an array object
                    this.setState({ Students: data});
                }
            })
            .catch(function (error) {
                console.log(error);
            }) 
        }
        else {
            alert("You are not logged in!");
            this.setState({loggedIn: false});
        }
    }
    tokenIsValid = () => { // maybe unnecessary on this page, creating the student list in componentDidMount already checks for token validity
        // it's not used either way, just for future use...
        let token = window.sessionStorage.getItem("token");
        if (token !== null && token !== '') {
            axios({
                method: 'post',
                url: '/auth/token',
                headers: {
                    'Content-Type': 'application/json',
                    'token': token
                }
            })
            .then((res) => {
                if (res.data["status"] === "success") {
                    
                    return true;
                }
                else {
                    
                    return false;
                }
            })
        }
        else {
            console.log("Token is invalid");
            return false;
        }
        
    }
    createTeacher = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/auth/create_teacher',
            headers: {
                'Content-Type': 'application/json',
                'token': window.sessionStorage.getItem('token')
            },
            data: {
                name: this.state.teacherToCreate.name,
                email: this.state.teacherToCreate.email,
                password: this.state.teacherToCreate.password
            }
        })
        .then((response) => {
            
            if (response.data.status === "error") {
                alert("Error creating teacher: " + response.data.message);
            }
            if (response.data.status === "success") {
                alert("Teacher created successfully!");
            }
        })
    }
    showTeacherForm = () => {
        if (this.state.creatingTeacher === true) {
            return (
                <form onSubmit={this.createTeacher}>
                    <div className="form-group">
                        <input type="text" className="form-control teacher-form-input" placeholder='Name' onChange={this.onChangeTeacherName}/>
                        <input type="text" className="form-control teacher-form-input" placeholder='Email' onChange={this.onChangeTeacherEmail}/>
                        <input type="password" className="form-control teacher-form-input" placeholder='Password' onChange={this.onChangeTeacherPassword}/>
                        <input type="submit" value="Submit" className="form-control teacher-form-input btn btn-light"/>
                    </div>
                </form>
            )
        }
        else {
            return <></>
        }
    }
    onChangeTeacherName = (e) => {
        this.setState({teacherToCreate: {name: e.target.value, email: this.state.teacherToCreate.email, password: this.state.teacherToCreate.password}});
    }
    onChangeTeacherEmail = (e) => {
        this.setState({teacherToCreate: {name: this.state.teacherToCreate.name, email: e.target.value, password: this.state.teacherToCreate.password}});
    }
    onChangeTeacherPassword = (e) => {
        this.setState({teacherToCreate: {name: this.state.teacherToCreate.name, email: this.state.teacherToCreate.email, password: e.target.value}});
    }
    showForm = () => {
        if (this.state.selectedStudent["email"] !== "") { // eventually this form should be rendered on top of the table, as sort of a popup, and disappear when the user clicks outside of it or submits it
            return (
                <div className='container'>
                <form onSubmit={this.editStudent}>
                    {/* <label>Student Name:</label> */}
                    <small id="namesmall" className="form-text text-muted">Name</small>
                    <input aria-describedby="namesmall" className="form-control form-control-sm" type="text" name="name" placeholder={this.state.selectedStudent["name"]} onChange={this.onChangeName} />
                    <small id="teachersmall" className="form-text text-muted">Teacher</small>
                    <input aria-describedby="teachersmall" list="teachers" autoComplete='off' className="form-control form-control-sm" type="text" name="teacher" placeholder={this.state.selectedStudent["teacher"]} onChange={this.onChangeTeacher} />
                    <datalist id="teachers">
                        {this.createDataList()}
                    </datalist>
                    <small id="blocksmall" className="form-text text-muted">Block</small>
                    <input aria-describedby="blocksmall" className="form-control form-control-sm" type="number" min="1" max="8" name="blocknum" placeholder={this.state.selectedStudent["block"]} onChange={this.onChangeBlock} />
                    <input className='form-control editform-submitbtn form-control-sm btn btn-sm btn-light' type="submit" value="Edit Student" />
                </form>
                </div>
            )
        }
        else {
            return null
        }
        
    }

    selectStudent = (e) => { // DONT CHANGE THIS it was very annoying to set up so that the edit ui would work as a user would intuitively expect:
        // the user clicks on a student, the edit ui pops up, the user clicks on another student, the edit ui updates to the new student, the user clicks on the same student again, the edit ui disappears
        if (e.target.getAttribute('studentemail') !== this.state.selectedStudent["email"] && e.target.getAttribute('studentemail') !== this.state.openForm) {
            this.setState({openForm:e.target.getAttribute('studentemail')});
            let email = e.target.getAttribute('studentemail');
            let student = this.state.Students.filter(student => student["email"] === email);
            student = student[0];
            this.setState({
                selectedStudent: {
                    email: student["email"], 
                    name: student["name"], 
                    teacher: student["teacher"], 
                    block: student["blocknum"]
                }
            })
        }
        else if (this.state.selectedStudent["email"] !== this.state.openForm) {
            let email = e.target.getAttribute('studentemail');
            let student = this.state.Students.filter(student => student["email"] === email);
            student = student[0];
            this.setState({
                selectedStudent: {
                    email: student["email"], 
                    name: student["name"], 
                    teacher: student["teacher"], 
                    block: student["blocknum"]
                }
            })
        }
        else {
            this.setState({selectedStudent: {email: "", name: "", teacher: "", block: ""}})
        }

    }

    deleteStudent = (e) => {
        axios({
            method: 'post',
            url: '/teacher/delete-student',
            headers: {
                'Content-Type': 'application/json',
                'token': window.sessionStorage.getItem('token')
            },
            data: {
                "email": e.target.getAttribute('studentemail')
            }
        })
        .then((res) => {
            alert("User deleted!");
            this.componentDidMount();
        })
    }
    editStudent = (e) => {
        e.preventDefault();
        let canContinue = false;
        for (let i = 0; i < this.state.teachers.length; i++) {
            if (this.state.teachers[i]["name"] === this.state.selectedStudent["teacher"]) {
                canContinue = true;
            }
        }
        if (canContinue === true) {
            alert("Student edited!");
            axios({
                method: 'post',
                url: '/teacher/edit-student',
                headers: {
                    'Content-Type': 'application/json',
                    "token":window.sessionStorage.getItem("token")
                },
                data: {
                    "email": this.state.selectedStudent["email"],
                    "name": this.state.selectedStudent["name"],
                    "teacher": this.state.selectedStudent["teacher"],
                    "blocknum": this.state.selectedStudent["blocknum"]
                }
            })
            .then((res) => {
                console.log(res); // while the request itself will return code 200 (success), the backend will return a custom status in res.data.status which is what
                // should be checked to see if the request was successful
                if (res.data.status === "success") {
                    this.componentDidMount();
                    // need to redirect to login page
                }
                else {
                    alert(res.data.message);
                }
            })
        }
        else {
            alert("Teacher does not exist!");
        }
    }

    onChangeBlock = (e) => {
        let student = this.state.selectedStudent;
        student["blocknum"] = e.target.value;
        this.setState({selectedStudent: student});
        console.log(this.state.selectedStudent);
    }

    onChangeName = (e) => {
        let student = this.state.selectedStudent;
        student["name"] = e.target.value;
        this.setState({selectedStudent: student});
    }

    onChangeTeacher = (e) => {
        let student = this.state.selectedStudent;
        student["teacher"] = e.target.value;
        this.setState({selectedStudent: student});
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
            console.log(array)

        })

        

    }
    createDataList = () => {
        let teachers = this.state.teachers;
        let out = [];
        for (let i = 0; i < teachers.length; i++) {
            out.push(<option key={i} value={teachers[i]["name"]}></option>)
        }
        return out;
    }
    eventsList = (student) => {
        
        if (student["events"].length > 0) {
            return student["events"][student["events"].length - 1]["type"]
        }
        else {
            return "None"
        }
    }
    checkIfStudentIsSame = (student) => {
        if (this.state.selectedStudent.email === student["email"]) {
            return this.showForm();
        }
    }
    studentsList = () => {
        if (this.state.loggedIn === false) {
            return <Navigate to='/login' />
        }
        let students = this.state.Students
        let out = []
        for (let i = 0; i < students.length; i++) {
            let student = students[i]
            out.push(
                <tr key={student["id"]}>
                    <td>{student["name"]}</td>
                    <td style={{overflow:'clip',maxWidth:'20%'}}>{student["email"]}</td>
                    <td>{student["last_submission"]}</td>
                    <td>{this.eventsList(student)}</td>
                    <td>{student["events"].length}</td>
                    <td>{student["teacher"]}</td>
                    <td>{student["blocknum"]}</td>
                    <td><button className="btn btn-secondary" studentemail={student["email"]} onClick={this.selectStudent}>Edit</button>{this.checkIfStudentIsSame(student)}</td>
                    <td><button className='btn btn-secondary' studentemail={student["email"]} onClick={this.deleteStudent}>Delete</button></td>
                </tr>
            )
        }
        return out
    }

    render() {
        return( 
            <div className="dashboard container">
                <div className="teacher-create">
                    <button className="btn btn-secondary" onClick={() => {
                        
                        this.setState({creatingTeacher: !this.state.creatingTeacher})
                    }}>Create Teacher</button>
                    {this.showTeacherForm()}
                </div>
                <div className='table-responsive' style={{maxWidth:'120%'}}>
                <table className='table table-responsive' >
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Latest Log</th>
                            <th>Latest Log Type</th>
                            <th>Total Logs</th>
                            <th>Teacher</th>
                            <th>Block</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentsList() }
                    </tbody>
                </table>
                </div>
                <div id='editform'>
                </div>
            </div>
        )
    }
}

export default TeacherDashboard;