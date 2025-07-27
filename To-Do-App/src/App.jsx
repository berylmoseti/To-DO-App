// src/App.jsx
import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import TodoList from './TodoList';
import NoteList from './NoteList';
import AddPage from './AddPage';

const API_URL = 'http://localhost:3001';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from json-server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [todoRes, noteRes] = await Promise.all([
          fetch(`${API_URL}/todos`),
          fetch(`${API_URL}/notes`)
        ]);

        const [todosData, notesData] = await Promise.all([
          todoRes.json(),
          noteRes.json()
        ]);

        setTodos(todosData);
        setNotes(notesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Todo Handlers
  const addTodo = async (todo) => {
    try {
      const res = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todo),
      });
      const newTodo = await res.json();
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, completed: !todo.completed };

    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? updated : t))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, { method: 'DELETE' });
      setTodos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Note Handlers
  const addNote = async (note) => {
    try {
      const res = await fetch(`${API_URL}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(note),
      });
      const newNote = await res.json();
      setNotes((prev) => [...prev, newNote]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await fetch(`${API_URL}/notes/${id}`, { method: 'DELETE' });
      setNotes((prev) => prev.filter((n) => n.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  // Loading UI
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
