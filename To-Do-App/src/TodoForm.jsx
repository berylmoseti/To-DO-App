// src/TodoForm.jsx
import { useState } from 'react';

const TodoForm = ({ onAddTodo, onCancel }) => {
  const [text, setText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter a task');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString()
    };

    onAddTodo(newTodo);
    setText('');
    setError('');
  };

  return (
    <div className="form-container">
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit} className="todo-form">
        <div className="form-group">
          <label htmlFor="todo-text">Task Description</label>
          <input
            id="todo-text"
            type="text"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              setError('');
            }}
            placeholder="Enter your task..."
            className={error ? 'error' : ''}
          />
          {error && <span className="error-message">{error}</span>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Task</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default TodoForm;
