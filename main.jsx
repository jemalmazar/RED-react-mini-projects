var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
  // states are set within the component; change over time
  getInitialState: function() {
    return {
      todos: []
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

  addToDo: function(e) {

    e.preventDefault();
    // how to access user input values below
    if(this.refs.addToDo.value) {
      this.state.todos.push({ title: this.refs.addToDo.value, complete: false });
      this.setState({ todos: this.state.todos })
      this.refs.addToDo.value = '';
    }

  },

  // .map() is an array iterator function similar to .forEach()
  render: function() {

    var todosLength = this.state.todos.length;

    return (
      <div className="todo-list">
        <h1>Todo List!</h1>
        <div className="add-todo">
          <form name="addTodoForm" onSubmit={this.addToDo}>
            <input type="text" ref="addToDo"/> <span>(Press Enter to add a task)</span>
          </form>
        </div>
        <ul>
          { this.state.todos.map(this.renderTodos) }
        </ul>
        <div className="todo-admin">
          <div>
            { todosLength } { todosLength > 1 || todosLength === 0 ? "tasks" : "task"}
          </div>
          <div>

          </div>
        </div>
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
