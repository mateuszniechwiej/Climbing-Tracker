import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [sessions, setSessions] = useState([]);

  const addTestSession = () => {
    setSessions([...sessions, { 
      id: sessions.length + 1, 
      color: 'pink', 
      bestGrade: '5c-6a', 
      count: 3, 
      date: new Date().toISOString().split('T')[0]
    }]);
  };

  return (
    <>
      <div className="p-8 max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-4">Climbing Tracker</h1>
        <p className="mb-4">Total: {sessions.length}</p>

        <button
          onClick={addTestSession}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          Add Test Session
        </button>

        {sessions.map(session => (
          <div key={session.id} className="flex items-center p-4 mb-2 border rounded hover:bg-gray-50">
            <span className="px-3 py-1 rounded-full text-white font-bold mr-4"
              style={{ backgroundColor: session.color === 'pink' ? '#FFB6C1' : '#ccc' }}>
              {session.bestGrade}
            </span>
            <span className="mr-4">x{session.count}</span>
            <span className="text-sm text-gray-600">{session.date}</span>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
