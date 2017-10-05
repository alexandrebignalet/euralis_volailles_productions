const ipc = require('electron').ipcMain;
const DatabaseService = require('./database.service.js');

class DatabaseEventInterface {
    constructor(){
        this.databaseService = DatabaseService;
        this.entityNamesList = ['facility', 'investment', 'video', 'facilityCharges', 'production'];
    }

    listen() {
        console.log("DatabaseEventInterface listenning for renderer requests...");


        for(let i = 0; i < this.entityNamesList.length ; i++) {
            this.listenGetEvent(this.entityNamesList[i]);
        }

        ipc.on('getProdByDepartment', (event, data) => {

            this.databaseService.getProductionsByDepartment(data.department)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'getProdByDepartment', res));
        });

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
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'replicate', res))
                .catch((err) => DatabaseEventInterface.resolveAndSend(event, 'replicate', err));
        });

        ipc.on('sync', (event) => {
            this.databaseService.db.sync(this.databaseService.remoteDb)
                .then((res) => DatabaseEventInterface.resolveAndSend(event, 'sync', res))
                .catch((err) => DatabaseEventInterface.resolveAndSend(event, 'sync', err));
        });
    }

    close() {
        for(let i = 0; i < this.entityNamesList.length ; i++) {
            ipc.removeAllListeners('get'+this.entityNamesList[i]);
        }
        ipc.removeAllListeners('save');
        ipc.removeAllListeners('saveVideo');
        ipc.removeAllListeners('remove');
        ipc.removeAllListeners('replicate');
        ipc.removeAllListeners('sync');
        ipc.removeAllListeners('getProdByDepartment');
    }

    listenGetEvent(entityName) {
        ipc.on('get'+entityName, (event, data) => {

            this.databaseService.find(data.entityName, data.id)
                .then((res) => {
                    return DatabaseEventInterface.resolveAndSend(event, 'get'+entityName, res)
                });
        });
    }

    static resolveAndSend(event, eventName, data) {
        // console.log(`${eventName} then result:`, data);
        event.sender.send(`${eventName}`, data);
    }
}

module.exports = DatabaseEventInterface;