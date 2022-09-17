import os, sys
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Blueprint, render_template, request, redirect, session, g
from website import newapp

app = newapp()

with open('settings.json','r') as f:
    settings = json.loads(f.read())
if __name__ == "__main__":
    port = int(os.environ.get("PORT", settings["port"]))
    app.run(debug=settings["debug"], host=settings["host"], port=port)
