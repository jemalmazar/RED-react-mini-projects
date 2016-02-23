var React = require('react');
var ReactDOM = require('react-dom');

var TweetBox = React.createClass({
    // built-in React object
    propTypes: {
      maxLength: React.PropTypes.number.isRequired
    },
    // built-in React method
    getDefaultProps: function() {
      return {
        maxLength: 140
      }
    },
    // built-in React method
    getInitialState: function(){
      return {
        text: '',
        photoAdded: false
      }
    },

    handleChange: function(event){
      this.setState({ text: event.target.value })
    },

    remainingChars: function(){
      if (this.state.photoAdded){
        return (this.props.maxLength - 23 - this.state.text.length);
      } else {
        return (this.props.maxLength - this.state.text.length);
      }
    },

    overflowAlert: function(){
      if (this.remainingChars() < 0) {

        if(this.state.photoAdded) {
          var beforeOverflowText = this.state.text.substring((this.props.maxLength - 10) - 23, this.props.maxLength);
          var overflowText = this.state.text.substring(this.props.maxLength - 23);
        } else {
          var beforeOverflowText = this.state.text.substring((this.props.maxLength - 10), this.props.maxLength);
          var overflowText = this.state.text.substring(this.props.maxLength);
        }

        return (
          <div className="alert alert-warning">
            <strong>Oops too long:...&nbsp;{beforeOverflowText}<span className="bg-danger">{overflowText}</span></strong>
          </div>
        )
      } else {
        return '';
      }
    },

    togglePhoto: function(){
      this.setState({ photoAdded: !this.state.photoAdded })
    },
    // required React method
    render: function(){
      return (
        <div className="well clearfix">
          { this.overflowAlert() }
          <textarea onChange={this.handleChange} className="form-control"></textarea><br/>
          <span>{ this.remainingChars() }</span>
          <button className="btn btn-primary pull-right"
                  disabled={ this.state.text.length === 0 && !this.state.photoAdded }>Tweet</button>
          <button className="btn btn-default pull-right"
                  onClick={ this.togglePhoto } >{ this.state.photoAdded ? "PhotoAdded!" : "Add Photo" }</button>
        </div>
      )
    }
});

var MultiTweet = React.createClass({
  render: function(){
    return (
      <div>
        <TweetBox maxLength={140}/>
        <TweetBox maxLength={500}/>
        <TweetBox maxLength={200}/>
        <TweetBox maxLength={420}/>
        <TweetBox />
      </div>
    )
  }
});

ReactDOM
.render(<MultiTweet />, document.querySelector('.tweet-box'));
