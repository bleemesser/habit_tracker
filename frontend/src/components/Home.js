import React from 'react';
import axios from 'axios';
import './Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.submitProcrastinationForm = this.submitProcrastinationForm.bind(this);
        this.submitSleepForm = this.submitSleepForm.bind(this);
        this.submitFeelingsForm = this.submitFeelingsForm.bind(this);
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
    submitSleepForm = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/submit/sleep',
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
    submitFeelingsForm = (e) => {
        e.preventDefault();
        axios({
            method: 'post',
            url: '/submit/feelings',
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
    render() {
        return (
            <div className="delta">
                <h1 className="homePageTitle">SEL Habit Tracker</h1>
                <div className="deltaButtons">
                    <button className="procrastinationButton" onClick={this.submitProcrastinationForm}>Procrastination</button>
                    <button className="sleepButton" onClick={this.submitSleepForm}>Sleep</button>
                    <button className="feelingsButton" onClick={this.submitFeelingsForm}>Feelings</button>
                </div>
            </div>
        );
        }
}

export default Home;

