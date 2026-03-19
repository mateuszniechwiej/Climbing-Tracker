import { useState } from 'react';

export default function Stats({ sessions }) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Filter sessions by date range
  const filteredSessions = sessions.filter(session => {
    if (!startDate && !endDate) return true;
    const sessionDate = new Date(session.date);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && sessionDate < start) return false;
    if (end && sessionDate > end) return false;
    return true;
  });

  const totalClimbs = filteredSessions.reduce((total, session) => total + session.count, 0);

  const parseDuration = (durationStr) => {
    const [hrs, mins] = durationStr.split('h :').map(part => parseInt(part.replace('m', '')));
    return (hrs * 60) + mins;
  };

  const totalDuration = filteredSessions.reduce((total, session) => {
    return total + parseDuration(session.duration);
  }, 0);

  const formatDuration = (totalMins) => {
    const hrs = Math.floor(totalMins / 60);
    const mins = totalMins % 60;
    return `${hrs}h :${mins.toString().padStart(2, '0')}m`;
  };

  // Count color sessions
  const pinkCount = filteredSessions.filter(session => session.color === 'Pink').length;
  const blackCount = filteredSessions.filter(session => session.color === 'Black').length;
  const blueCount = filteredSessions.filter(session => session.color === 'Blue').length;

  // Calculate duration per month for filtered sessions
  const monthlyDurations = filteredSessions.reduce((acc, session) => {
    const date = new Date(session.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const durationMins = parseDuration(session.duration);

    if (!acc[monthKey]) {
      acc[monthKey] = 0;
    }
    acc[monthKey] += durationMins;
    return acc;
  }, {});

  const sortedMonths = Object.keys(monthlyDurations).sort();

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-sm m-4">
      <h2 className="text-xl font-bold m-4">Stats</h2>

      {/* Date Range Filter */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold mb-2">Filter by Date Range:</h3>
        <div className="space-y-3 mb-2">
          <div className="flex justify-center">
            
          </div>
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="startDate" className="block text-xs text-gray-600 mb-1">Start Date</label>
              <input
                type="date"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex-1">
              <label htmlFor="endDate" className="block text-xs text-gray-600 mb-1">End Date</label>
              <input
                type="date"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <button
              onClick={() => {
                setStartDate('');
                setEndDate('');
              }}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-300 rounded transition-colors duration-200"
            >
              Clear
            </button>
        </div>
        {(startDate || endDate) && (
          <p className="text-xs text-gray-500 mt-">
            Showing stats for {filteredSessions.length} of {sessions.length} sessions
          </p>
        )}
      </div>

      <div className="space-y-2">
        <p><strong>Total Climbs:</strong> {totalClimbs}</p>
        <p><strong>Total Duration:</strong> {formatDuration(totalDuration)}</p>
        {pinkCount > 0 && <p><strong>Pink grades climbed:</strong> {pinkCount}</p>}
        {blackCount > 0 && <p><strong>Black grades climbed:</strong> {blackCount}</p>}
        {blueCount > 0 && <p><strong>Blue grades climbed:</strong> {blueCount}</p>}
      </div>
      {(startDate || endDate) && filteredSessions.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Daily Duration in Range:</h3>
          <div className="space-y-2">
            {Object.entries(
              filteredSessions.reduce((acc, session) => {
                const dayKey = session.date;
                const durationMins = parseDuration(session.duration);
                acc[dayKey] = (acc[dayKey] || 0) + durationMins;
                return acc;
              }, {})
            )
              .sort(([a], [b]) => new Date(a) - new Date(b))
              .map(([date, totalMins]) => (
                <div key={date} className="text-sm p-2 bg-gray-50 rounded border flex justify-between items-center">
                  <span><strong>{date}</strong></span>
                  <span className="text-blue-600 font-medium">{formatDuration(totalMins)}</span>
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Sessions Duration:</h3>
        {sortedMonths.length > 0 ? (
          <ul className="space-y-1">
            {sortedMonths.map(month => (
              <li key={month} className="text-sm">
                <strong>{month}:</strong> {formatDuration(monthlyDurations[month])}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-gray-500">No sessions in selected range</p>
        )}
      </div>
    </div>
  );
}