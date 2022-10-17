import React, { useContext } from 'react'
import GlobalContext from './calendarContext/GlobalContext';
import dayjs from 'dayjs';
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
    return (
        <header className="px-4 py-2 flex items-center">
            <button className='border rounded py-2 px-4 mr-5' onClick={resetMonth}>Today</button>
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
