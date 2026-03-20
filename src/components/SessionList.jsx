import { Pencil, Trash2 } from 'lucide-react';
import { useEffect, useRef } from 'react';
export default function SessionList({ sessions, onDelete, onEdit }) {

  const listRef = useRef(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
  if (isFirstRender.current) {
    isFirstRender.current = false;
    return;
  }
  listRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [sessions]);
  return (
    <div ref={listRef} className="space-y-4 mt-2">
      <h3 className="text-lg font-semibold">Number of Sessions: {sessions.length}</h3>
      {sessions.map((session) => (
        <div key={session.id} className="p-4 border border-gray-300 rounded-md shadow-sm">
          <div className="mb-2">
            <strong>Number of Climbs:</strong>
            <ul className="list-disc list-inside ml-4">
              {session.climbs?.map((climb, i) => (
                <li key={i}>
                  {climb.color} - {climb.gradeDifficulty} - {climb.count} climbs
                </li>
              ))}
            </ul>
          </div>
          <p><strong>Date:</strong> {session.date}</p>
          <p><strong>Duration:</strong> {Math.floor(session.duration / 60)}h {(session.duration % 60).toString().padStart(2, '0')}m</p>
          <p><strong>Notes:</strong> {session.notes}</p>

          <div className="flex gap-2 mt-2 justify-center">
            <button
              onClick={() => {
                onEdit(session);
              }}
              className="px-3 py-1.5 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-lg text-sm font-medium"
            >
              <Pencil size={14} className="inline mr-1" />Edit
            </button>
            <button
              onClick={() => onDelete(session.id)}
              className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium"
            >
              <Trash2 size={14} className="inline mr-1" />Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}