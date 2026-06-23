import { useState, useEffect } from 'react';
import { openDB } from 'idb';

export default function usePersistentSessions() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        let active = true;

        async function initDB() {
            try {
                const db = await openDB('ClimbTracker', 1, {
                    upgrade(db) {
                        db.createObjectStore('sessions', { keyPath: 'id' });
                    }
                });
                const data = await db.getAll('sessions');
                if (active) {
                    setSessions(data);
                }
            } catch (error) {
                console.error('Failed to initialize IndexedDB. Persistence is disabled for the current environment.', error);
            }
        }

        initDB();

        return () => {
            active = false;
        };
    }, []);

    const saveSession = async (session) => {
        try {
            const db = await openDB('ClimbTracker', 1);
            const newSession = { id: Date.now(), ...session };
            await db.add('sessions', newSession);
            setSessions(prev => [...prev, newSession]);
        } catch (error) {
            console.error('Unable to save session. Persistence is unavailable in this environment.', error);
        }
    };

    const deleteSession = async (id) => {
        try {
            const db = await openDB('ClimbTracker', 1);
            await db.delete('sessions', id);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.error('Unable to delete session. Persistence is unavailable in this environment.', error);
        }
    };

    const updateSession = async (updatedSession) => {
        try {
            const db = await openDB('ClimbTracker', 1);
            await db.put('sessions', updatedSession);
            setSessions(prev => prev.map(s => s.id === updatedSession.id ? updatedSession : s));
        } catch (error) {
            console.error('Unable to update session. Persistence is unavailable in this environment.', error);
        }
    };
        
    return [sessions, saveSession, deleteSession, updateSession];
      
}
