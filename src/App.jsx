import { useState } from 'react'
import './App.css'
import AddSession from './components/AddSession'
import SessionList from './components/SessionList'
import Stats from './components/Stats';
import usePersistentSessions from './hooks/usePersistentSessions';

function App() {
  const [sessions, saveSession, deleteSession, updateSession] = usePersistentSessions();
  const [editSession, setEditSession] = useState(null);

  const handleAddSession = (formData) => {
    const newSession = {
      climbs: formData.climbs,
      date: formData.date,
      duration: formData.duration,
      notes: formData.notes || ''
    };

    saveSession(newSession);
  };
  
  const handleEdit = (session) => {
    setEditSession(session);
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Climbing Tracker</h1>
      <p className="mb-4">Total: {sessions.length}</p>

      <AddSession onAdd={handleAddSession} onUpdate={updateSession} editSession={editSession} onCancelEdit={() => setEditSession(null)} />
      <Stats sessions={sessions} saveSession={saveSession} updateSession={updateSession} />
      <SessionList sessions={sessions} onDelete={deleteSession} onEdit={handleEdit} />
      
    </div>
  );
}
export default App
