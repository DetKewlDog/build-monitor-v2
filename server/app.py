from flask import Flask
from flask_cors import CORS
import monitor as Monitor

app = Flask(__name__)
CORS(app)

# This code acts as a sort of API server
# This will allow to communicate with it using javascript

# Yes, I could've just used this Flask app as the monitor
# But then I'd need to refresh the Flask app every time I want to display new data
# (that's the only method I am aware of. Flask apps are static pages)

# Besides, I want to use React :D

@app.route('/')
def index():
    return Monitor.get_msg()


if __name__ == '__main__':
    Monitor.init()
    app.run(host='0.0.0.0', port=2327)