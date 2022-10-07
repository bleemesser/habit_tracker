import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

//Renders a table of student information for the teachers' use
class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Students: [], loggedIn: true, editForm: <></>,selectedStudent: {name: "", email: "", teacher: "", block: ""}, studentToDelete: "" };
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
    } 
    //Axios call to grab our student information under /teacher/dashboard, set it equal to Students
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
                console.log(response);
                if (response.data.status === "autherror") {
                    // alert("You are not authorized to view this page or there has been an error. Please log in to a teacher account.");
                    this.setState({loggedIn: false});
                }
                if (response.data.status === "success") {
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
    
    showForm = () => {
        if (this.state.selectedStudent["email"] !== "") { // eventually this form should be rendered on top of the table, as sort of a popup, and disappear when the user clicks outside of it or submits it
            return (
                <form onSubmit={this.editStudent}>
                    <label>Student Name:</label>
                    <input type="text" name="name" placeholder={this.state.selectedStudent["name"]} onChange={this.onChangeName} />
                    <label>Teacher:</label>
                    <input type="text" name="teacher" placeholder={this.state.selectedStudent["teacher"]} onChange={this.onChangeTeacher} />
                    <label>Block Number:</label>
                    <input type="number" min="1" max="8" name="blocknum" placeholder={this.state.selectedStudent["blocknum"]} onChange={this.onChangeBlock} />
                    <input className='btn btn-secondary' type="submit" value="Edit Student" />
                </form>
            )
        }
        else {
            return null
        }
        
    }

    selectStudent = (e) => {
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

    deleteStudent = (e) => {
        axios({
            method: 'delete',
            url: '/teacher/delete-student',
            headers: {
                'Content-Type': 'application/json',
                'token': window.sessionStorage.getItem('token')
            },
            data: {
                "email": e.target.getAttribute('studentemail')
            }
        })
        .then(res => {
            alert("Student deleted!");
            this.componentDidMount();
        })
    }
    editStudent = (e) => {
        e.preventDefault();
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

    eventsList = (student) => {
        // console.log("STUDENT", student);
        if (student["events"].length > 0) {
            return student["events"][student["events"].length - 1]["type"]
        }
        else {
            return "None"
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
                    <td>{student["email"]}</td>
                    <td>{student["last_submission"]}</td>
                    <td>{this.eventsList(student)}</td>
                    <td>{student["events"].length}</td>
                    <td>{student["teacher"]}</td>
                    <td>{student["blocknum"]}</td>
                    <td><button className="btn btn-secondary" studentemail={student["email"]} onClick={this.selectStudent}>Edit</button></td>
                    <td><button className='btn btn-secondary' studentemail={student["email"]} onClick={this.deleteStudent}>Delete</button></td>
                </tr>
            )
        }
        return out
    }

    render() {
        return( 
            <div className="dashboard container">
                <table className='table'>
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
                <div id='editform'>
                    {this.showForm()}
                </div>
            </div>
        )
    }
}

export default TeacherDashboard;