import os
import json
from website import newapp
from setup import setup_db
from website.createmaster import create_master, change_master_password
app = newapp()
setup_db(app)
with open("settings.json", "r") as f:
    settings = json.loads(f.read())
if settings["create_master"] == 1 and settings["master_password"] != "":
    create_master(app)
if settings["create_master"] == 0 and settings["master_password"] != "" and settings["change_master_password"] == 1:
    change_master_password(app)
if __name__ == "__main__":
    port = int(os.environ.get("PORT", settings["port"]))
    app.run(debug=settings["debug"], host=settings["host"], port=port)
