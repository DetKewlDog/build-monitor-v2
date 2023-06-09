import axios from 'axios';

const EXCEPTION_STRING = 'Exception';
const EXCEPTION_END_STRING = 'Filename:';
const DEBUG_LOG_STRING = '(Filename: C:\\buildslave\\unity\\build\\Runtime/Export/Debug/Debug.bindings.h Line: 39)';

const MAX_LOGGED_LINES_COUNT = 5000

class LogAccess {
    static async fetchLogs(url, online) {
        if (url === '' || !online) return [];
        return axios.get(url)
            .then(result => result.data)
            .then(result => {
                if (result == '') return;
                const lines = result.split('\n');
                var isError = false;
                var updatedLog = lines.map((line, index) => {
                    // Error logs end with a specific string
                    if (isError && line.includes(EXCEPTION_END_STRING)) isError = false;

                    // Log is an exception / error
                    if (isError || line.includes(EXCEPTION_STRING)) {
                        isError = true;
                        return { content: line, type: 'error' };
                    }
                    // Log was printed using Debug.Log
                    else if (line.includes(DEBUG_LOG_STRING)
                        || (index + 1 < lines.length
                            && lines[index + 1].includes(DEBUG_LOG_STRING))) {
                        return { content: line, type: 'print' };
                    }
                    // Log has been written automatically by Unity (Debug.Asset iirc?)
                    else return { content: line, type: '' };
                });
                // get the last MAX_LOGGED_LINES_COUNT lines
                if (updatedLog.length >= MAX_LOGGED_LINES_COUNT) {
                    updatedLog = updatedLog.slice(-MAX_LOGGED_LINES_COUNT);
                }
                return updatedLog;
            }
        ).catch(error => console.log(error));
    }
}

export default LogAccess;