const DatabaseService = require('../database.service');
const FacilityCharges = require('../domain/facility_charges');

class FacilityChargesRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'facilityCharges';
    }

    find(id) {
        return super.find(this.entityName, id).then(({facilitiesCharges}) => new FacilityCharges(facilitiesCharges[0]));
    }

    /**
     * @type FacilityCharges
     * @param facilityCharges
     * @return Promise
     */
    create(facilityCharges) {
        return super.save(this.entityName, facilityCharges)
            .then((facilityChargesSaved) => this.find(facilityChargesSaved.id));
    }

    update(facilityCharges) {
        return super.find(this.entityName, facilityCharges.id)
            .then((facilityChargesFound) => {
                facilityCharges.rev = facilityChargesFound.facilitiesCharges[0].rev;
                return facilityCharges;
            })
            .then((facilityChargesToUpdate) => this.create(facilityChargesToUpdate))
    }

    del(id) {
        return super.remove(this.entityName, id);
    }
}

module.exports = FacilityChargesRepository;