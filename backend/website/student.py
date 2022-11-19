from flask import (
    Blueprint,
    make_response,
)
from io import StringIO
from .models.usermodel import User
import json
from .auth import token_required
import pandas as pd

import matplotlib.pyplot as plt
from matplotlib.backends.backend_agg import FigureCanvasAgg as FigureCanvas
from matplotlib.figure import Figure
from flask import Response
import io
from io import BytesIO
import base64


student = Blueprint("student", __name__)


@student.route('/plot.png')
def plot_png():
    fig = create_figure()
    output = io.BytesIO()
    FigureCanvas(fig).print_png(output)
    return Response(output.getvalue(), mimetype='image/png')

@student.route("/dashboard", methods=["GET"])
@token_required
def dashboard(current_user):
    # pull events from database and send it to the frontend
    # does not require any input from the frontend
    events = User.query.filter_by(email=current_user.email).first().events
    return {
        "status": "success",
        "message": "Data found successfully",
        "data": "{'events': ".replace("'", '"') + str(events).replace("'", '"') + "}",
        # need to replace single quotes with double quotes for JSON parsing on the frontend
    }

def create_figure(xs,ys):
    fig = Figure()
    axis = fig.add_subplot(1, 1, 1)
    axis.bar(xs, ys)
    return fig


@student.route("/download", methods=["GET"])
@token_required
def download(current_user):
    # fetch events for the current user, turn it into a pandas dataframe, turn it into a csv file, then send it to the frontend
    # does not require any input from the frontend
    events = User.query.filter_by(email=current_user.email).first().events
    # print(events)
    df = pd.DataFrame({})  # create an empty dataframe
    # print("EVENT", events)
    for event in events:

        #convert the event to a dictionary, skip over csv packaging and plotting if the event is not sleep-related
        event_dict = event.__dict__
        if event_dict["type"] != "sleep":
            continue

        event_dict = json.loads(str(event).replace("'", '"'))
        for q in event_dict["data"]:
            event_dict[q] = event_dict["data"][q].replace('&#39;', "'").replace('&#34;', '"')
        del event_dict["data"]
        # we've already copied the data into the main dict, so we don't need it anymore
        del event_dict["owner"]
        # we don't need the owner id
        for key, value in event_dict.items():
            event_dict[key] = [value]
        df_e = pd.DataFrame(event_dict)
        # convert the event into a dataframe
        df = pd.concat([df, df_e], ignore_index=True)
        # append the event to the dataframe using concat
        #turn df[event_date] into a datetime object and sort by it
        df["event_date"] = pd.to_datetime(df["event_date"])
        df = df.sort_values(by="event_date")

        #parse through df and pull out dates and sleep times
        date = df["event_date"]
        date = list(pd.to_datetime(date))
        date = [d.date() for d in date]
        hours_of_sleep = list(df["q1"])
        hours_of_sleep = [int(i[0]) for i in hours_of_sleep]
        #plot data as line chart
        fig = Figure(figsize=(10, 7))
        axis = fig.add_subplot(1, 1, 1)
        axis.plot(date, hours_of_sleep)
        #set plot, x, and y labels
        axis.set_title("Hours of Sleep")
        axis.set_xlabel("Date")
        axis.set_ylabel("Hours of Sleep")
        #set ticks
        axis.set_xticks(date)
        axis.set_xticklabels(date,rotation=45, fontsize=6)
        #save plot as png
        output = io.BytesIO()
        FigureCanvas(fig).print_png(output)
        #get path to user's downloads folder and save plot there
        import os
        from os.path import expanduser
        home = expanduser("~")
        downloads = os.path.join(home, 'Downloads')
        fig.savefig(downloads + '/plot.png', dpi=300)

    with StringIO() as buffer:
        # forming a StringIO object
        buffer = StringIO()

        df = df.rename(columns={"q1": "How much sleep did you get?", "q2": "What kept you up / woke you up early?", "q3": "What caused that issue? — Try and follow a trail of causes", "q4": "What would you like to try and do about it in the future?", "q5": "Is this a recurring problem?"})
        
        buffer.write(df.to_csv())
        # forming a Response object with Headers to return from flask
        response = make_response(buffer.getvalue())
        response.headers["Content-Disposition"] = "attachment; filename=data.csv"
        response.mimetype = "text/csv"
        # return the Response object
        return response
