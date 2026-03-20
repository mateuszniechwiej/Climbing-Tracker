import { useCallback } from 'react';
import Papa from 'papaparse';

export default function useCsvExport(sessions) {
  const exportCsv = useCallback(() => {
    // Flatten nested climbs
    const csvData = [];
    
    sessions.forEach(session => {
      if (session.climbs && session.climbs.length > 0) {
        session.climbs.forEach(climb => {
          csvData.push({
            'Session Date': session.date,
            'Climb Color': climb.color,
            'Grade Difficulty': climb.gradeDifficulty,
            'Count': climb.count,
            'Session Duration': session.duration,
            'Session Notes': session.notes || ''
          });
        });
      } else {
        // Session without climbs
        csvData.push({
          'Session Date': session.date,
          'Climb Color': '',
          'Grade Difficulty': '',
          'Count': '',
          'Session Duration': session.duration,
          'Session Notes': session.notes || ''
        });
      }
    });

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `climbing-sessions-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }, [sessions]);

  return { exportCsv };
}
