import electron from 'electron';
const ipc = electron.ipcRenderer;
import {Video} from '../../../../main/database/domain/video';

export class VideoDataService {
    constructor($timeout) {
        'ngInject';
        this.$timeout = $timeout;
        this.entityName = 'video';
    }

    load(file) {

        this.$timeout(() => {
            let myVideo = document.getElementsByTagName('video')[0];
            myVideo.src = URL.createObjectURL(file);
            myVideo.load();
            myVideo.play();
        });
    }

    get(id) {
        ipc.send('get', {entityName: this.entityName, id});

        return new Promise((resolve) => {
            ipc.on('get', (event, data) => {
                if(id && data.length === 1) {
                    return resolve(new Video(data[0]));
                }
                resolve(data.map((video) => new Video(video)));
                ipc.removeAllListeners('get');
            })
        });
    }

    remove(video) {
        ipc.send('remove', {entityName: this.entityName, object: {id: video.id, rev:video.rev}});

        return new Promise((resolve) => {
            ipc.on('remove', (event, data) => {
                console.log(data);
                resolve(data);
                ipc.removeAllListeners('remove');
            });
        });
    }

    save(video) {

        return this.toAttachmentFormat('video', video.attachments)
            .then((attachments) => {
                ipc.send('save', {entityName: this.entityName, object: video, attachments });
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
}