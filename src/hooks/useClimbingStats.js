import { useState, useEffect, useMemo } from 'react';

export default function useClimbingStats(sessions) {
    const [streak, setStreak] = useState(0);
    const today = new Date().toISOString().slice(0, 10);

    const uniqueDates = useMemo(() => 
        sessions  // Input
            .map(s => new Date(s.date).toISOString().slice(0, 10)) 
            .filter((d, i, arr) => arr.indexOf(d) === i)
            .sort((a, b) => new Date(b) - new Date(a)), 
        [sessions]  // ONLY re-sort if sessions change
    );

    useEffect(() => {
        let currentStreak = 0;
        for (let i = 0; i < uniqueDates.length; i++) {
            const expected = new Date(new Date(today) - currentStreak * 86400000).toISOString().slice(0, 10);
            if (uniqueDates[i] === expected) {
                currentStreak++;
            } else {
                break;
            }
            
        }
        setStreak(currentStreak);
    }, [uniqueDates]);

    return { streak, uniqueDates };
}