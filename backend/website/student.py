from flask import Blueprint, render_template, request, redirect, session, jsonify
from .extensions import db, bcrypt, key
from .models.usermodel import User
from .models.eventmodel import Event
import datetime
from .auth import token_required

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