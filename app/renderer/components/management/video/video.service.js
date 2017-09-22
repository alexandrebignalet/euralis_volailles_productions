import electron from 'electron';
const ipc = electron.ipcRenderer;
import Video from '../../../../main/database/domain/video';

export class VideoDataService {
    constructor($timeout) {
        'ngInject';
        this.$timeout = $timeout;
        this.entityName = 'video';
    }

    load(video) {
        this.$timeout(() => {
            let myVideo = document.getElementsByTagName('video')[0];
            myVideo.src = URL.createObjectURL(video.file);
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

        return VideoDataService.getBuffer(video.file)
            .then((base64) => {
                video.type = video.file.type;
                video.file = base64;
console.log(video);
                ipc.send('saveVideo', {entityName: this.entityName, object: video});
            })
            .then(() => new Promise((resolve) => {
                ipc.on('saveVideo', (event, data) => {
                    resolve(data);
                    ipc.removeAllListeners('saveVideo');
                })
            }));
    }

    static getBuffer(file) {
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            reader.readAsArrayBuffer(file);

            reader.onload = () => {
                resolve(new Buffer(reader.result));
            };

            reader.onerror = (error) => {
                reject(error);
            };
        });
    }
}