const ipc = require('electron').ipcMain;
const DatabaseService = require('./database.service.js');

class DatabaseEventInterface {
    constructor(){
        this.databaseService = DatabaseService;
    }

    listen() {
        console.log("DatabaseEventInterface listenning for renderer requests...");

        ipc.on('get', (event, data) => {
            if(data.id) {
                this.databaseService.find(data.entityName, data.id)
                    .then((res) => {
                        return DatabaseEventInterface.resolveAndSend(event, 'get', res)
                    });
            } else {
                this.databaseService.find(data.entityName)
                    .then((res) => {
                        return DatabaseEventInterface.resolveAndSend(event, 'get', res)
                    });
            }
        });

        ipc.on('save', (event, data) => {
            this.databaseService.save(data.entityName, data.object)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'save', res));
        });

        /**
         * data.object: {id: , rev: }
         */
        ipc.on('remove', (event, data) => {
            let object = {id: data.object.id, rev: data.object.rev};

            this.databaseService.remove(data.entityName, object)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'remove', res));
        });

        ipc.on('saveVideo', (event, data) => {
            let video = {id: data.object.id, rev: data.object.rev};

            this.databaseService.save(data.entityName, video)
                .then(({videos}) => {
                    const attachment = {
                        entityName: data.entityName,
                        obj: videos[0],
                        name: data.object.name,
                        base64: data.object.file,
                        contentType: data.object.type
                    };

                    return this.databaseService.putAttachment(attachment);
                })
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'saveVideo', res));
        });

        ipc.on('replicate', (event, data) => {
            this.databaseService.replicate(data.who)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'replicate', res));
        });

        ipc.on('sync', (event) => {
            this.databaseService.db.sync(this.databaseService.remoteDb)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'sync', res))
        });
    }

    close() {
        ipc.removeAllListeners('get');
        ipc.removeAllListeners('save');
        ipc.removeAllListeners('saveVideo');
        ipc.removeAllListeners('remove');
        ipc.removeAllListeners('replicate');
        ipc.removeAllListeners('sync');

    }

    static resolveAndSend(event, eventName, data) {
        console.log(`${eventName} then result: ${data}`);
        event.sender.send(`${eventName}`, data);
    }
}

module.exports = DatabaseEventInterface;