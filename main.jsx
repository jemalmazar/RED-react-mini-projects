var React = require('react');
var ReactDOM = require('react-dom');

// React Component
var Timer = React.createClass({

  getInitialState : function(){
    return {
      secondsElapsed: 0
    }
  },

  resetTimer: function(){
    clearInterval(this.interval);
    this.setState({ secondsElapsed : 0 });
    this.start();
  },

  // this.setState is like the get inital state
  tick : function() {
    this.setState({ secondsElapsed : this.state.secondsElapsed + 1 });
  },

  start: function(){
    // this code gets rendered after the html is inserted.
    this.interval = setInterval(this.tick, 1000);
  },

  componentDidMount : function() {
     setTimeout(this.start, this.props.timeout);

  },

  // always has a render method
  render : function(){
    return (
        <p>
          {this.props.name} has {this.state.secondsElapsed}s elapsed
          <button onClick={this.resetTimer}>RESET</button>
        </p>
        );
  }
});

var Timers = React.createClass({

  render: function() {
    return (
      // must return a HTML node
      <div>
          <Timer timeout={0} name="Timer1"/>
          <Timer timeout={500 * 10} name="Timer2"/>
          <Timer timeout={700 * 10} name="Timer3"/>
      </div>
    )
  }
});

ReactDOM.render(<Timers />, document.querySelector('.mount-node'));
