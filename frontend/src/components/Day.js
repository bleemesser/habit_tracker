import React from 'react'
import dayjs from 'dayjs';
import './day.css';

//this component is rendered on the Student Dashboard. see StudentDashboard.js to see when it renders (in comparison to other components)
function Day({day, rowIndex, events, pushShowState}) {

    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
    }
    //determines the visual appearance of the habit logs when displayed on the calendar
    function setEventBg(type) {
        if (type === "procrastination") {
            return 'rgb(255, 199, 222)';
        }
        else if (type === "sleep") {
            return 'rgb(188, 243, 255)';
        }
        else if (type === "feelings") {
            return 'rgb(254, 255, 188)';
        }
    }
    //makes a simple modal appear, showing relevant log information
    function showModal(e) {
        let id = e.target.id;
        pushShowState(true, id);

    }
    // unpack list of events into a list of styled divs
    function unpackEvents() {
        let unpackedEvents = [];
        for (let i = 0; i < events.length; i++) {
            let id =  events[i].id;
            if (events[i].event_date === day.format("MM-DD-YYYY")) {
                unpackedEvents.push(
                    <div key={i} id={id} onClick={showModal} style={{backgroundColor: `${setEventBg(events[i].type)}`,overflow:'hidden'}} className='text-sm text-center calevent rounded mb-1 '>
                        {events[i].type[0].toUpperCase() + events[i].type.substring(1)}{/* capitalize first letter */}
                    </div>
                );
            }
        }
        return unpackedEvents;
    }
    return (

        <div className='border border-gray-200 flex flex-col'> 
            
            <header className='flex flex-col items-center'>
                {rowIndex === 0 && (
                    <p className='text-sm mt-1'>{day.format("ddd").toUpperCase()}</p>
                )}
                <p className={`text-sm p-1 my-1 text-center ${getCurrentDayClass()}`}>{day.format("DD")}</p>
            </header>
            <div style={{overflowY:'scroll'}}>
                {unpackEvents()}
            </div>
        </div>  

        
    )
}

export default Day
