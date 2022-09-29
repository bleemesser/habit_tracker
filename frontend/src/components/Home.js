import React from 'react';
import axios from 'axios';

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

function sleepClick() {
    console.log("Sleep Form!")
}

function feelingsClick() {
    console.log("Feelings Form!")
}

export function Home () {
    return (
        <div className="delta">
            <h1 className="homePageTitle">SEL Habit Tracker</h1>
            <div className="deltaButtons">
                <button className="procrastinationButton" onClick={submitProcrastinationForm}>Procrastination</button>
                <button className="sleepButton" onClick={sleepClick}>Sleep</button>
                <button className="feelingsButton" onClick={feelingsClick}>Feelings</button>
            </div>
        </div>
    );
}

