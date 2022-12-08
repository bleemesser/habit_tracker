from .models.usermodel import User
from .extensions import db, bcrypt
import json
from pathlib import Path

with open(Path(__file__).parent.parent / "settings.json", "r") as f:
    settings = json.loads(f.read())


def create_master(app):
    with app.app_context():
        if User.query.filter_by(email="master@teacher").first() == None:
            master = User(
                email="master@teacher",
                password=bcrypt.generate_password_hash(
                    settings["master_password"]
                ).decode("utf-8"),
                roles="teacher",
                name="Master",
                blocknum=0,
            )
            db.session.add(master)
            db.session.commit()
            return True
        else:
            return False


def change_master_password(app):
    with app.app_context():
        db.session.execute(
            db.update(User)
            .where(User.email == "master@teacher")
            .values(
                password=bcrypt.generate_password_hash(
                    settings["master_password"]
                ).decode("utf-8"),
            )
        )
        db.session.commit()
