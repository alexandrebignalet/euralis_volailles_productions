import electron from 'electron';
const ipc = electron.ipcRenderer;

import {Video} from '../../../main/database/domain/video';
import {FacilityCharges} from '../../../main/database/domain/facility_charges';
import {Investment} from '../../../main/database/domain/investment';
import {Production} from '../../../main/database/domain/production';
import {Facility} from '../../../main/database/domain/facility';

export class PouchDataService {
    constructor($timeout) {
        'ngInject';
        this.$timeout = $timeout;
    }

    getConstructorFromEntityName(entityName) {
        const nameToConstructor = {
            video: Video,
            facilityCharges: FacilityCharges,
            investment: Investment,
            production: Production,
            facility: Facility
        };

        return nameToConstructor[entityName];
    }

    get(entityName, id) {
        ipc.send('get'+entityName, {entityName, id});
        const constructor = this.getConstructorFromEntityName(entityName);

        return new Promise((resolve) => {
            ipc.on('get'+entityName, (event, objects) => {

                if(id && objects.length === 1)
                    return resolve(Reflect.construct(constructor, [objects[0]]));

                resolve(objects.map((obj) => Reflect.construct(constructor, [obj])));
                ipc.removeAllListeners('get'+entityName);
            })
        });
    }

    /**
     *
     * @param entityName
     * @param object = {id: video.id, rev:video.rev}
     * @returns {Promise}
     */
    remove(entityName, object) {
        ipc.send('remove', {entityName, object});

        return new Promise((resolve) => {
            ipc.on('remove', (event, data) => {
                resolve(data);
                ipc.removeAllListeners('remove');
            });
        });
    }

    save(entityName, object) {
        return this.toAttachmentFormat(entityName, object.attachments || {})
            .then((attachments) => {
                ipc.send('save', {entityName, object, attachments });
            })
            .then(() => new Promise((resolve) => {
                ipc.on('save', (event, data) => {
                    resolve(data);
                    ipc.removeAllListeners('save');
                })
            }));
    }

    toAttachmentFormat(entityName, attachments) {

        return Promise.all(
            Object.keys(attachments).map(key => {
                let name = key;
                let attachmentFormat = {
                    entityName,
                    name,
                    contentType: attachments[name].type
                };

                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    reader.readAsArrayBuffer(attachments[name]);

                    reader.onload = () => {
                        attachmentFormat.base64 = new Buffer(reader.result);
                        resolve(attachmentFormat);
                    };

                    reader.onerror = (error) => {
                        reject(error);
                    };
                })
            })
        );
    }

    load(file) {

        this.$timeout(() => {
            let myVideo = document.getElementsByTagName('video')[0];
            myVideo.src = URL.createObjectURL(file);
            myVideo.load();
            myVideo.play();
        });
    }
}