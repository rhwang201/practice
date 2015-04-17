/**
 * The overall Application.
 */
var Application = React.createClass({
  render: function() {
    return (
      <div>
        <NavBar />
        <ProjectBox />
      </div>
    );
  }
});

/**
 * The component responsible for logging in a user.
 */
var Login = React.createClass({
  render: function() {
    return (
      <div>Login</div>
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
                  <li><a href="#">Separated link</a></li>
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

  handleAddProject: function(project) {
    var projects = this.state.data;
    var newProjects = projects.concat([project]);
    this.setState({data: projects});

    // TODO POST, $('#createModal').modal('hide')
    console.log(name, frequency, time);
  },

  componentDidMount: function() {
    // TODO GET projects and set state
    $.ajax({
      url: '/projects.json',
      dataType: 'json',
      success: function(data) {
        this.setState({data: data.projects});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
    //this.setState({data: this.props.data});
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
        <CreateProjectModal onAddProject={this.handleAddProject} />
      </div>
    );
  }
});

/**
 * Represents a Project.
 */
var Project = React.createClass({
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
  renderChart: function() {
    var domElement = React.findDOMNode(this),
        data = this.props.data;

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

// Creating a new Project.
var CreateProjectModal = React.createClass({
  onSave: function() {
    var domElement = React.findDOMNode(this),
        name = React.findDOMNode(this.refs.name).value,
        frequency = React.findDOMNode(this.refs.frequency).value,
        time = React.findDOMNode(this.refs.time).value;

    this.props.onAddProject({name: name, frequency: frequency, time: time});
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


var reactElement = document.getElementById('react');
if (reactElement) {
  React.render(
    <Application />,
    reactElement
  );
}
