import { useState, useEffect } from 'react';
import Config from './components/Config.jsx'
import MonitorLogDisplay from './components/MonitorLogDisplay.jsx'
import "./index.css";

function App() {
	var [url, setUrl] = useState('');
	var [address, setAddress] = useState('10.100.102.11');
	var [online, setOnline] = useState(false);
	var [monitorLog, setMonitorLog] = useState([]);

	useEffect(() => {
		setUrl(`http://${address}:2327`);
		setAddress(address);
	}, [address])

	const updateAddressAndStart = () => {
        const address = document.querySelector('#inAddress').value;
        if (address === '') return;
        setAddress(address);
        setCommunication(true);
    }
	const setCommunication = (state) => {
		console.log(online, state);
        if (online !== state) setOnline(state);
    }
	const clearMonitorLog = () => {
        setMonitorLog([]);
    }

	return (
		<>
			<div className="console-header">
				<span className="console-title">Build Monitor</span>
			</div>
			<div className="console-body">
				<Config
					updateAddressAndStart={updateAddressAndStart}
					setCommunication={setCommunication}
					clearMonitorLog={clearMonitorLog}
					address={address}
					isOnline={online}
				/>
				<MonitorLogDisplay
					url={url}
					online={online}
					monitorLog={monitorLog}
					setMonitorLog={setMonitorLog}
				/>
			</div>
		</>
    );
}

export default App;
