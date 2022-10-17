import React from 'react'
import dayjs from 'dayjs';
import './day.css';
function Day({day, rowIndex, events}) {
    function getCurrentDayClass() {
        return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY") ? 'bg-blue-600 text-white rounded-full w-7' : '';
    }
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
    function unpackEvents() {
        let unpackedEvents = [];
        for (let i = 0; i < events.length; i++) {
            if (events[i].event_date === day.format("MM-DD-YYYY")) {
                unpackedEvents.push(
                    <div key={i} style={{backgroundColor: `${setEventBg(events[i].type)}`,overflow:'hidden'}} className='text-sm text-center calevent'>
                        <p className='no-margin'>{events[i].type[0].toUpperCase() + events[i].type.substring(1)}</p> {/* capitalize first letter */}
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
            {unpackEvents()}
        </div>  
        
    )
}

export default Day
