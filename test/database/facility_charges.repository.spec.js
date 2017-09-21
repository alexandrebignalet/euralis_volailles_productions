const assert = require('chai').assert;
const FacilityCharges = require('.././domain/facility_charges');
const FacilityChargesRepository = require('.././repository/facility_charges.repository.js');

describe('FacilityChargesRepositoryTest', () => {
    let repository;

    beforeEach(() => {
        repository = new FacilityChargesRepository();
    });

    after(() => {
        return repository.dbService.destroy()
            .then(() => repository.dbService.init())
            .catch(() => repository.dbService.init());
    });

    describe('constructor test', () => {
        it('should be created with new', () => {
            assert.isNotNull(repository);
        });
    });

    describe('crud test', () => {
        it('should save a facilityCharges object in pouch', () => {
            let facilityCharges = new FacilityCharges({id: 1, name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            return repository.create(facilityCharges)
                .then((data) => {
                    assert.instanceOf(data, FacilityCharges);
                    assert(data.warming === 1)
                })
        });

        it('should find a facilityCharges object in pouch', () => {

            return repository.get(1)
                .then((data) => {
                    assert.instanceOf(data, FacilityCharges);
                })
        });

        it('should find all facilityCharges objects in pouch', () => {

            return repository.getAll()
                .then((data) => {repository.dbService.init();
                    data.forEach((item) => {
                        assert.instanceOf(item, FacilityCharges);
                    })
                })
        });

        it('should update a facilityCharges object in pouch', () => {

            return repository.get(1)
                .then((facilityCharges) => {
                    facilityCharges.warming = 2000;
                    facilityCharges.chickPrice = 100;
                    return facilityCharges;
                })
                .then((facilityCharges) => repository.update(facilityCharges))
                .then((facilityChargesUpdated) => {
                    assert(facilityChargesUpdated.warming === 2000);
                    assert(facilityChargesUpdated.chickPrice === 100);
                })
        });

        it('should delete a facility object in pouch', () => {

            return repository.del(1)
                .then((data) => assert(data.deleted));
        });
    });
});