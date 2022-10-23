# Open
- frontend/TeacherDashboard.js
    - Clicking the "block" or "name" table headers *should* immediately sort the table by that column, but it doesn't.  It only sorts when you click the header a second time. I think this is a react state complication that I can't be bothered to work out right now.
- in student.py --> /download does not unescape the "&\#39;" or the "&\#34;" before creating the csv. It's not a problem, just ugly for the user.
# Closed
- frontend and backend
    - submitting a ' or a " into an event form will break the event form.  This is because the form is not properly escaped.  This is a problem with the backend, but it's also a problem with the frontend because it should be escaping the input before sending it to the backend. 
    - fix: 
        - in the \_\_repr\_\_ method of the Event model, use html escaping for the response data. Thus when the backend returns the events as a string, it will be properly escaped.
        - in the frontend, when the data is received in TeacherDashboard.js and StudentDashboard.js, un-escape the data so it can be properly represented and not cause json parsing errors.



# Features:
## High Priority
- Deployment: dockerize the app more fully including the database, in a way where the database is safe and can be easily backed up in case of failure.

## Medium Priority
- Passwords: add functionality for students to be able to reset their passwords via email. The teacher should not be able to do this for them because the data the students are submitting could be personal and should be kept private. This feature will take some work because it will require frontend and (major) backend changes, as well as an email server to send the emails from.

## Low priority but cool
- Data analysis: analyze students responses to the forms to help them identify causes behind them procrastinating, losing sleep, or feeling emotionally hurt/unstable.