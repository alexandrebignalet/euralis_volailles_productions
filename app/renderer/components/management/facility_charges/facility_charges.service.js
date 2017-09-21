
export class FacilityChargesDataService {
    constructor($window) {
        'ngInject';
        if ($window.repositories) {
            this.repositories = $window.repositories;
        }
    }

    get(id) { return this.repositories.facilityCharges.get(id).then((data) => data); }

    all() { return this.repositories.facilityCharges.getAll().then((data) => data); }

    update(facilityCharges) { return this.repositories.facilityCharges.update(facilityCharges).then((data) => data); }

    remove(facilityCharges) { return this.repositories.facilityCharges.del(facilityCharges.id).then((data) => data ); }

    create(facilityCharges) { return this.repositories.facilityCharges.create(facilityCharges).then((data) => data); }
}