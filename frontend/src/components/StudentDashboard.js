import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { getMonth } from './calutil';
import Month from './Month';
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import GlobalContext from './calendarContext/GlobalContext';
import './StudentDashboard.css'

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
  
    return (
      <div className={showHideClassName}  id='modalbg' onClick={handleClose}>
        <div className="modal-main">
          {children}
        </div>
      </div>
    );
  };

function StudentDashboard() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex} = useContext(GlobalContext);
    const [events, setEvents] = useState([]);
    const [show, setShow] = useState(false);
    const [eventId, setEventId] = useState(null);
    useEffect(() => {
        setCurrentMonth(getMonth(monthIndex));
    }, [monthIndex]);

    useEffect(() => {
        async function fetchEvents() {
            const response = await axios({
                method: 'get',
                url: '/student/dashboard',
                headers: {
                    'Content-Type': 'application/json',
                    'token':window.sessionStorage.getItem('token')
                }
            })
            if (response.data["status"] === "success") {
                // console.log(response.data["data"])
                let events = JSON.parse(response.data.data)["events"]
                // iterate through events and replace the escaped quotes with the actual character (SEEMS NOT TO WORK SOME OF THE TIME... REPLACED BY renderEvent())
                
                // for (let i = 0; i < events.length; i++) {
                //     // for loop through events[i] dictionary
                //     for (let key in events[i]["data"]['data']) {
                //         events[i]['data']['data'][key] = events[i]['data']['data'][key].replace("&#39;","'").replace("&#34;",'"')
                //     }
                // }
                setEvents(events);
            }
            else if (response.data["status"] === "autherror") {
                window.location.href = "/login";
            } else {
                console.log(response.data["message"]);
            }
        }
        fetchEvents();
    },[]);
    
    function hideModal(e) {        
        if (e.target.id === 'modalbg' || e.target.id === 'modalclosebtn') {
        setShow(false);
    }
    }
    function getShowState(v,id) {
        // console.log(v,id);
        setShow(v);
        setEventId(parseInt(id));

    }

    function renderEvent() {
        // console.log(events,eventId)
        // iterate through all events and if the id matches the eventId, return the event
        for (let i = 0; i < events.length; i++) {
            if (events[i].id === eventId) {
                let event = events[i];
                for (let q in event["data"]) {
                    event["data"][q] = event["data"][q].replace("&#39;","'").replace("&#34;",'"')
                    // instead of unescaping the quotes in the get request, we can just do it here (MUCH EASIER AND LESS BUGGY, IDK WHY)
                }
                if (event.type === 'procrastination') {
                    return (
                        <div className='m-5'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <th>Event Type</th>
                                        <td>{event.type[0].toUpperCase() + event.type.substring(1)}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Date</th>
                                        <td>{event.event_date}</td>
                                    </tr>
                                    <tr>
                                    <th>What was procrastinated on?</th>
                                    <td>{event.data["q1"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What subject was it for?</th>
                                        <td>{event.data["q2"]}</td>
                                    </tr>
                                    <tr>
                                    <th>What was the distraction?</th>
                                    <td>{event.data["q3"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What caused the distraction?</th>
                                        <td>{event.data["q4"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What are some future steps?</th>
                                        <td>{event.data["q5"]}</td>
                                    </tr>
                                    
                                    <tr>
                                        <th>Is it a recurring problem?</th>
                                        <td>{event.data["q6"]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
                else if (event.type === 'sleep') {
                    return (
                        <div className='m-5'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <th>Event Type</th>
                                        <td>{event.type[0].toUpperCase() + event.type.substring(1)}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Date</th>
                                        <td>{event.event_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Hours of sleep</th>
                                        <td>{event.data["q1"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What caused the sleep problem?</th>
                                        <td>{event.data["q2"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What caused the cause?</th>
                                        <td>{event.data["q3"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What are some future steps?</th>
                                        <td>{event.data["q4"]}</td>
                                    </tr>
                                    <tr>
                                    <th>Is it a recurring problem?</th>
                                    <td>{event.data["q5"]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }
                else if (event.type === 'feelings') {
                    return (
                        <div className='m-5'>
                            <table className='table table-borderless'>
                                <tbody>
                                    <tr>
                                        <th>Event Type</th>
                                        <td>{event.type[0].toUpperCase() + event.type.substring(1)}</td>
                                    </tr>
                                    <tr>
                                        <th>Event Date</th>
                                        <td>{event.event_date}</td>
                                    </tr>
                                    <tr>
                                        <th>Emotion felt</th>
                                        <td>{event.data["q1"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What directly caused the emotion?</th>
                                        <td>{event.data["q2"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What led up to you feeling that way?</th>
                                        <td>{event.data["q3"]}</td>
                                    </tr>
                                    <tr>
                                        <th>What are some future steps?</th>
                                        <td>{event.data["q4"]}</td>
                                    </tr>
                                    <tr>
                                        <th>Is it a recurring problem?</th>
                                        <td>{event.data["q5"]}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )
                }

            }
        }
    }

    //renders the student dashboard  components in order (header, modal, sidebar, month)
    return (
        <React.Fragment>
            <CalendarHeader/>
            <Modal show={show} handleClose={hideModal}>
                <div className=''>
                    <button type="button" id='modalclosebtn' className='btn btn-close' onClick={hideModal}></button>
                    {renderEvent()}
                </div>
            </Modal>
            <div className='h-[calc(100vh-140px)] flex flex-columns'>
                <div className='flex flex-1'>
                    <Sidebar events={events}/>
                    <Month month={currentMonth} events={events} sendShowState={getShowState}/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default StudentDashboard;