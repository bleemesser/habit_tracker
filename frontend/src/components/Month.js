import React from 'react'
import Day from './Day';

//this component is rendered on the Student Dashboard. see StudentDashboard.js to see when it renders (in comparison to other components)
function Month({month, events, sendShowState}) {
    function pullShowState(v,id) {
        sendShowState(v,id);
    }
    //displays days and events in a month-calendar format
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {month.map((row,i) => (
                <React.Fragment key={i}>
                    {row.map((day,j) => (
                        <Day day={day} events={events} key={j} rowIndex={i} pushShowState={pullShowState}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Month
