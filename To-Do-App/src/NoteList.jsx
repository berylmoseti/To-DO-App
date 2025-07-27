// src/NoteList.jsx
import { Link } from 'react-router-dom';

const NoteList = ({ notes, onDeleteNote }) => {
  if (notes.length === 0) {
    return (
      <div className="empty-state">
        <h3>No notes yet</h3>
        <p>Create your first note to capture your thoughts!</p>
        <Link to="/add" className="btn btn-primary">Add Note</Link>
      </div>
    );
  }

  return (
    <div className="note-list">
      <h2>Your Notes ({notes.length})</h2>
      <div className="notes">
        {notes.map(note => (
          <div key={note.id} className="note-item">
            <div className="note-header">
              <h3 className="note-title">{note.title}</h3>
              <div className="note-actions">
                <small className="note-date">
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : '—'}
                </small>
                <button 
                  onClick={() => onDeleteNote(note.id)}
                  className="btn btn-danger btn-small"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="note-content">{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
