import Papa from 'papaparse';

export default function useCSVImport(saveSession) {
  const importCsv = (file) => {
    if (!file) return;

    Papa.parse(file, {
      header: true,
      complete: (results) => {
        // Group rows back into sessions by date
        const sessionMap = {};

        results.data.forEach(row => {
          if (!row['Session Date']) return;

          const date = row['Session Date'];
          if (!sessionMap[date]) {
            sessionMap[date] = {
              date,
              duration: parseInt(row['Session Duration']) || 0,
              notes: row['Session Notes'] || '',
              climbs: []
            };
          }

          if (row['Climb Color']) {
            sessionMap[date].climbs.push({
              color: row['Climb Color'],
              gradeDifficulty: row['Grade Difficulty'],
              count: row['Count']
            });
          }
        });

        Object.values(sessionMap).forEach(session => saveSession(session));
      }
    });
  };

  return { importCsv };
}