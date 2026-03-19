import React, { useState, useEffect } from 'react';  // ✅ ADD React
import { openDB } from 'idb';

export default function usePersistentSessions() {
    const [sessions, setSessions] = useState([]);

    useEffect(() => {
        initDB();
    }, []);

    async function initDB() {
        try {
            const db = await openDB('ClimbTracker', 1, {
                upgrade(db) {
                    db.createObjectStore('sessions', { keyPath: 'id' });
                }
            });
            const data = await db.getAll('sessions');
            setSessions(data);
        } catch (error) {
            console.log('DB init skipped (dev env)');
        }
    }

    const saveSession = async (session) => {
        try {
            const db = await openDB('ClimbTracker', 1);
            const newSession = { id: Date.now(), ...session };
            await db.add('sessions', newSession);
            setSessions(prev => [...prev, newSession]);
        } catch (error) {
            console.log('Save skipped (dev)');
        }
    };

    const deleteSession = async (id) => {
        try {
            const db = await openDB('ClimbTracker', 1);
            await db.delete('sessions', id);
            setSessions(prev => prev.filter(s => s.id !== id));
        } catch (error) {
            console.log('Delete skipped (dev)');
        }
    };

    return [sessions, saveSession, deleteSession];
}
