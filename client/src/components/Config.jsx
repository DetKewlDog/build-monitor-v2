function Config({ updateAddressAndStart, setCommunication, clearMonitorLog, address, isOnline }) {
    return (
        <>
            <div className="console-input">
                <input id='inAddress'
                    placeholder="Enter server address here..."
                    defaultValue={address}
                />
                <button onClick={updateAddressAndStart} className={isOnline ? 'on' : ''}>Start</button>
                <button onClick={() => setCommunication(false)}>Stop</button>
                <button onClick={clearMonitorLog}>Clear</button>
            </div>
        </>
    );   
}

export default Config;