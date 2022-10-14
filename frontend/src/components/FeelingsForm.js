import React from 'react';
import axios from 'axios';
import './Form.css';

class FeelingsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {q1: '',q2:'',q3:'',q4:'',eventdate:'',q5:''};

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
        if (qnum === "4") {
            this.setState({q4:e.target.value})
          }
        if (qnum === "date") {
            this.setState({eventdate:e.target.value})
          }
        if (qnum === "5") {
        this.setState({q5:e.target.value})
        }
        console.log(this.state)
      }
    
    handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        url: '/submit/sleep',
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
          q4: this.state.q4,
          q5: this.state.q5
      }})
      .then((response) => {
        console.log(response);
        window.location.replace("/");
      })
      .catch((error) => {
        console.log(error);
      });
      
    }
    
    render() {
    return (
      <div className="container">
        <div className='form-group form-2'>
          <form id="sform" onSubmit={this.handleSubmit}>
            <h3>
              Feelings Form:
            </h3>
            <div className="q">
              <label htmlFor="q1" >What were you feeling?</label><br/>
              <input className="form-control form-input" type="text" question="1" onChange={this.handleChange} required placeholder="ie: really sad..."/>
            </div>
            <div className='q'>
              <label htmlFor="q2">Why were you feeling that way?</label><br/>
              <input tpye="text" className="form-control form-input" question="2" onChange={this.handleChange} required placeholder="ie: my friend and I are fighting..."/>
            </div>
            <div className='q'>
              <label htmlFor="q3">What caused that issue? — Try and follow a trail of causes</label><br/>
              <input tpye="text" className="form-control form-input" question="3" onChange={this.handleChange} required placeholder="ie: I said something bad about them..."/>
            </div>
            <div className="q">
              <label htmlFor="q4" >How are you going to resolve this emotional issue?</label><br/>
              <input className="form-control form-input" type="text" question="4" onChange={this.handleChange} required placeholder="ie: talk to my friend..."/>
            </div>
            <div className="q">
              <label htmlFor="qdate" >Date of Feelings</label><br/>
              <input className="form-control form-input" type="date" question="date" onChange={this.handleChange} required/>
            </div>
            <div className="q">
            <label htmlFor="q5">Are these feelings recurring?</label><br/>
              <select className="form-control form-input" defaultValue={""} question="5" onChange={this.handleChange} required>
                <option value="" disabled>Select an option</option>
                <option value="Recurring">These feelings are recurring</option>
                <option value="New">These feelings are new</option>
                <option value="Unsure">Not sure</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <input className="form-control form-input btn btn-dark" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}

export default FeelingsForm;