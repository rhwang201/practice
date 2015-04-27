import mandrill

envVars = {}

with open('.env', 'r') as f:
  for line in f:
    key, value = line.split('=')
    envVars[key] = value.strip('\n')


m = mandrill.Mandrill(str(envVars['MANDRILL_APIKEY']))

try:
  message = {
    'html': 'test email',
    'subject': 'testing mandrill',
    'from_email': 'richard.hwang201@gmail.com',
    'to': [{
      'email': 'richard.hwang201@gmail.com'
    }],
  }
  m.messages.send(message) # works
except mandrill.Error, e:
  print 'A mandrill error has occurred: %s - %s' % (e.__class__, e)
  raise
