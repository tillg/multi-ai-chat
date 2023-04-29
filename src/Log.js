// Log.js
import React, { useState, useEffect } from 'react';

const Log = () => {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        const handleLog = (event) => {
            const { message, functionName } = event.detail;
            const timestamp = new Intl.DateTimeFormat('de-DE', {
                dateStyle: 'short',
                timeStyle: 'medium',
            }).format(new Date());

            setLogs((prevLogs) => [
                ...prevLogs,
                { timestamp, message, functionName },
            ]);
        };

        window.addEventListener('log', handleLog);
        return () => {
            window.removeEventListener('log', handleLog);
        };
    }, []);

    return (
        <div
            style={{
                maxHeight: '200px',
                overflowY: 'scroll',
                fontSize: '0.8rem',
            }}
        >
            {logs.map((log, index) => (
                <p key={index} style={{ textAlign: 'left' }}>
                    <strong>{log.functionName}</strong> - {log.timestamp} - {log.message}
                </p>
            ))}
        </div>
    );
};

export default Log;
