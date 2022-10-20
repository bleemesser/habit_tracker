import dayjs from 'dayjs';

//gets the current year, first day of the month, current month, and fills out the calendar. 
//Essentially formatting the calendar in a nice, familiar way (like google calendar does)
export function getMonth(month = dayjs().month()) {
    const year = dayjs().year();
    const firstDayOfTheMonth = dayjs(new Date(year,month,1)).day();
    let currentMonthCount = 0 - firstDayOfTheMonth;
    const daysMatrix = new Array(5).fill([]).map(() => {
        return new Array(7).fill(null)
        .map(() => {
            currentMonthCount++; return dayjs(new Date(year,month,currentMonthCount));
        });
    });
    return daysMatrix;
}