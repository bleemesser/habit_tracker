import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Renders a table of student information for the teachers' use
class TeacherDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {Students: []};
        this.studentsList = this.studentsList.bind(this);
    } 
    //Axios call to grab our student information under /teacher/dashboard, set it equal to Students
    componentDidMount() {
        axios.get('/teacher/dashboard')
            .then(response => {
                let data = JSON.parse(JSON.parse(JSON.stringify(response.data))["data"]) // takes the string, converts it to json, selects the "data" string of an array, converts it to "json" (really an array)
                this.setState({ Students: data});
                console.log(data)
            })
            .catch(function (error){
                console.log(error);
            })
    }

    studentsList = () => {
        let students = this.state.Students
        let out = []
        for (let i = 0; i < students.length; i++) {
            let student = students[i]
            out.push(
                <tr key={student["id"]}>
                    <td>{student["name"]}</td>
                    <td>{student["email"]}</td>
                    <td>{student["last_submission"]}</td>
                    <td>{student["events"][student["events"].length-1]["type"]}</td>
                    <td>{student["events"].length}</td>
                </tr>
            )
        }
        return out
    }

    render() {
        return( 
            <div className="dashboard">
                <h2 className="dashboard_title">Teacher Dashboard</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Student Email</th>
                            <th>Latest Log</th>
                            <th>Latest Log Type</th>
                            <th>Total Logs</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.studentsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TeacherDashboard;