import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddSession from './components/AddSession'
import SessionList from './components/SessionList'

function App() {
  const [sessions, setSessions] = useState([]);

  const addSession = (formData) => {  // ← Fixed param
    console.log('Added:', formData);  // Debug
    setSessions([...sessions, { 
      id: sessions.length + 1, 
      color: formData.color,
      gradeDifficulty: formData.gradeDifficulty,
      count: formData.count,
      date: formData.date,
      duration: formData.duration,
      notes: formData.notes || ''
    }]);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Climbing Tracker</h1>
      <p className="mb-4">Total: {sessions.length}</p>

      <AddSession onAdd={addSession} />
      <SessionList sessions={sessions} />
    </div>
  );
}
export default App
