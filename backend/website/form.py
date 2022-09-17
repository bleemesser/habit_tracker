from flask import Blueprint, render_template, request, redirect, session,jsonify
from .extensions import db, bcrypt,key
from .models.usermodel import User
import jwt
from functools import wraps
import datetime
from .auth import token_required
form = Blueprint('form', __name__)

@form.route("/procrastination",methods=["POST"])
@token_required
def register_procrastination(current_user):
    req = request.get_json()
    print(req, current_user)
    return {"status":"success","message":"Procrastination registered successfully"}