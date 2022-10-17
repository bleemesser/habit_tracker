import React, {useContext, useEffect, useState} from 'react'
import axios from 'axios';
import { getMonth } from './calutil';
import Month from './Month';
import CalendarHeader from './CalendarHeader';
import Sidebar from './Sidebar';
import GlobalContext from './calendarContext/GlobalContext';

function StudentDashboard() {
    const [currentMonth, setCurrentMonth] = useState(getMonth());
    const {monthIndex} = useContext(GlobalContext);
    const [events, setEvents] = useState([]);
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
                setEvents(JSON.parse(response.data.data)["events"]);
            }
            else {
                console.log(response.data["message"]);
            }
        }
        fetchEvents();
    },[]);
    
    return (
        <React.Fragment>
            <CalendarHeader/>
            <div className='h-[calc(100vh-140px)] flex flex-columns'>
                <div className='flex flex-1'>
                    <Sidebar events={events}/>
                    <Month month={currentMonth} events={events}/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default StudentDashboard;