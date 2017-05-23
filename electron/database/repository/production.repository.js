const DatabaseService = require('../database.service');
const Facility = require('../domain/facility');
const FacilityCharges = require('../domain/facility_charges');
const Production = require('../domain/production');

class ProductionRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'production';
    }

    find(id) {
        let productionEntity;
        return super.find(this.entityName, id)
            .then(({productions, facilities, facilitiesCharges}) => {
                productionEntity = new Production(productions[0]);
                productionEntity.facility = new Facility(facilities[0]);
                productionEntity.facility.facilityCharges = new FacilityCharges(facilitiesCharges[0]);
                return productionEntity;
            });
    }

    /**
     * @type Production
     * @param production
     * @return Promise
     */
    create(production) {
        return super.save(this.entityName, production).then((productionSaved) => this.find(productionSaved.id));
    }

    update(production) {
        return super.find(this.entityName, production.id)
            .then((productionFound) => {
                production.rev = productionFound.productions[0].rev;
                return production;
            })
            .then((productionToUpdate) => this.create(productionToUpdate))
    }

    del(id) {
        return super.remove(this.entityName, id);
    }
}

module.exports = ProductionRepository;