import React from 'react';
import axios from 'axios';
import './Form.css';

//1 of the 3 student-side forms. form data is passed to backend to be displayed on student dashboard.
class FeelingsForm extends React.Component {
    constructor(props) {
        super(props);
        //questions are labeled simply as "q1," "q2," etc. 
        //Eventdate is seperate, as it is passed on its own (see axios section)
        this.state = {q1: '',q2:'',q3:'',q4:'',eventdate:'',q5:''};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    //properly updates the state with the current value of each input, logging it all to console. 
    //The console message will be 1 behind the actual values at all times, it's not broken, the logging is just flawed.
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
        // console.log(this.state)
      }
    
    handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        url: '/submit/feelings',
        headers: {
          'Content-Type': 'application/json',
          //checks that the user is logged in
          'token':window.sessionStorage.getItem('token')
        },
        //eventdate is passed seperately from the other questions, as it is used on the dashboards to catalogue items.
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
        // console.log(response);
        //returns to homepage
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
              <input className="form-control form-input" type="text" question="1" onChange={this.handleChange} required placeholder="ie: really sad... | stressed..."/>
            </div>
            <div className='q'>
              <label htmlFor="q2">Was there a direct cause? If so, what was it?</label><br/>
              <input tpye="text" className="form-control form-input" question="2" onChange={this.handleChange} required placeholder="ie: my friend and I are fighting... | I'm having trouble writing an essay..."/>
            </div>
            <div className='q'>
              <label htmlFor="q3">What led up to this event? — Try and follow a trail of causes</label><br/>
              <input tpye="text" className="form-control form-input" question="3" onChange={this.handleChange} required placeholder="ie: I said something bad about them... | the due date is tomorrow so I can't meet with my teacher before then..."/>
            </div>
            <div className="q">
              <label htmlFor="q4" >Write some steps that you think might help resolve your feelings</label><br/>
              <input className="form-control form-input" type="text" question="4" onChange={this.handleChange} required placeholder="ie: talk to my friend... | ask for an extension..."/>
            </div>
            <div className="q">
              <label htmlFor="qdate" >When did this happen?</label><br/>
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