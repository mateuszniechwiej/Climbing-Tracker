export default function SessionList({ sessions }) {
  return (
    <div className="space-y-4 mt-2">
      {sessions.map((session, index) => (
        <div key={index} className="p-4 border border-gray-300 rounded-md shadow-sm">
          <p><strong>Color:</strong> {session.color}</p>
          <p><strong>Grade Difficulty:</strong> {session.gradeDifficulty}</p>
          <p><strong>Count:</strong> {session.count}</p>
          <p><strong>Date:</strong> {session.date}</p>
          <p><strong>Duration:</strong> {session.duration}</p>
          <p><strong>Notes:</strong> {session.notes}</p>
        </div>
      ))}
    </div>
  );
}
