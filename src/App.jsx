import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddSession from './components/AddSession'
import SessionList from './components/SessionList'
import Stats from './components/Stats';
import usePersistentSessions from './hooks/usePersistentSessions';

function App() {
  const [sessions, saveSession, deleteSession] = usePersistentSessions();

  const handleAddSession = (formData) => {
    const newSession = {
      climbs: formData.climbs,
      date: formData.date,
      duration: formData.duration,
      notes: formData.notes || ''
    };

    saveSession(newSession);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Climbing Tracker</h1>
      <p className="mb-4">Total: {sessions.length}</p>

      <AddSession onAdd={handleAddSession} />
      <Stats sessions={sessions} />
      <SessionList sessions={sessions} onDelete={deleteSession} />
    </div>
  );
}
export default App
