import React from 'react';
import axios from 'axios';
import './ProcrastinationForm.css';

class ProcrastinationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {q1: '',q2:"",q3:'',eventdate:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        let qnum = e.target.getAttribute("question");
        if (qnum === "1") {
          this.setState({q1:e.target.value})
        }
        if (qnum === "2") {
          this.setState({q2:e.target.value})
        }
        if (qnum === "3") {
          this.setState({q3:e.target.value})
        }
        if (qnum === "date") {
          this.setState({eventdate:e.target.value})
        }
        console.log(this.state)
      }
    
    handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        url: '/submit/procrastination',
        headers: {
          'Content-Type': 'application/json',
          'token':window.sessionStorage.getItem('token')
        },
        params: {
          eventdate: this.state.eventdate
        },
        data: {
          q1: this.state.q1,
          q2: this.state.q2,
          q3: this.state.q3,
      }})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });      
    }
    
    render() {
    return (
      <div className="container">
        <div className='form-group form-2'>
          <form onSubmit={this.handleSubmit}>
            <h3>
              Procrastination Form:
            </h3>
            <div className="q">
              <label htmlFor="q1" >What were you putting off?</label><br/>
              <input className="form-control form-input" type="text" question="1" onChange={this.handleChange} required placeholder="ie: your Spanish homework..."/>
            </div>
            <div className="q">
              <label htmlFor="q2" >What was your distraction?</label><br/>
              <input className="form-control form-input" type="text" question="2" onChange={this.handleChange} required placeholder="ie: digging into a plate of cheese..."/>
            </div>
            <div className="q">
              <label htmlFor="q3" >What caused that distraction?</label><br/>
              <input className="form-control form-input" type="text" question="3" onChange={this.handleChange} required placeholder="ie: ravenous hunger after soccer practice..."/>
            </div>
            <div className="q">
              <label htmlFor="q4" >Day of procrastination</label><br/>
              <input className="form-control form-input" type="date" question="date" onChange={this.handleChange} required/>
            </div>

            <input className="form-control form-input btn btn-light" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default ProcrastinationForm;