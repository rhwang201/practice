import mandrill
import os
import sys
from datetime import date, timedelta

topdir = os.path.join(os.path.dirname(__file__), "..")
sys.path.append(topdir)

from practice.models import User, Project, Log

m = mandrill.Mandrill(os.getenv('MANDRILL_APIKEY'))

# Then, make and send an email for each project (only one email/user)
for user in User.query.all():
  to_email = str(user.email)
  projects = user.projects

  message = {
    'subject': 'Practice Time!',
    'from_email': 'richard.hwang201@gmail.com',
    'to': [{
      'email': to_email
    }],
    'html': open('practice/templates/email.html').read(),
    'merge': True,
    'merge_language': 'handlebars',
    'global_merge_vars': [
      {
        'name': 'projects',
        'content': map(lambda p: {'name': p.name, 'id': p.id}, projects)
      },
      {
        'name': 'date',
        'content': str(date.today() + timedelta(days=1))
      }
    ]
  }

  try:
    m.messages.send(message=message)
  except mandrill.Error, e:
    print 'A mandrill error has occurred: %s - %s' % (e.__class__, e)
    raise
