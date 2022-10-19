from flask import Blueprint, request
from .extensions import db
from .models.usermodel import User
from .models.eventmodel import Event
import datetime
from .auth import token_required

form = Blueprint("form", __name__)


@form.route("/procrastination", methods=["POST"])
@token_required
def register_procrastination(current_user):
    req = request.get_json()
    # print(req)
    # print(request.args)
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
        event_date=datetime.datetime.strptime(request.args["eventdate"], "%Y-%m-%d"),
        data=req,
        owner=current_user.id,
    )
    db.session.add(new_event)
    db.session.commit()
    return {"status": "success", "message": "Procrastination registered successfully"}


@form.route("/sleep", methods=["POST"])
@token_required
def register_sleep(current_user):
    req = request.get_json()
    db.session.execute(
        db.update(User)
        .where(User.email == current_user.email)
        .values(last_submission=datetime.datetime.now())
    )
    db.session.commit()
    # create a new event
    new_event = Event(
        type="sleep",
        event_date=datetime.datetime.strptime(request.args["eventdate"], "%Y-%m-%d"),
        data=req,
        owner=current_user.id,
    )
    db.session.add(new_event)
    db.session.commit()
    return {"status": "success", "message": "Sleep registered successfully"}


@form.route("/feelings", methods=["POST"])
@token_required
def register_feelings(current_user):
    req = request.get_json()
    db.session.execute(
        db.update(User)
        .where(User.email == current_user.email)
        .values(last_submission=datetime.datetime.now())
    )
    db.session.commit()
    # create a new event
    new_event = Event(
        type="feelings",
        event_date=datetime.datetime.strptime(request.args["eventdate"], "%Y-%m-%d"),
        data=req,
        owner=current_user.id,
    )
    db.session.add(new_event)
    db.session.commit()
    return {"status": "success", "message": "Feelings registered successfully"}
