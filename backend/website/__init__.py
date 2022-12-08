from re import template
from flask import Flask
from .extensions import db, key
from .createmaster import create_master
from pathlib import Path
import json

with open(Path(__file__).parent.parent / "settings.json", "r") as f:
    settings = json.loads(f.read())

if settings["db_is_from_docker"] == 1:
    db_path = "/db/data.db"
else:
    db_path = "/data.db"
print(f"Database location: {db_path}")


build_path = Path(__file__).parent.parent.parent / "frontend" / "build"

def newapp():
    app = Flask(__name__, static_folder=build_path,template_folder=build_path)

    app.secret_key = key
    # app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///data.db"
    app.config["SQLALCHEMY_BINDS"] = {
        "users": f"sqlite://{db_path}",
        "events": f"sqlite://{db_path}",
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
