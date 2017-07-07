var React = require('react');
var Clock = require('Clock');
var CountdownForm = require('CountdownForm');
var Controls = require('Controls');

var Countdown = React.createClass({
  getInitialState: function(){
    return {
      count:0,
      countdownStatus: 'stopped'
    };
  },
  // This method gets fired when the component gets updated
  componentDidUpdate: function(prevProps, prevState){
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
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
  startTimer: function(){
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function(seconds){
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render: function(){
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };

    return (
      <div>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>
    );
  }
});

module.exports = Countdown;
