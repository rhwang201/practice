import os
import datetime
from flask import Flask, render_template, jsonify, request, g
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.login import LoginManager, current_user, login_user, AnonymousUserMixin

app = Flask(__name__)
app.config.from_object(os.environ['APP_SETTINGS'])

db = SQLAlchemy(app)

#from models import User, Project, Log
from forms import LoginForm

#login_manager = LoginManager()
#login_manager.init_app(app)
#
#@login_manager.user_loader
#def load_user(userId):
#    return User.query.get(int(userId))
#
#
#@app.before_request
#def before_request():
#    g.user = current_user


@app.route('/', methods=['GET', 'POST'])
def hello():
    #if g.user is not None and g.user.is_authenticated():
    #    return render_template('hello.html')
    form = LoginForm()  # TODO make form
    #if form.validate_on_submit():
    #    user = User.query.filter_by(email=form.email).first()
    #    valid = hash(form.password) is user.password

    #    if valid:
    #        login_user(user) # TODO
    #        return render_template('hello.html')
    #    else:
    #        #flash('Invalid login, please try again.')
    #        return render_template('login.html', form=form)
    return render_template('login.html', form=form)


@app.route('/projects.json')
def projects():
    user = User.query.filter_by(username='rhwang').first()
    projects = [{'projectName': project.name, 'practice': [[log.timestamp, log.timeLogged] for log in project.logs]} for project in user.projects]

    return jsonify(projects=projects)

if __name__ == '__main__':
    app.run()
