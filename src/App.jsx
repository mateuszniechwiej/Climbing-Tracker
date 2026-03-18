import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AddSession from './components/AddSession'

function App() {
  const [sessions, setSessions] = useState([]);

  const addSession = (formData) => {  // ← Fixed param
    console.log('Added:', formData);  // Debug
    setSessions([...sessions, { 
      id: sessions.length + 1, 
      gradeDifficulty: formData.gradeDifficulty,
      count: formData.count,
      date: formData.date,
      notes: formData.notes || ''
    }]);
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-4">Climbing Tracker</h1>
      <p className="mb-4">Total: {sessions.length}</p>

      <AddSession onAdd={addSession} />

      {/* Display */}
      <div className="mt-6 space-y-2">
        {sessions.map(session => (
          <div key={session.id} className="flex items-center p-4 border rounded-lg hover:bg-gray-50">
            <span className="font-bold text-lg mr-3">{session.gradeDifficulty}</span>
            <span className="text-lg">x{session.count}</span>
            <span className="ml-auto text-sm text-gray-600">{session.date}</span>
            {session.notes && <span className="ml-2 text-xs italic">({session.notes})</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
export default App
