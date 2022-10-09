from .models.usermodel import User
from .extensions import db,bcrypt
import json
with open("settings.json", "r") as f:
    settings = json.loads(f.read())
def create_master(app):
    with app.app_context():
        # db.session.execute(
        #     db.delete(User).where(User.email == "master@teacher")
        # )
        # db.session.commit()
        if User.query.filter_by(email="master@teacher").first() == None:
            master = User(
                email="master@teacher",
                password=bcrypt.generate_password_hash(settings["master_password"]).decode("utf-8"),
                roles="teacher",
                name="Master",
            )
            db.session.add(master)
            db.session.commit()

def change_master_password(app):
    with app.app_context():
        db.session.execute(
            db.update(User)
            .where(User.email == "master@teacher")
            .values(
                password=bcrypt.generate_password_hash(settings["master_password"]).decode("utf-8"),
            )
        )
        db.session.commit()