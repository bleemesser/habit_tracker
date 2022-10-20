import React, { useContext } from 'react'
import GlobalContext from './calendarContext/GlobalContext';
import dayjs from 'dayjs';

//see StudentDashboard.js to see the order that this is render in with other components!
function CalendarHeader() {
    const {monthIndex,setMonthIndex} = useContext(GlobalContext);
    function prevMonth() {
        setMonthIndex(monthIndex - 1);
    }
    function nextMonth() {
        setMonthIndex(monthIndex + 1);
    }
    function resetMonth() {
        setMonthIndex(dayjs().month());
    }
    
    //makes a header with arrows (to navitage across months) and the current month name, rendered above the calendar itself. 
    return (
        <header className="px-4 py-2 flex items-center">
            <button className='rounded py-2 px-4 mr-5 btn btn-light' onClick={resetMonth}>Today</button>
            <button onClick={prevMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>chevron_left</span>
            </button>
            <button onClick={nextMonth}>
                <span className='material-icons-outlined cursor-pointer text-gray-600 mx-2'>chevron_right</span>
            </button>
            <h2 className='ml-4 text-xl text-500 font-bold'>
                {dayjs(new Date(dayjs().year(),monthIndex)).format("MMMM YYYY")}
            </h2>
        </header>

    )
}

export default CalendarHeader
