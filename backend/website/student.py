from flask import (
    Blueprint,
    render_template,
    request,
    redirect,
    session,
    jsonify,
    send_file,
    make_response
)
from io import StringIO, BytesIO
from .extensions import db, bcrypt, key
from .models.usermodel import User
from .models.eventmodel import Event
import datetime
import json
from .auth import token_required
import pandas as pd

student = Blueprint("student", __name__)


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


@student.route("/download", methods=["GET"])
@token_required
def download(current_user):
    # fetch events for the current user, turn it into a pandas dataframe, turn it into a csv file, then send it to the frontend
    # does not require any input from the frontend
    events = User.query.filter_by(email=current_user.email).first().events
    # print(events)
    df = pd.DataFrame({})  # create an empty dataframe
    for event in events:
        event_dict = json.loads(str(event).replace("'", '"'))
        for q in event_dict["data"]:
            event_dict[q] = event_dict["data"][q]
        del event_dict["data"]
        del event_dict["owner"]
        for key, value in event_dict.items():
            event_dict[key] = [value]
        df_e = pd.DataFrame(event_dict)  # convert the event into a dataframe
        df = pd.concat([df, df_e], ignore_index=True)  # append the event to the dataframe using concat
    with StringIO() as buffer:
        # forming a StringIO object  
        buffer = StringIO()
        buffer.write(df.to_csv())
        # forming a Response object with Headers to return from flask 
        response = make_response(buffer.getvalue())
        response.headers['Content-Disposition'] = 'attachment; filename=namaste.csv'
        response.mimetype = 'text/csv'
        # return the Response object
        return response

