import os
import datetime
from flask import Flask, render_template, jsonify, request
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

db = SQLAlchemy(app)

from models import User, Project, Log


@app.route('/')
def hello():
    return render_template('hello.html')


@app.route('/projects.json')
def projects():
    user = User.query.filter_by(username='rhwang').first()
    projects = [{'projectName': project.name, 'practice': [[log.timestamp, log.timeLogged] for log in project.logs]} for project in user.projects]

    return jsonify(projects=projects)

if __name__ == '__main__':
    app.run()
