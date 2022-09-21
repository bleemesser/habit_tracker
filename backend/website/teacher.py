from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
from .models.eventmodel import Event
from functools import wraps
import datetime
from .auth import token_required
teacher = Blueprint('teacher', __name__)

# bodie put your teacher routes here
# example: 
@teacher.route("/dashboard",methods=["GET"])
# @token_required
def dashboard():
    # pull data from database and send it to the frontend
    users = User.query.all()
    print (users)
    return {"status":"success","message":"Dashboard", "data": "[data goes here]"}