const DatabaseService = require('../database.service.js');
const FacilityCharges = require('../domain/facility_charges');

class FacilityChargesRepository {
    constructor() {
        this.dbService = DatabaseService;
        this.entityName = 'facilityCharges';
    }

    get(id) {
        return this.dbService.find(this.entityName, id).then(({facilitiesCharges}) => new FacilityCharges(facilitiesCharges[0]));
    }

    getAll() {
        return this.dbService.find(this.entityName)
            .then(({facilitiesCharges}) => facilitiesCharges
                .map((facilityCharges) => new FacilityCharges(facilityCharges))
            );
    }

    /**
     * @type FacilityCharges
     * @param facilityCharges
     * @return Promise
     */
    create(facilityCharges) {
        return this.dbService.save(this.entityName, facilityCharges)
            .then((facilityChargesSaved) => this.get(facilityChargesSaved.id));
    }

    update(facilityCharges) {
        return this.dbService.find(this.entityName, facilityCharges.id)
            .then((facilityChargesFound) => {
                facilityCharges.rev = facilityChargesFound.facilitiesCharges[0].rev;
                return facilityCharges;
            })
            .then((facilityChargesToUpdate) => this.create(facilityChargesToUpdate))
    }

    del(id) {
        return this.dbService.find(this.entityName, id)
            .then(({facilitiesCharges}) => this.dbService.remove(this.entityName, {id: facilitiesCharges[0].id, rev: facilitiesCharges[0].rev}));
    }
}

module.exports = FacilityChargesRepository;