import React from 'react';
import axios from 'axios';
import './Form.css';

//1 of the 3 student-side forms. form data is passed to backend to be displayed on student dashboard.
class ProcrastinationForm extends React.Component {
    constructor(props) {
        super(props);
        //questions are labeled simply as "q1," "q2," etc. 
        //Eventdate is seperate, as it is passed on its own (see axios section)
        this.state = {q1: '',q2:'',q3:'',q4:'',q5:'',eventdate:'',q6:''};

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
        if (qnum === "5") {
          this.setState({q5:e.target.value})
        }
        if (qnum === "date") {
          this.setState({eventdate:e.target.value})
        }
        if (qnum === "6") {
          this.setState({q6:e.target.value})
        }
        // console.log(this.state)
      }
    
    handleSubmit = (e) => {
      e.preventDefault();
      axios({
        method: 'post',
        url: '/submit/procrastination',
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
          q5: this.state.q5,
          q6: this.state.q6
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
          <form id="pform" onSubmit={this.handleSubmit}>
            <h3>
              Procrastination Form:
            </h3>
            <div className="q">
              <label htmlFor="q1" >What were you putting off?</label><br/>
              <input className="form-control form-input" type="text" question="1" onChange={this.handleChange} required placeholder="ie: your Spanish homework..."/>
            </div>
            <div className='q'>
              <label htmlFor="q2">What subject was it for (if any)?</label><br/>
              <select className="form-control form-input" defaultValue={""} question="2" onChange={this.handleChange} required>
                <option value="" disabled>Select an option</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="English">English</option>
                <option value="History">History</option>
                <option value="Language">Foreign Language</option>
                <option value="Art/Music">Art/Music</option>
                <option value="Ilab/Engineering">Ilab/Engineering</option>
                <option value="Physics">Physics</option>
                <option value="Extracurricular">Extracurricular</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="q">
              <label htmlFor="q3" >What was your distraction?</label><br/>
              <input className="form-control form-input" type="text" question="3" onChange={this.handleChange} required placeholder="ie: digging into a plate of cheese..."/>
            </div>
            <div className="q">
              <label htmlFor="q4" >What caused that distraction? — Try and follow a trail of causes</label><br/>
              <input className="form-control form-input" type="text" question="4" onChange={this.handleChange} required placeholder="ie: ravenous hunger after soccer practice..."/>
            </div>
            {/* question that asks "What would you like to try and do about it in the future?" */}
            <div className="q">
              <label htmlFor="q5" >What would you like to try and do about it in the future?</label><br/>
              <input className="form-control form-input" type="text" question="5" onChange={this.handleChange} required placeholder="ie: eat a snack before soccer practice..."/>
            </div>

            <div className="q">
              <label htmlFor="qdate" >Day of procrastination</label><br/>
              <input className="form-control form-input" type="date" question="date" onChange={this.handleChange} required/>
            </div>
            <div className="q">
            <label htmlFor="q6">Is this a recurring problem?</label><br/>
              <select className="form-control form-input" defaultValue={""} question="6" onChange={this.handleChange} required>
                <option value="" disabled>Select an option</option>
                <option value="Recurring">This procrastination is recurring</option>
                <option value="New">This procrastination is new</option>
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

export default ProcrastinationForm;