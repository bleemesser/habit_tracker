// set up react class component
import React from 'react'
import axios from 'axios';
import { json } from 'react-router-dom';

class StudentDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {data:[]};
        this.fetchData = this.fetchData.bind(this);
        this.renderData = this.renderData.bind(this);

    }
    // when component is mounted, fetch data
    componentDidMount() {
        this.fetchData();
    }
    // fetch data from backend
    fetchData = () => {
        axios({
            method: 'get',
            url: '/student/dashboard',
            headers: {
                'Content-Type': 'application/json',
                'token':window.sessionStorage.getItem('token')
            }
        })
        .then((response) => {
            // console.log(response);
            if (response.data.status === "success") {
                // convert data to array using json parse
                // console.log(JSON.parse(response.data.data)["events"]);
                this.setState({data: JSON.parse(response.data.data)["events"]}, () => {console.log(this.state)});
        }})
        .catch((error) => {
            console.log(error);
        });
    }
    // render data
    renderData = () => {
    //     let elements = [];
    //     for (let i = 0; i < this.state.data.length; i++) {
    //         Object.entries(this.state.data[i]).forEach(([key, value]) => {
    //             elements.push(<p key={i}>{value}</p>)
    //         });
            
    //     }
    //     return elements;

    // }
    return this.state.data.map((item, index) => {
        console.log(item)
        return (
            <div key={index}>

                <p>{item.event_date}</p>
                <p>{item.date_submitted}</p>
                <p>{item.type}</p>
                <p>{item.data.q1}</p>
                <p>{item.data.q2}</p>
                <p>{item.data.q3}</p>
                <p>{item.data.q4}</p>
                <p>{item.data.q5}</p>
            </div>
        )
    })
}
    // render component
    render() {
        return (
            <div>
                {this.renderData()}
            </div>
        )
    }
}
export default StudentDashboard;