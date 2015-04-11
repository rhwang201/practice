// Overall Component.
var ProjectBox = React.createClass({
  // Show modal....
  handleAdd: function() {
  },

  render: function() {
    var projectNodes = this.props.data.map(function(project) {
      return (
        <Project name={project.projectName} practice={project.practice}/>
      );
    });
    return (
      <div className="projectBox">
        <a className="btn btn-default" data-toggle="modal" data-target="#createModal">Add</a>
        { projectNodes }
        <CreateProjectModal />
      </div>
    );
  }
});


// Each Project.
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


// Highcharts container.
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
              <form className="form-horizontal">
                <div className="form-group">
                  <label for="name" className="col-sm-2 control-label">Name</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" placeholder="name"></input>
                  </div>
                </div>

                <div className="form-group">
                  <label for="frequency" className="col-sm-2 control-label">Frequency</label>
                  <div className="col-sm-10">
                    <input type="text" className="form-control" id="frequency" placeholder="frequency"></input>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
});


// Test data
var dates = [new Date(2015, 4, 1), new Date(2015, 4, 2), new Date(2015, 4, 3)],
    practice1 = _.zip(dates, [1, 0.5, 1]),
    practice2 = _.zip(dates, [0, 0, 4]),
    practice3 = _.zip(dates, [1.5, 1.5, 1.5]);

var data = [
  {projectName: 'project1', practice: practice1},
  {projectName: 'project2', practice: practice2},
  {projectName: 'foo', practice: practice3},
];

React.render(
  <ProjectBox data={data} />,
  document.getElementById('content')
);
