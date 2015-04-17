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

@app.route('/', methods=['GET', 'POST'])
def home():
    if g.user is not None and g.user.is_authenticated():
        return render_template('hello.html')
    form = LoginForm()  # TODO make form
    if form.validate_on_submit():
        email = form.email.data
        user = User.query.filter_by(email=email).first()
        valid = str(hash(form.password.data)) == user.password  # TODO

        if valid:
            login_user(user) # TODO
            return render_template('hello.html')
        else:
            #flash('Invalid login, please try again.')
            return render_template('login.html', form=form)
    return render_template('login.html', form=form)

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('home'))


###################
# API             #
###################

@app.route('/api/createProject.json')
def createProject():
    # TODO
    return jsonify(projects=None)

@app.route('/api/getProjects.json')
def getProjects():
    projects = [{'projectName': project.name, 'practice': [[log.timestamp, log.timeLogged] for log in project.logs]} for project in g.user.projects]

    return jsonify(projects=projects)


@app.route('/api/updateProject.json')
def updateProject():
    # TODO
    return jsonify(projects=None)

@app.route('/api/removeProject.json')
def removeProject():
    # TODO
    return jsonify(projects=None)
