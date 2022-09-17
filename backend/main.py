import os
import json
from website import newapp
from setup import setup_db

app = newapp()
setup_db()
with open('settings.json','r') as f:
    settings = json.loads(f.read())
if __name__ == "__main__":
    port = int(os.environ.get("PORT", settings["port"]))
    app.run(debug=settings["debug"], host=settings["host"], port=port)
