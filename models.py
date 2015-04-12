from app import db
from sqlalchemy.dialects.postgres import JSON

# TODO rhwang

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)

  def __init__(self, username, email, password, joinDate, firstName, lastName):

  def __repr__(self):
    return '<User >' % self.username


class Project(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80))

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  user = db.relationship('User', backref=db.backref('logs', lazy='dynamic'))


class Log(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  timestamp = db.Column(db.Datetime)
  time = db.Column(db.Double) # TODO

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
  project = db.relationship('Project', backref=db.backref('logs', lazy='dynamic'))
