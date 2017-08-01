
export class VideoDataService {
    constructor($window, $location, $state) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
        this.location = $location;
        this.window = $window;
        this.state = $state;
    }

    get(id) { return this.repositories.video.get(id).then((data) => data); }

    all() { return this.repositories.video.getAll().then((data) => data) };

    update(production) { return this.repositories.video.update(production).then((data) => data); }

    remove(production) { return this.repositories.video.del(production.id).then((data) => data ); }

    create(production) { return this.repositories.video.create(production).then((data) => data); }
}