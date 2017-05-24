const DatabaseService = require('../database.service');
const Facility = require('../domain/facility');
const FacilityCharges = require('../domain/facility_charges');

class FacilityRepository extends DatabaseService {
    constructor() {
        super();
        this.entityName = 'facility';
    }

    get(id) {
        let facilityEntity;
        return super.find(this.entityName, id)
            .then(({facilities, facilitiesCharges}) => {
                facilityEntity = new Facility(facilities[0]);
                facilityEntity.facilityCharges = new FacilityCharges(facilitiesCharges[0]);
                return facilityEntity;
            });
    }

    getAll() {
        let facilityEntity;
        return super.find(this.entityName)
            .then(({facilities, facilitiesCharges}) => facilities.map((facility) => {
                    facilityEntity = new Facility(facility);

                    for( let i = 0; i  < facilitiesCharges.length ; i++) {
                        if (facilitiesCharges[i].id === facility.facilityCharges) {
                            facilityEntity.facilityCharges = new FacilityCharges(facilitiesCharges[i]);
                            break;
                        }
                    }

                    return facilityEntity;
                })
            );
    }

    /**
     * @type Facility
     * @param facility
     * @return Promise
     */
    create(facility) {
        return super.save(this.entityName, facility).then((facilitySaved) => this.get(facilitySaved.id));
    }

    update(facility) {
        return super.find(this.entityName, facility.id)
            .then((facilityFound) => {
                facility.rev = facilityFound.facilities[0].rev;
                return facility;
            })
            .then((facilityToUpdate) => this.create(facilityToUpdate))
    }

    del(id) {
        return super.find(this.entityName, id)
            .then(({facilities}) => super.remove(this.entityName, {id: facilities[0].id, rev: facilities[0].rev}));
    }
}

module.exports = FacilityRepository;