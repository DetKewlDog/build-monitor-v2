function Monitor({ logs }) {
    if (!logs) return <></>;
    return (
        <>
            {logs.map((log, index) =>
                log.content !== '' ? (
                    <pre key={index} className={log.type}>
                        {log.content}
                    </pre>
                ) : (
                    <br key={index} />
                )
            )}
        </>
    );
}

export default Monitor;