var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

// Stateless function, this is only used when Components have only the render function
// var Timer = (props) => {
//   return (
//     <div>
//       <h1 className="text-center page-title">Timer</h1>
//     </div>
//   )
// };

var Timer = React.createClass({
  getInitialState: function(){
    return {
      count:0,
      timerStatus: 'stopped'
    };
  },
  // This method gets fired when the component gets updated
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.timerStatus !== prevState.timerStatus) {
      switch (this.state.timerStatus) {
        case 'started':
          this.handleStart();
          break;
        case 'stopped':
          this.setState({count:0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
        default:

      }
    }
  },
  // This method gets fired right before the component gets updated
  // componentWillUpdate: function(nextProps, nextState){
  //
  // },
  // // This method gets fired right before the component gets added
  // componentWillMount: function(){
  //   console.log('component will mount');
  // },
  // // This method gets fired when the component gets added
  // componentDidMount: function(){
  //   console.log('component did mount');
  // },
  // This method gets fired right before the component gets removed
  componentWillUnmount: function(){
    //console.log('component will unmount');
    clearInterval(this.timer);
    this.timer = undefined;
  },
  handleStart: function(){
    this.timer = setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
  },
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      timerStatus: 'started'
    });
  },
  handleStatusChange: function(newStatus) {
    this.setState({timerStatus: newStatus});
  },
  render: function(){
    var {count, timerStatus} = this.state;

    return (
      <div>
        <h1 className="page-title">Timer App</h1>
        <Clock totalSeconds={count}/>
        <Controls countdownStatus={timerStatus} onStatusChange={this.handleStatusChange}/>
      </div>
    );
  }
});

module.exports = Timer;
