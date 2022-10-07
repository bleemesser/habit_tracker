from flask import Blueprint, render_template, request, redirect, session, jsonify
from .extensions import db, bcrypt, key
from .models.usermodel import User
from .models.eventmodel import Event
from functools import wraps
import datetime
from .auth import token_required

form = Blueprint("form", __name__)


@form.route("/procrastination", methods=["POST"])
@token_required
def register_procrastination(current_user):
    req = request.get_json()
    print(req, current_user)
    # update the current_user to have a new last_submission
    db.session.execute(
        db.update(User)
        .where(User.email == current_user.email)
        .values(last_submission=datetime.datetime.now())
    )
    db.session.commit()
    # create a new event
    new_event = Event(
        type="procrastination",
        event_date=datetime.datetime.strptime(req["event_date"], "%Y-%m-%d"),
        data=req["data"],
        owner=current_user.id,
    )
    db.session.add(new_event)
    db.session.commit()
    return {"status": "success", "message": "Procrastination registered successfully"}


@form.route("/sleep", methods=["POST"])
@token_required
def register_sleep(current_user):
    req = request.get_json()
    print(req, current_user)
    # once the questions are more concrete, we can add the data to the database here
    return {"status": "success", "message": "Sleep registered successfully"}


@form.route("/feelings", methods=["POST"])
@token_required
def register_feelings(current_user):
    req = request.get_json()
    print(req, current_user)
    # once the questions are more concrete, we can add the data to the database here
    return {"status": "success", "message": "Feelings registered successfully"}
