import os
import datetime
from flask import Flask, render_template, jsonify, request, g, redirect, url_for
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager, current_user, login_user, AnonymousUserMixin, logout_user

app = Flask(__name__)
print('App Settings', os.environ['APP_SETTINGS'])
app.config.from_object(os.environ['APP_SETTINGS'])

db = SQLAlchemy(app)

from models import User, Project, Log
from forms import LoginForm

login_manager = LoginManager()
login_manager.init_app(app)

@login_manager.user_loader
def load_user(userId):
    return User.query.get(int(userId))


@app.before_request
def before_request():
    g.user = current_user


###################
# ROUTES          #
###################

# Displays the login page or home page.
@app.route('/', methods=['GET', 'POST'])
def home():
    if g.user is not None and g.user.is_authenticated():
        return render_template('home.html')

    if request.method == "POST":
        email = request.form["email"]
        password = request.form["password"]

        user = User.query.filter_by(email=email).first()
        valid = str(hash(password)) == user.password

        if valid:
            login_user(user)
            return render_template('home.html')
        else:
            return render_template('login.html')
    return render_template('login.html')

# Adds a user to the User table and redirects to home page.
@app.route('/signup', methods=['POST'])
def signup():
    email = request.form["email"]
    password = request.form["password"]
    firstName = request.form["firstName"]
    lastName = request.form["lastName"]
    signUpDate = datetime.date.today()

    # TODO salt password
    newUser = User(email, hash(password), signUpDate, firstName, lastName)
    db.session.add(newUser)
    db.session.commit()

    login_user(newUser)

    return redirect(url_for('home'))

# Logs a user out and redirects to login page.
@app.route('/logout', methods=['GET'])
def logout():
    logout_user()
    return redirect(url_for('home'))


###################
# API             #
###################

@app.route('/api/createProject', methods=['POST'])
def createProject():
    data = request.get_json()
    name = data['name']

    project = Project(name, g.user)
    db.session.add(project)
    db.session.commit()

    return getProjects()

@app.route('/api/getProjects.json', methods=['GET'])
def getProjects():
    projects = [{'projectName': project.name, 'practice': [[log.timestamp, log.timeLogged] for log in project.logs]} for project in g.user.projects]

    return jsonify(projects=projects)

@app.route('/api/updateProject')
def updateProject():
    # TODO
    return jsonify(projects=None)

@app.route('/api/removeProject')
def removeProject():
    # TODO
    projectId = None
    Project.query.filter_by(id=projectId).delete()

    return jsonify(projects=None)


@app.route('/api/logPractice', methods=['POST'])
def logPractice():
    projectId = request.form["id"]
    logDate = datetime.datetime.strptime(request.form["date"], '%d/%m/%Y')
    loggedTime = float(request.form["log"])

    project = Project.query.filter_by(id=projectId).first()
    newLog = Log(logDate, loggedTime, project)

    db.session.add(newLog)
    db.session.commit()

    return render_template('log_submit.html')
