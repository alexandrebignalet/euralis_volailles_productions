const assert = require('chai').assert;
const FacilityCharges = require('../../app/database/domain/facility_charges');
const Production = require('../../app/database/domain/production');
const Facility = require('../../app/database/domain/facility');
const DatabaseService = require('../../app/database/database.service.js');

global.navigator = {
    userAgent: 'node.js'
};

describe('DatabaseServiceTest', () => {
    let databaseService;
    const facilitiesChargesCreated = [];
    const facilitiesCreated = [];
    const productionsCreated = [];

    beforeEach(()  => {
        databaseService = DatabaseService;
    });

    after(() => {
        return databaseService.destroy()
            .then(() => databaseService.init())
            .catch(() => databaseService.init());
    });

    describe('constructor test', () => {
        it('should be a singleton', () => {
            assert.isNotNull(databaseService);
        });

        it('should create the db if not exists yet', () => {
            return databaseService.db.info()
                .then((data) => {
                    assert(data.db_name === 'euralis_volailles_db-test')
                });
        });
    });

    describe('crud operations test', () => {
        it('should save a facilityCharges Object', (done) => {
            let facilityCharges = new FacilityCharges({id: 'uid9999', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            databaseService.save('facilityCharges', facilityCharges)
                .then((data) => {
                    assert(data.facilitiesCharges[0].warming === 1);
                    assert(data.facilitiesCharges[0].chickPrice === 1);
                    facilitiesChargesCreated.push(data.facilitiesCharges[0].id);
                    done();
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                    done();
                });
        });

        it('should save a production object containing a facility Object which contains a facilityCharges object', () => {
            let facilityCharges = new FacilityCharges({id: 'uid9843', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            let facility = new Facility({id: 3, size: 3222, type: 'cabane', facilityCharges: 'uid9843'});
            let production = new Production({id: 3, department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility:3});

            return databaseService.save('facilityCharges', facilityCharges)
                .then((data) => {
                    assert(data.facilitiesCharges[0].warming === 1);
                    assert(data.facilitiesCharges[0].chickPrice === 1);
                    facilitiesChargesCreated.push(data.facilitiesCharges[0].id);
                    return data;
                })
                .then(() => databaseService.save('facility', facility))
                .then((data) => {
                    assert(data.facilities[0].size === 3222);
                    assert(data.facilities[0].id === 3);
                    facilitiesCreated.push(data.facilities[0].id);
                    return data;
                })
                .then(() => databaseService.save('production', production))
                .then((data) => {
                    assert(data.productions[0].name === 'toto');
                    assert(data.productions[0].id === 3);
                    productionsCreated.push(data.productions[0].id);
                    return data;
                })
                .then(() => databaseService.find('production', 3))
                .then((data) => {
                    assert(data.productions[0].id === production.id);
                    assert(data.productions[0].facility === facility.id);
                    return data;
                })
                .then((data) => databaseService.find('facility', data.productions[0].facility))
                .then((data) => {
                    assert(data.facilities[0].facilityCharges === facilityCharges.id);
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                });
        });

        it('should update a facilityCharges object in the db', () => {

            return databaseService.find('facilityCharges', facilitiesChargesCreated[1])
                .then((data) => {
                    data.facilitiesCharges[0].warming = 0.097;
                    return databaseService.db.rel.save('facilityCharges', data)
                })
                .then((data) => {
                    assert(data.facilitiesCharges[0].facilitiesCharges[0].warming === 0.097);
                    assert(data.facilitiesCharges[0].facilitiesCharges[0].id === facilitiesChargesCreated[1]);
                });
        });

        it('should update an object in the db', () => {

            return databaseService.find('facility', facilitiesCreated[0])
                .then((data) => {
                    data.facilities[0].size = 20000;
                    return databaseService.db.rel.save('facility', data)
                })
                .then((data) => {
                    assert(data.facilities[0].facilities[0].size === 20000);
                    assert(data.facilities[0].facilities[0].id === facilitiesCreated[0]);
                });
        });

        it('should delete a facilityCharges object in the db', () => {

            return databaseService.find('facilityCharges', facilitiesChargesCreated[0])
                .then((facilityCharges) => databaseService.remove('facilityCharges', facilityCharges))
                .then((data) => {
                    assert(data.deleted);
                });

        });
        it('should delete production object', () => {

            return databaseService.find('production', productionsCreated[0])
                .then((production) => databaseService.remove('production', production))
                .then((data) => {
                    assert(data.deleted);
                });
        });

        it('should delete facility object', () => {

            return databaseService.find('facility', facilitiesChargesCreated[0])
                .then((facility) => databaseService.remove('facility', facility))
                .then((data) => {
                    assert(data.deleted);
                });
        });
    });

    describe('database synchronisation', () => {
        it('should dump the database into a file', () => {
            return databaseService.replicate()
                .then((data) => {
                    console.log(data);
                })
        });
    });

    describe('database empty', () => {
        it('should empty the database', () => {
            return databaseService.find('facility')
                .then((data) => {
                    assert(data.facilities.length > 0)
                })
                .then(() => databaseService.destroy())
                .then((response) => assert(response.ok))
                .then(() => databaseService.db.info())
                .then(() => {
                    // database is destroyed
                    assert(false)
                })
                .catch(() => assert(true));
        });
    });

});