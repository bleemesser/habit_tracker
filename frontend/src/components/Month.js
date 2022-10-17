import React from 'react'
import Day from './Day';

function Month({month, events}) {
    return (
        <div className='flex-1 grid grid-cols-7 grid-rows-5'>
            {month.map((row,i) => (
                <React.Fragment key={i}>
                    {row.map((day,j) => (
                        <Day day={day} events={events} key={j} rowIndex={i}/>
                    ))}
                </React.Fragment>
            ))}
        </div>
    )
}

export default Month
