
export class ProductionDataService {
    constructor($window, $location, $state) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
        this.location = $location;
        this.window = $window;
        this.state = $state;
    }

    get(id) { return this.repositories.production.get(id).then((data) => data); }

    all() { return this.repositories.production.getAll().then((data) => data); }

    update(production) { return this.repositories.production.update(production).then((data) => data); }

    remove(production) { return this.repositories.production.del(production.id).then((data) => data ); }

    create(production) { return this.repositories.production.create(production).then((data) => data); }

    destroy() {
        this.repositories.production.destroy()
            .then((data) => {
                if (data.ok) alert('\nDatabase destroyed, you can reload the app.\n');
            })
            .catch(() => console.log('fail'));
    }

    sync() {
        return this.repositories.production.sync()
            .then((data) => {
                if (data.ok && data.ok === false) return alert('\nVous devez être connecté à l\'internet pour synchroniser votre appli.\n');
                this.state.go('home', null, {reload:true});
            });
    }
}