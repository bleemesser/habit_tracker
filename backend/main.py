import os
import json
from website import newapp
from setup import setup_db
from website.createmaster import create_master, change_master_password
from flask import send_from_directory
from pathlib import Path
app = newapp()
setup_db(app)
with open(Path(__file__).parent / "settings.json", "r") as f:
    settings = json.loads(f.read())
if settings["create_master"] == 1 and settings["master_password"] != "":
    create_master(app)
if (
    settings["create_master"] == 0
    and settings["master_password"] != ""
    and settings["change_master_password"] == 1
):
    change_master_password(app)

# paths for serving the react app (frontend)
@app.route("/")
def serve():
    return send_from_directory(app.static_folder, "index.html")


@app.route("/<path:path>")
def static_proxy(path):
    """static folder serve"""
    file_name = path.split("/")[-1]
    dir_name = os.path.join(app.static_folder, "/".join(path.split("/")[:-1]))
    return send_from_directory(dir_name, file_name)


@app.errorhandler(404)
# if the user goes to a page that "doesn't exist" according to flask,
# send them to the react app because it probably does exist
# VERY IMPORTANT, ANY FRONTEND PAGE EXCEPT / USES THIS
def handle_404(e):
    return send_from_directory(app.static_folder, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", settings["port"]))
    app.run(debug=settings["debug"], host=settings["host"], port=port)
