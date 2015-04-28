import mandrill
import os
import sys

# TODO ehh, this is kinda a hack...?
topdir = os.path.join(os.path.dirname(__file__), "..")
sys.path.append(topdir)

from practice.models import User, Project, Log

m = mandrill.Mandrill(os.getenv('MANDRILL_APIKEY'))

# Then, make and send an email for each project (only one email/user)
# Can get all projects, then group by user; or loop over users and get projects...
for user in User.query.all():
  to_email = str(user.email)
  projects = user.projects

  # TODO all projects in one email, use a template.
  for project in projects:
    try:
      message = {
        'html': 'test email for project ' + project.name,
        'subject': 'testing mandrill',
        'from_email': 'richard.hwang201@gmail.com',
        'to': [{
          'email': to_email
        }],
      }
      m.messages.send(message)
    except mandrill.Error, e:
      print 'A mandrill error has occurred: %s - %s' % (e.__class__, e)
      raise

# TODO Need to read emails too.
