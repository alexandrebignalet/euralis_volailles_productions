const ipc = require('electron').ipcRenderer;

const FILE_COMM = {GET: "get", SET: "set", DELETE: "delete"};

class FileService {
    constructor() {
        ipc.on('file-set', (event, data) => {

            if(!data.message) {
                return console.log(`file not ${data.serviceOwner} correctly`);
            }
            return console.log(`file ${data.serviceOwner} !`);
        })
    }

    get(fileName) {
        ipc.send('file', {type: FILE_COMM.GET, fileName: fileName});

        return new Promise((resolve) => {
            ipc.on('file-get', (event, data) => {
                resolve(data);
            })
        });
    }



    set(displayName, name, file) {
        ipc.send('file', {type: FILE_COMM.SET, displayName, name, file});
    }

    remove(fileName) {
        ipc.send('file', {type: FILE_COMM.DELETE, fileName: fileName});
    }
}

module.exports = FileService;