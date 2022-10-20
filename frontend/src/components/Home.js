import React from 'react';
import axios from 'axios';
import './Home.css';

//website homepage, displaying the 3 form buttons
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {auth:false,procrastinationHref:"",sleepHref:"",feelingsHref:""};
        this.tokenIsValid = this.tokenIsValid.bind(this);
        this.buttonDisplay = this.buttonDisplay.bind(this);
    }
    componentDidMount() {
        this.tokenIsValid();
    }
    //checks to make sure the user is logged in. If not, send them to LoginPage
    tokenIsValid = () => {
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
                // console.log(res)
                if (res.data["status"] === "success") {
                    this.setState({auth:true});
                }
                else {
                    this.setState({auth:false});
                }
            })
        }
        else {
            // console.log('fail')
            this.setState({auth:false});
        }
        
    }
    buttonDisplay = () => {
        if (this.state.auth === true) {
            return (
                <div className="vstack d-flex justify-content-md center align-items-center vh-100 gap-5">                
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#ffc7de'}} href="/procrastination"><span>Procrastination</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#bcf3ff'}} href="/sleep"><span>Sleep</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#feffbc'}} href="/feelings"><span>Feelings</span></a>
                </div>
            );
        }
        else {
            return (
                <div className="vstack d-flex justify-content-md center align-items-center vh-100 gap-5">                
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#ffc7de'}} href="/login"><span>Procrastination</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#bcf3ff'}} href="/login"><span>Sleep</span></a>
                    <a className="btn btn-primary formtype d-flex align-items-center justify-content-center" role="button" style={{background: '#feffbc'}} href="/login"><span>Feelings</span></a>
                </div>
            );
        }
    }
    render() {
        return (
            <div className="container" style={{marginTop:'6vh'}}>
                {this.buttonDisplay()}
            </div>
        );
    }
}

export default Home;

