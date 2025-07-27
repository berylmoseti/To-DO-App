const TodoList = ({ todos, onToggleTodo, onDeleteTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No tasks yet</h3>
        <p>Create your first task to get started!</p>
        <Link to="/add" className="btn btn-primary">Add Task</Link>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h2>Your Tasks ({todos.filter(todo => !todo.completed).length} remaining)</h2>
      <div className="todos">
        {todos.map(todo => (
          <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <div className="todo-content">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
            </div>
            <div className="todo-actions">
              <small className="todo-date">
                {new Date(todo.createdAt).toLocaleDateString()}
              </small>
              <button 
                onClick={() => onDeleteTodo(todo.id)}
                className="btn btn-danger btn-small"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
