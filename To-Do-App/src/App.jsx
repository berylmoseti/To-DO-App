// src/App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import TodoList from './TodoList';
import NoteList from './NoteList';
import AddPage from './AddPage.jsx';
/**
import Navbar from './Navbar';
import TodoList from './TodoList';

**/

// Mock data (replace with actual API calls or json-server in real app)
const mockApi = {
  todos: [
    { id: 1, text: 'Buy groceries', completed: false },
    { id: 2, text: 'Study React', completed: true }
  ],
  notes: [
    { id: 1, content: 'Finish project setup' },
    { id: 2, content: 'Prepare for review' }
  ]
};

const App = () => {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate GET requests
    setTimeout(() => {
      setTodos(mockApi.todos);
      setNotes(mockApi.notes);
      setLoading(false);
    }, 500);
  }, []);

  const addTodo = (todo) => {
    setTodos(prev => [...prev, todo]);
    mockApi.todos.push(todo);
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    mockApi.todos = mockApi.todos.filter(todo => todo.id !== id);
  };

  const addNote = (note) => {
    setNotes(prev => [...prev, note]);
    mockApi.notes.push(note);
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
    mockApi.notes = mockApi.notes.filter(note => note.id !== id);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading your data...</p>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route 
              path="/" 
              element={
                <TodoList 
                  todos={todos} 
                  onToggleTodo={toggleTodo}
                  onDeleteTodo={deleteTodo}
                />
              } 
            />
            <Route 
              path="/notes" 
              element={
                <NoteList 
                  notes={notes}
                  onDeleteNote={deleteNote}
                />
              } 
            />
            <Route 
              path="/add" 
              element={
                <AddPage 
                  onAddTodo={addTodo}
                  onAddNote={addNote}
                />
              } 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
