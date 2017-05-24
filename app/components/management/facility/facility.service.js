
export class FacilityDataService {
    constructor($window) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
    }

    get(id) { return this.repositories.facility.get(id).then((data) => data); }

    all() { return this.repositories.facility.getAll().then((data) => data); }

    update(facility) { return this.repositories.facility.update(facility).then((data) => data); }

    remove(facility) { return this.repositories.facility.del(facility.id).then((data) => data ); }

    create(facility) { return this.repositories.facility.create(facility).then((data) => data); }
}