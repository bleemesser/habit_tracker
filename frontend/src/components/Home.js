import React from 'react';
import axios from 'axios';

function procrastinationClick() {
    console.log("Procrastination Form!")
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
                <button className="procrastinationButton" onClick={procrastinationClick}>Procrastination</button>
                <button className="sleepButton" onClick={sleepClick}>Sleep</button>
                <button className="feelingsButton" onClick={feelingsClick}>Feelings</button>
            </div>
        </div>
    );
}

