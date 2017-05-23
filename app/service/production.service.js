
export class ProductionDataService {
    constructor($window) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
    }

    get(id) {

        return this.repositories.production.get(id)
            .then((data) => data);
    }

    all() {

        return this.repositories.production.getAll()
            .then((data) => data);
    }

    update(production) {
        return this.repositories
            .production
            .update(production)
            .then((data) => data);
    }

    remove(production) {
        return this.repositories
            .production
            .del(production.id)
            .then((data) => data );
    }

    create(production) {
        return this.repositories
            .production
            .create(production)
            .then((data) => data);
    }
}