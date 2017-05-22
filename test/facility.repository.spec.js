const assert = require('chai').assert;
const Facility = require('../electron/database/domain/facility');
const FacilityCharges = require('../electron/database/domain/facility_charges');
const FacilityRepository = require('../electron/database/repository/facility.repository');

describe('FacilityRepositoryTest', () => {
    let repository;

    beforeEach(() => {
        repository = new FacilityRepository();
    });

    after(() => {
        repository.db.destroy();
    });

    describe('constructor test', () => {
        it('should be created with new', () => {
            assert.isNotNull(repository);
        });
    });

    describe('crud test', () => {
        it('should save a facility object in pouch', () => {
            let facilityCharges = new FacilityCharges({id: 1, warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});
            let facility = new Facility({id: 3, size: 3222, type: 'cabane', facilityCharges: 1});

            return repository.save('facilityCharges', facilityCharges)
                .then(() => repository.create(facility))
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert(data.facilityCharges.warming === 1)
                })
        });

        it('should find a facility object in pouch', () => {

            return repository.find(3)
                .then((data) => {
                    assert.instanceOf(data, Facility);
                    assert.instanceOf(data.facilityCharges, FacilityCharges);
                })
        });

        it('should update a facility object in pouch', () => {

            return repository.find(3)
                .then((facility) => {
                    facility.size = 2000;
                    facility.type = 'batiment';
                    return facility;
                })
                .then((facility) => repository.update(facility))
                .then((facilityUpdated) => {
                    assert(facilityUpdated.size === 2000);
                    assert(facilityUpdated.type === 'batiment');
                })
        });

        it('should delete a facility object in pouch', () => {

            return repository.del(3)
                .then((data) => assert(data.deleted));
        });
    });
});