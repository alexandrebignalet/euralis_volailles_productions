import electron from 'electron';
const ipc = electron.ipcRenderer;

export class VideoDataService {
    constructor($window, $location, $state) {
        'ngInject';
        this.entityName = 'video';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
        this.location = $location;
        this.window = $window;
        this.state = $state;
    }

    get(id) {
        ipc.send('get', {entityName: this.entityName, id});
        // return this.repositories.video.get(id).then((data) => data);
        return new Promise((resolve) => {
            ipc.on('get', (event, data) => {
                resolve(data);
            })
        });
    }

    all() {
        return this.repositories.video.getAll().then((data) => data) };

    update(production) { return this.repositories.video.update(production).then((data) => data); }

    remove(production) { return this.repositories.video.del(production.id).then((data) => data ); }

    create(production) { return this.repositories.video.create(production).then((data) => data); }
}