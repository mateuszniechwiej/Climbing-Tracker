export default function SessionList({ sessions, onDelete }) {
  return (
    <div className="space-y-4 mt-2">
      {sessions.map((session, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
          <p>
            <strong>Color:</strong> {session.color}
          </p>
          <p>
            <strong>Grade Difficulty:</strong> {session.gradeDifficulty}
          </p>
          <p>
            <strong>Count:</strong> {session.count}
          </p>
          <p>
            <strong>Date:</strong> {session.date}
          </p>
          <p>
            <strong>Duration:</strong> {session.duration}
          </p>
          <p>
            <strong>Notes:</strong> {session.notes}
          </p>

          <button
            onClick={() => onDelete?.(session.id)}
            className="mt-2 px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg text-sm font-medium shadow-sm"
            title="Delete session"
            type="button"
          >
            🗑️ Delete
          </button>
        </div>
      ))}
    </div>
  );
}
