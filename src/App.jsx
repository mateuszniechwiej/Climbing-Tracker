import { useState } from 'react'
import './App.css'
import climbingLogo from './assets/climbing.png'
import AddSession from './components/AddSession'
import SessionList from './components/SessionList'
import Stats from './components/Stats';
import usePersistentSessions from './hooks/usePersistentSessions';

function App() {
  const [sessions, saveSession, deleteSession, updateSession] = usePersistentSessions();
  const [editSession, setEditSession] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  // Filter sessions by climb if selected
  const filteredSessions = sessions.filter(session => {
    if (!selectedColor) return true;
    const sessionColor = session.climbs?.some(c => c.color === selectedColor);
    return sessionColor    
  });

  const handleSelectedColor = (climb) => {
    
    setSelectedColor(climb);
  }
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
    <div className="min-h-screen bg-gray-100 w-full">
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="flex w-full items-center justify-between gap-3 px-4 py-2">
          <div className="flex items-center gap-2">
            <img src={climbingLogo} alt="Climbing logo" className="h-6 w-6 rounded-full object-cover" />
            <div>
              <p role="heading" aria-level="1" className="text-sm font-semibold text-slate-900 m-0 leading-tight">Climbing Tracker</p>
              <p className="text-[11px] text-slate-500">Total sessions: {sessions.length}</p>
            </div>
          </div>
          <nav className="flex items-center gap-3 text-xs">
            <a href="#climbs" className="rounded-full px-3 py-0.5 text-slate-700 transition hover:bg-slate-100">Climbs</a>
            <a href="#stats" className="rounded-full px-3 py-0.5 text-slate-700 transition hover:bg-slate-100">Stats</a>
            <a href="#sessions" className="rounded-full px-3 py-0.5 text-slate-700 transition hover:bg-slate-100">Sessions</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-6">
        <section id="climbs" className="scroll-mt-24">
          <AddSession onAdd={handleAddSession} onUpdate={updateSession} editSession={editSession} onCancelEdit={() => setEditSession(null)} />
        </section>

        <section id="stats" className="scroll-mt-24 mt-8">
          <Stats sessions={sessions} saveSession={saveSession} updateSession={updateSession} />
        </section>

        <section id="sessions" className="scroll-mt-24 mt-8">
          <SessionList 
            sessions={filteredSessions} 
            allSessions={sessions} 
            onDelete={deleteSession} 
            onEdit={handleEdit} 
            filter={handleSelectedColor} 
            selectedColor={selectedColor}
            onColorFilter={setSelectedColor} 
          />
        </section>
      </main>
    </div>
  );
}
export default App
