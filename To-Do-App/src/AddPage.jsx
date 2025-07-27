const AddPage = ({ onAddTodo, onAddNote }) => {
  const [activeTab, setActiveTab] = useState('todo');
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate('/');
  };

  const handleAddTodo = (todo) => {
    onAddTodo(todo);
    navigate('/');
  };

  const handleAddNote = (note) => {
    onAddNote(note);
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