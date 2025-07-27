// src/NoteForm.jsx
import { useState } from 'react';

const NoteForm = ({ onAddNote, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!title.trim()) newErrors.title = 'Please enter a title';
    if (!content.trim()) newErrors.content = 'Please enter some content';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newNote = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString()
    };

    onAddNote(newNote);
    setTitle('');
    setContent('');
    setErrors({});
  };

  return (
    <div className="form-container">
      <h2>Add New Note</h2>
      <form onSubmit={handleSubmit} className="note-form">
        <div className="form-group">
          <label htmlFor="note-title">Note Title</label>
          <input
            id="note-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors(prev => ({ ...prev, title: '' }));
            }}
            placeholder="Enter note title..."
            className={errors.title ? 'error' : ''}
          />
          {errors.title && <span className="error-message">{errors.title}</span>}
        </div>
        <div className="form-group">
          <label htmlFor="note-content">Note Content</label>
          <textarea
            id="note-content"
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              setErrors(prev => ({ ...prev, content: '' }));
            }}
            placeholder="Write your note here..."
            rows="6"
            className={errors.content ? 'error' : ''}
          />
          {errors.content && <span className="error-message">{errors.content}</span>}
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Add Note</button>
          <button type="button" onClick={onCancel} className="btn btn-secondary">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NoteForm;
