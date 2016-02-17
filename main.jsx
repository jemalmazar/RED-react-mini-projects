var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  // states are set within the component; change over time
  getInitialState: function() {
    return {
      todos: [
        { title: 'placeholder todo', complete: false }
      ]
    }
  },

  toggleComplete: function(theToDoFromTheInstance) {
    // .map() takes an existing array
    var newToDoArray = this.state.todos.map(function(theToDoToModify){
      if (theToDoFromTheInstance === theToDoToModify) {
        theToDoToModify.complete = !theToDoToModify.complete;
      }
      return theToDoToModify;
    });

    this.setState({ todos: newToDoArray })

  },

  renderTodos: function(todo, index) {
    // properties get defined inside companent instances; do not change
    return <ToDo key={ index }
                 id={ index }
                 toggleComplete={ this.toggleComplete }
                 toDoData={ todo }
                 />;
  },
  // .map() is an array iterator function similar to .forEach()
  render: function() {
    return (
      <div className="todo-list">
        <h1>Todo List!</h1>
        <ul>
          { this.state.todos.map(this.renderTodos) }
        </ul>
      </div>
    )

  }
});

var ToDo = React.createClass({
  // states are set within the component
  getInitialState: function() {
    return {};
  },

  tellParentToToggleToDoComplete: function() {
    this.props.toggleComplete(this.props.toDoData);
  },

  render: function() {
    return (
      <li> { this.props.toDoData.title }
        <input type="checkbox" id={ this.props.id } checked={ this.props.toDoData.complete } onClick={ this.tellParentToToggleToDoComplete } />
        <label htmlFor={ this.props.id } id={ this.props.key }></label>
        <button><i className="fa fa-trash"></i></button>
      </li>
    )
  }
});

ReactDOM.render(<App />, document.querySelector('#todo-app'));
