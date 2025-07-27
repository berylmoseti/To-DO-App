// src/AddPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoForm from './TodoForm';
import NoteForm from './NoteForm';

const AddPage = ({ onAddTodo, onAddNote }) => {
  const [activeTab, setActiveTab] = useState('todo');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleAddTodo = (todo) => {
    const newTodo = {
      ...todo,
      completed: false,
      createdAt: new Date().toISOString()
    };
    onAddTodo(newTodo);
    navigate('/');
  };

  const handleAddNote = (note) => {
    const newNote = {
      ...note,
      createdAt: new Date().toISOString()
    };
    onAddNote(newNote);
    navigate('/notes');
  };

  return (
    <div className="add-page">
      <div className="tab-container">
        <button 
          className={`tab ${activeTab === 'todo' ? 'active' : ''}`}
          onClick={() => setActiveTab('todo')}
        >
          Add Task
        </button>
        <button 
          className={`tab ${activeTab === 'note' ? 'active' : ''}`}
          onClick={() => setActiveTab('note')}
        >
          Add Note
        </button>
      </div>
      
      {activeTab === 'todo' ? (
        <TodoForm onAddTodo={handleAddTodo} onCancel={handleCancel} />
      ) : (
        <NoteForm onAddNote={handleAddNote} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default AddPage;
