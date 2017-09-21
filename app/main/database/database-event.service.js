const ipc = require('electron').ipcMain;
const DatabaseService = require('./database.service.js');

class DatabaseEventInterface {
    constructor(){
        this.databaseService = DatabaseService;
    }

    listen() {
        ipc.on('get', (event, data) => {
            console.log("main on get event: ", data);
            if(data.id) {
                this.databaseService.find(data.entityName, data.id)
                    .then((res) => DatabaseEventInterface.resolveAndSend(event, 'get', res));
            } else {
                this.databaseService.find(data.entityName)
                    .then((res) => DatabaseEventInterface.resolveAndSend(event, 'get', res));
            }
        });

        ipc.on('save', (event, data) => {
            console.log("main on save event: ", data);
            this.databaseService.save(data.entityName, data.object)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'save', res));
        });

        ipc.on('remove', (event, data) => {
            console.log("main on remove event: ", data);
            this.databaseService.remove(data.entityName, data.id)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'remove', res));
        });

        ipc.on('replicate', (event, data) => {
            console.log("main on replicate event: ", data);
            this.databaseService.replicate(data.who)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'replicate', res));
        });

        ipc.on('sync', (event, data) => {
            console.log("main on sync event: ", data);
            this.databaseService.db.sync(this.databaseService.remoteDb)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'sync', res))
        });
    }

    close() {
        ipc.removeAllListeners('get');
        ipc.removeAllListeners('save');
        ipc.removeAllListeners('remove');
        ipc.removeAllListeners('replicate');
        ipc.removeAllListeners('sync');

    }

    static resolveAndSend(event, eventName, data) {
        console.log(`${eventName} then result: ${data}`);
        event.sender.send(`${eventName}`, data);
    }

    get(entityName, id) {
        return this.databaseService.db.rel.find(entityName, id);
    }

    save(entityName, object) {
        return this.databaseService.db.rel.save(entityName, object);
    }

    remove(entityName, id) {
        return this.databaseService.db.rel.del(entityName, id);
    }
}

module.exports = DatabaseEventInterface;