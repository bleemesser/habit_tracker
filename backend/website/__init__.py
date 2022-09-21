from flask import Flask
import os
from .extensions import db,key
def newapp():
    app = Flask(__name__)

    app.secret_key = key
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_BINDS"] = {
        "users": "sqlite:///users.db",
        "events": "sqlite:///events.db"
    }
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)
    # from .data import data
    # app.register_blueprint(data,url_prefix="/")
    from .form import form
    from .auth import auth
    from .teacher import teacher
    app.register_blueprint(auth,url_prefix="/auth")
    app.register_blueprint(form,url_prefix="/submit")
    app.register_blueprint(teacher,url_prefix="/teacher")
    return app
