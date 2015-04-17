from practice import db
from sqlalchemy.dialects.postgres import JSON

class User(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String(80))
  password = db.Column(db.String(80))
  joinDate = db.Column(db.DateTime)
  firstName = db.Column(db.String(80))
  lastName = db.Column(db.String(80))


  def __init__(self, email, password, joinDate, firstName, lastName):
    self.email = email
    self.password = password
    self.joinDate = joinDate
    self.firstName = firstName
    self.lastName = lastName

  def __repr__(self):
    return '<User %s>' % self.email

  def is_authenticated(self):
    return True

  def is_active(self):
    return True

  def is_anonymous(self):
    return False

  def get_id(self):
    return unicode(self.id)


class Project(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(80))

  user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
  user = db.relationship('User', backref='projects')

  def __init__(self, name, user):
    self.name = name
    self.user = user

  def __repr__(self):
    return '<Project %s>' % self.name


class Log(db.Model):
  id = db.Column(db.Integer, primary_key=True)
  timestamp = db.Column(db.DateTime)
  timeLogged = db.Column(db.Float)

  project_id = db.Column(db.Integer, db.ForeignKey('project.id'))
  project = db.relationship('Project', backref='logs')

  def __init__(self, timestamp, timeLogged, project):
    self.timestamp = timestamp
    self.timeLogged = timeLogged
    self.project = project

  def __repr__(self):
    return '<Log %s>' % self.timestamp
