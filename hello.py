import os
import datetime
from flask import Flask, render_template, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

db = SQLAlchemy(app)


@app.route('/')
def hello():
    return render_template('hello.html')


@app.route('/projects.json')
def projects():
    dates = [datetime.datetime(2014, 1, 1), datetime.datetime(2014, 1, 2), datetime.datetime(2014, 1, 3)]
    practice1 = zip(dates, [1, 0.5, 1])
    practice2 = zip(dates, [0, 0, 4])
    practice3 = zip(dates, [1.5, 1.5, 1.5])

    projects = [{'projectName': 'Foo', 'practice': practice1}, {'projectName': 'Bar', 'practice': practice2}, {'projectName': 'Zoo', 'practice': practice3}]
    return jsonify(projects=projects)

if __name__ == '__main__':
    app.run()
