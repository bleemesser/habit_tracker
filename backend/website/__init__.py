from re import template
from flask import Flask
from .extensions import db, key
from .createmaster import create_master
from pathlib import Path
build_path = Path(__file__).parent.parent.parent / "frontend" / "build"
def newapp():
    app = Flask(__name__, static_folder=build_path,template_folder=build_path)

    app.secret_key = key
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_BINDS"] = {
        "users": "sqlite:///data.db",
        "events": "sqlite:///data.db",
    }
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db.init_app(app)

    # from .data import data
    # app.register_blueprint(data,url_prefix="/")
    from .form import form
    from .auth import auth
    from .teacher import teacher
    from .student import student
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(form, url_prefix="/submit")
    app.register_blueprint(teacher, url_prefix="/teacher")
    app.register_blueprint(student, url_prefix="/student")
    return app
