import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = props => (
    <tr>
        <td>{props.post.}</td>
        <td>{props.post.postdate}</td>
        <td>{props.post.postfor}</td>
        <td>{props.post.username}</td>
        <td>
        <Link to={"/changenote-"+props.post.note}>Edit</Link>
        {/* This allows individual notes to be changed with the edit button, we are going to use the edit not component for this, and it passes the note so it is unique. */}
        </td>
    </tr>
)

//Renders a table of student information for the teachers' use
class TeacherDashboard extends React.Component {
    Constructor(props) {
        super.props;
        this.state = {Students: []};
    } 
    //Axios call to grab our student information under /teacher/dashboard, set it equal to Students
    componentDidMount() {
        axios.get('http://localhost:5000/teacher/dashboard')
            .then(response => {
                this.setState({ Students: response.data });
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error){
                console.log(error);
            })
    }

    StudentList() {
        return this.state.Students.mapmap(function(currentStudent, i){
            return <Student student={currentStudent} key={i} />;
        })
    }

    render() {
        return(
            <div className="dashboard">
                <h2 className="dashboard_title">Teacher Dashboard</h2>
                <table>
                    <tr>
                        <th>Student Name</th>
                        <th>Student Email</th>
                        <th>Latest Log</th>
                        <th>Log Type</th>
                        <th>Total Logs</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <td>Bodie Currier</td>
                        <td>bodcurr@nuevaschool.org</td>
                        <td>10/1/2022</td>
                        <td>Procrastination</td>
                        <td>1</td>
                        <td>
                            <button>Edit</button>
                        </td>
                        <td>
                            <button>Delete</button>
                        </td>
                    </tr>
                    <tbody>
                        { this.StudentsList() }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default TeacherDashboard;