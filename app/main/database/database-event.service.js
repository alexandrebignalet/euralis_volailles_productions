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

        // ipc.on('save', (event, data) => {
        //     this.databaseService.save(data.entityName, data.object)
        //         .then((res) => DatabaseEventInterface.resolveAndSend(event, 'save', res));
        // });

        ipc.on('remove', (event, data) => {
            let object = {id: data.object.id, rev: data.object.rev};

            this.databaseService.remove(data.entityName, object)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'remove', res));
        });

        ipc.on('save', (event, data) => {

            delete data.object.attachments;

            this.databaseService.save(data.entityName, data.object)
                .then((objects) => {

                    let entity = objects[Object.keys(objects)[0]][0];

                    if(data.attachments) {

                        return data.attachments.reduce((p, attachment) => {
                            attachment.obj = entity;
                            return p.then(() => this.databaseService.putAttachment(attachment));
                        }, Promise.resolve());
                    }
                    return objects;
                })
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'save', res));
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