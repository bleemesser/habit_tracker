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
            <div className="container" style={{marginTop:'6vh'}}>
                <div className="vstack d-flex justify-content-md center align-items-center vh-100 gap-5">                
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" href="/procrastination" role="button" style={{background: '#ffc7de'}} onClick={this.submitProcrastinationForm}><span>Procrastination</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" href="/sleep" role="button" style={{background: '#bcf3ff'}} onClick={this.submitSleepForm}><span>Sleep</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" href="/feelings" role="button" style={{background: '#feffbc'}} onClick={this.submitFeelingsForm}><span>Feelings</span></a>
                </div>
            </div>
        );
        }
}

export default Home;

