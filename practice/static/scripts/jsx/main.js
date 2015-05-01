/**
 * LoginPage
 */
var LoginPage = React.createClass({
  render: function() {
    return (
      <div>
        <LoginNavBar />
        <SignInModal />
        <Body />
      </div>
    );
  }
});


/**
 * Navigation Bar.
 */
var LoginNavBar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#" className="btn btn-default navbar-btn" data-toggle="modal" data-target="#signInModal">Sign in</a></li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

var SignInModal = React.createClass({
  render: function() {
    return (
      <div className="modal fade" id="signInModal" aria-hidden="true">
        <div className="modal-dialog modal-sm">
          <div className="modal-content">
            <div className="modal-body">
              <form action="/" method="post" name="login">
                <div className="form-group">
                  <input type="text" className="form-control" id="email" name="email" placeholder="Email"></input>
                </div>

                <div className="form-group">
                  <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
                </div>

                <input className="btn btn-primary btn-block" type="submit" value="Sign In"></input>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

var Body = React.createClass({
  render: function() {
    return (
      <div className="container">
      Is there something you'd like to get better at?

      Maybe you picked up guitar a couple years ago and still only know the basics. Or
      you've decided your writing could really use some improvement. Maybe you want to
      become a better cook. Painter. Skateboarder. Photographer.

      But life always gets in the way. Work picks up, you need to spend time with your
      friends and family, that gorgeous view demands someone with a selfie stick goes and
      takes a picture with it, whatever. The days go by, and you're still a mediocre
      guitarist, and that gnawing itch that you can and should be better grows.

      That's not the way it has to be.

      You could be great.

      Imagine if you consciously worked on your skill. Every. Single. Day.

      Maybe some days it's just a couple of minutes, and others it's a couple of hours.
      That's fine. Those scrapped minutes add up. Consistent practice is the most
      fundamental weapon in your arsenal in the battle for progress.

      APP_NAME is here to keep you honest. The task to practice every day and the
      opportunitity to become awesome still lay on you. The wheel has been, is, and
      always will be in your hands. But APP_NAME can provide feedback. Everyday, we'll
      ask you how much you honed your craft. Simply respond to the email with the number
      of hours you practiced, and move on with your busy day. We'll store the results and
      warn you when you're slipping or congratulate you when you're on a streak. A simple
      feedback cycle, to keep us all fully accountable for our choices, actions, and
      destiny.

      Take the wheel and venture forth towards your goal. APP_NAME will help you get there.

        <p>Sign up, it's easy</p>

        <div className="row">
          <div className="col-xs-4 col-xs-offset-4">
            <form action="/signup" method="post" name="login">
              <div className="form-group">
                  <input type="text" className="form-control" id="firstName" name="firstName" placeholder="First Name"></input>
              </div>

              <div className="form-group">
                  <input type="text" className="form-control" id="lastName" name="lastName" placeholder="Last Name"></input>
              </div>

              <div className="form-group">
                <input type="text" className="form-control" id="email" name="email" placeholder="Email"></input>
              </div>

              <div className="form-group">
                <input type="password" className="form-control" id="password" name="password" placeholder="Password"></input>
              </div>

              <input className="btn btn-primary btn-block" type="submit" value="Sign Up"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
});






/**
 * The overall Application.
 */
var Application = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <NavBar />
        <ProjectBox />
      </div>
    );
  }
});


/**
 * Navigation Bar.
 */
var NavBar = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-static-top">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <a className="navbar-brand" href="#">Brand</a>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><a href="#">Link</a></li>
              <li className="dropdown">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">Dropdown <span className="caret"></span></a>
                <ul className="dropdown-menu" role="menu">
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li className="divider"></li>
                  <li><a href="/logout">Logout</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
});

/**
 * Component that holds all of a user's project information.
 */
var ProjectBox = React.createClass({
  getInitialState: function() {
    return {data: []};
  },

  /**
   * @param {Project] project
   * Passed into CreateProjectModal. Optimistic update.
   */
  handleAddProject: function(project) {
    var projects = this.state.data;
    var newProjects = projects.concat([project]);
    this.setState({data: newProjects});
  },

  /**
   * @param {Project[]] project
   * Passed into CreateProjectModal.
   */
  handleAddComplete: function(projects) {
    this.setState({data: projects});
  },

  /**
   * GETs projects and sets state.
   */
  componentDidMount: function() {
    $.ajax({
      url: '/api/getProjects.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.projects});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    var projectNodes = this.state.data.map(function(project) {
      return (
        <Project name={project.projectName} practice={project.practice}/>
      );
    });
    return (
      <div className="projectBox col-sm-8 col-sm-offset-2">
        <a className="btn btn-default" data-toggle="modal" data-target="#createModal">Add</a>
        { projectNodes }
        <CreateProjectModal onAddProject={this.handleAddProject} onAPIReturn={this.handleAddComplete} />
      </div>
    );
  }
});


/**
 * Represents a Project.
 */
var Project = React.createClass({
  /**
   * Toggles chart visibility.
   */
  handleClick: function() {
    var domElement = React.findDOMNode(this);

    if ($(domElement).find('.chart').css('display') === 'none') {
      $(domElement).find('.chart').slideDown();
    } else {
      $(domElement).find('.chart').slideUp();
    }
  },

  render: function() {
    return (
      <div className="project">
        <h3 onClick={this.handleClick}>{this.props.name}</h3>
        <PracticeChart data={this.props.practice} />
      </div>
    );
  }
});


/**
 * Highcharts container
 */
var PracticeChart = React.createClass({
  /**
   * Renders a Highcharts instance.
   */
  renderChart: function() {
    var domElement = React.findDOMNode(this),
        data = _.map(this.props.data, function(data) {
          var date = new Date(data[0]);
          return [date.valueOf(), data[1]];
        });

    $(domElement).highcharts({
      title: {
        text: 'Practice time'
      },
      xAxis: {
        type: 'datetime'
      },
      yAxis: {
        title: {
          text: 'Hours'
        }
      },
      legend: {
        enabled: false
      },
      series: [{
        name: 'Foo',
        data: data
      }]
    });
  },

  componentDidMount: function() {
    this.renderChart();
  },

  componentDidUpdate: function() {
    this.renderChart();
  },

  render: function() {
    var style = {display: 'none'};
    return (
      <div style={style} className="chart"></div>
    );
  }
});


/**
 * Creating a new Project.
 */
var CreateProjectModal = React.createClass({
  /**
   * POST, and optimistic update.
   */
  onSave: function() {
    var domElement = React.findDOMNode(this),
        name = React.findDOMNode(this.refs.name).value,
        frequency = React.findDOMNode(this.refs.frequency).value, // TODO update model
        time = React.findDOMNode(this.refs.time).value;

    this.props.onAddProject({projectName: name, frequency: frequency, time: time, practice: []});

    $.ajax({
      url: '/api/createProject',
      contentType: 'application/json; charset=utf8',
      type: 'POST',
      data: JSON.stringify({name: name}),
      success: function(data) {
        var modal = React.findDOMNode(this);
        $(modal).modal('hide');

        this.props.onAPIReturn(data.projects);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    return;
  },

  render: function() {
    return (
      <div className="modal fade" id="createModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Add a Project</h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="name" className="control-label">Name</label>
                  <input type="text" className="form-control" id="name" ref="name"></input>
                </div>

                <div className="form-group">
                  <label for="frequency" className="control-label">Logging Frequency</label>
                  <select className="form-control" id="frequency" ref="frequency">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                  </select>
                </div>

                <div className="form-group">
                  <label for="time" className="control-label">Logging Time</label>
                  <input type="time" className="form-control" id="time" ref="time"></input>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={this.onSave}>Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


$(document).ready(function() {
  var reactElement = document.getElementById('react');
  var loginElement = document.getElementById('login');

  if (reactElement) {
    React.render(
      <Application />,
      reactElement
    );
  } else if (loginElement) {
    React.render(
      <LoginPage />,
      loginElement
    );
  }
});
