import { useEffect, useCallback } from 'react';
import Monitor from './Monitor.jsx';
import "../index.css";
import LogAccess from '../services/LogAccess.js';

var oldUrl = ''

function MonitorLogDisplay({ url, online, monitorLog, setMonitorLog }) {
    const scrollToBottom = () => {
        const monitor = document.getElementById('monitor');
        const isScrolledToBottom = monitor.scrollHeight - monitor.clientHeight <= monitor.scrollTop + 1;

        if (!isScrolledToBottom) return;
        setTimeout(() => {
            monitor.scrollTo(0, monitor.scrollHeight);
        }, 0);
    };

    if (oldUrl !== url) {
        oldUrl = url;
    }

    const updateMonitorLog = useCallback(async () => {
        if (!online) return;
        const updatedLog = await LogAccess.fetchLogs(url, online);
        if (updatedLog === undefined) return;
        setMonitorLog((prevLog) => [...prevLog, ...updatedLog]);
        scrollToBottom();
    }, [url, online]);

    useEffect(() => {
        const interval = setInterval(updateMonitorLog, 1000);
        return () => clearInterval(interval);
    }, [updateMonitorLog]);

    return (
        <div className="console-output" id="monitor">
            <Monitor logs={monitorLog} />
        </div>
    )
}

export default MonitorLogDisplay;