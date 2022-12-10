# Tests
## Backend route tests
- start the backend (preferrably with an empty database attached)
- run ```python(3) test.py```
This suite does covers signup, login, csv download, all 3 forms. It does not cover teacher dashboard, student dashboard, teacher routes: edit-student, delete-student
## End-to-end test instructions
The app has these functionality that should work at all times, if you cannot do these things, something (probably your code) broke a feature.
- Load the "/" route and see the homepage with 3 buttons
- Assuming no cookies are present, clicking any button on the homepage except the title should redirect to the login page
- Once on the login page, logging in with the account "master@teacher" and the password set when following the first-time setup instructions should redirect to the teacher homepage. 
- If any accounts (student or teacher) other than the master account are present, they should be visible on this page.
- From the teacher homepage logged in as master or a teacher, clicking the "Create Teacher" button should reveal a form. 
- Filling out the form and clicking "Submit" should create a new teacher account but not redirect, and an alert should pop up saying "Teacher created successfully!". 
- The new account should be visible on the teacher homepage upon reload, but ONLY if the logged in user is the master account. 
- If the logged in user is a teacher, the new account should not be visible (to prevent accidental deletions).
- Returning to the login page and logging in with the new teacher account should redirect to the teacher homepage.
- If the teacher account has students, they should be visible on the teacher homepage.
- Clicking the "Log Out" button on the login page should clear the token cookie but not redirect. You can check this by using the browser's developer tools to inspect the session storage. Inspect element > Application > Session Storage > [url] > [token and roles]. Those two values should be cleared or nonexistent.
- Once a teacher account other than the master account is present, it should be visible in the "Select a Teacher" dropdown on the login page. 
- Filling out the 2nd form on the login page (to sign up a student) and clicking "Submit" should pop up an alert with either an error message if the form was filled out wrong, or "User created successfully!" if the form was filled out correctly. 
    - The error messages could be: 
        - "Please fill out all fields"
        - "Email must be a Nueva email address."
        - "Email already registered"
        - "An input is too short or not present"
        - "Data is of invalid type"
        - "Data is missing"
- Once the student is created successfully, the credentials should be usable in the login form. Logging in as a student should redirect to the site homepage.
- Filling out one of the forms on the site homepage should redirect to the site homepage with no alert. If they receive an alert, the form was filled out incorrectly or their credentials have expired. 
- Logged in as a student, clicking the "Dashboard" button should redirect to the student dashboard. On it, they should see a calendar view that contains any events they have created. If they have data, a donut chart should be visible summarizing the data they have entered.
- Clicking one of the events on the calendar should reveal a modal with the event's details.
- Clicking the "X" button on the modal should close it. Clicking anywhere outside the modal should also close it.
- Clicking the "Download Data" button on the student dashboard should immediately download a CSV file with the student's data. This may be an empty file if the student has no events created.
- Logging in as a teacher, the teacher dashboard should now be populated with the new student created previously, assuming the student was specified as belonging to the teacher when signing up. The "edit" button on the student should reveal a modal with the student's details and a form to edit them. Editing one or more fields and clicking "Submit" should reload the page, and the student's details should be visibly updated.
- Clicking the "delete" button on the student's account should create an alert with the text "User deleted!" and the page will *not* refresh. The student should no longer be visible on the teacher dashboard.
- The prior procedure is applicable for teacher accounts visible when logged in as the master account.


