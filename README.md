# SEL Habits Analysis / Tracker
>Software Studio project for Lee's SOM class

## Overview
This project is a web application that allows users to find patterns in their procrastination, sleep, and/or mental health. When a student chooses to log an occurrence relating to one of these topics, they are prompted to answer a few quick questions about the event that were discussed with Lee to fit the criteria of the project. The user can then view a calendar representing all of their past events and answers, see some statistics about the most common event types, and export their data to a CSV file for further analysis. 

## Installation
1. Clone the repository
2. cd into the project directory, then into the `frontend` directory.
3. Run `npm install` to install the javascript dependencies.
4. Run `npm run build` to build the frontend so that the backend can serve it.
5. cd back into the project directory, then into the `backend` directory.
6. Run `pip (or pip3) install -r requirements.txt` to install the python dependencies.
7. Open `settings.json` in a text editor and change the `create_master` field to `1` and set a master password in the `master_password` field. Also ensure that `debug` is set to `0`.
8. Run `python (or python3) main.py` to start the server.
9. Once the app has loaded, press `ctrl+c` to stop the server and change the `create_master` field back to `0` in `settings.json`. Also remove the master password from the `master_password` field.
10. Run `python (or python3) main.py` to start the server again.
11. Navigate to `localhost:5000` (or whatever port you specified in settings) in your browser to use the app.

## Docker (in progress)
The repo is in process of being set up for use in a docker container. To whomever takes over this project, the most important task relating to docker is moving the .db file to a volume so that it can be accessed by the container while also being persistent.
Currently, the database is located in `backend/website/data.db` but should eventually be moved. The database is created/initialized in `backend/setup.py` when the server is started so that file (and others) will need to be modified as well.

At the moment, running `docker-compose up` will start the server and serve the frontend, but the database is not persistent and will be lost if the container is rebuilt. The data is only copied from the host machine to the container on build, not the other way around.

## Usage
The app is fairly simple to set up. All student accounts must have a teacher account associated with them. When the app is first run, assuming the steps were followed in the installation section, there will be a master account. This master account cannot be used as a teacher for a student account, but can be used to create and delete teacher accounts. To do so, open the app and navigate to `/login`. Log in with your master credentials, the email is `master@teacher` and the password is whatever you set. Once logged in, click the `Dashboard` button in the top left. On the dashboard, there is a black button in the top left labeled `Create Teacher`. Click this button and fill out the form. Once the teacher is created, the master account should be logged out and only used if a teacher account is lost or needs to be deleted. From here, students can be created on the login page using the second form. Students should do this themselves. Once a student has been created, they can log in and begin logging events.

## Contributing
- Follow [this](https://akrabat.com/the-beginners-guide-to-contributing-to-a-github-project/) guide for how to contribute. 
- We are not using git-flow, so fork from master. 
