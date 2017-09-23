const assert = require('chai').assert;
const FacilityCharges = require('../../app/renderer/components/management/facility_charges/facility_charges');
const Production = require('../../app/renderer/components/management/production/production');
const Facility = require('../../app/renderer/components/management/facility/facility');
const DatabaseService = require('../../app/main/database/database.service.js');
const fs = require('fs');

global.navigator = {
    userAgent: 'node.js'
};

const ATTACHMENT_SIZE = 5000000;
const SYNC_TIMEOUT = 100000000;
const BASE_DOC_NUMBER = 100000;

describe('DatabaseServiceTest', () => {
    let databaseService = DatabaseService;
    const facilitiesChargesCreated = [];
    const facilitiesCreated = [];
    const productionsCreated = [];

    before(function () {
        this.timeout(SYNC_TIMEOUT);
        return addXDocInDb(BASE_DOC_NUMBER, 0, databaseService);
    });

    after(() => {
        return databaseService.destroy()
            .then(() => databaseService.remoteDb.destroy())
            .then(() => databaseService.init())
            .catch(() => databaseService.init());
    });

    describe('constructor and init tests', () => {
        it('should be a singleton', () => {
            assert.isNotNull(databaseService);
        });

        it(`should contain ${BASE_DOC_NUMBER} docs`, () => {
            return databaseService.db.allDocs()
                .then((data) => {
                    assert(data.total_rows === BASE_DOC_NUMBER);
                })
        });

        it('should create the db if not exists yet', () => {
            return databaseService.db.info()
                .then((data) => {
                    assert(data.db_name === 'euralis_volailles_db-test')
                });
        });
    });

    describe('crud operations test', () => {
        it('should save a facilityCharges Object', () => {
            let facilityCharges = new FacilityCharges({id: 'uid9999', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            return databaseService.save('facilityCharges', facilityCharges)
                .then((data) => {
                    assert(data.facilitiesCharges[0].warming === 1);
                    assert(data.facilitiesCharges[0].chickPrice === 1);
                    facilitiesChargesCreated.push(data.facilitiesCharges[0].id);
                })
                .catch((err) => {
                    console.log(err);
                    assert(false);
                });
        });

        it('should save a production object containing a facility Object which contains a facilityCharges object', () => {
            let facilityCharges = new FacilityCharges({id: 'uid9843', name:'toto', warming:1, chickPrice:1, vetPrice:1,
                contributions:1, disinfection:1, commodities:1,
                litter:1, catching:1, insurances:1});

            facilityCharges._attachments = {
                'foo.txt': {
                    content_type: 'image/png',
                    data: randomBuffer(ATTACHMENT_SIZE)
                }
            };

            let facility = new Facility({id: 3, size: 3222, type: 'cabane', facilityCharges: 'uid9843'});
            let production = new Production({id: 3, department: 'toto', name:'toto', chickNb:1, avgWeight:1, age:1, breedingPerYear:1,
                consumptionIndex:1, mortalityPercent:1,
                vaccinesPrice:1, foodPrice:1, classedPrice:1, declassedPrice:1, breedingDeclassedPercent:1, restraintPercent:1,
                chickPurchaseReduction:1, facility:3});

            return databaseService.save('facilityCharges', facilityCharges)
                .then((data) => {
                    assert(data.facilitiesCharges[0].warming === 1);
                    assert(data.facilitiesCharges[0].chickPrice === 1);
                    assert(Object.keys(data.facilitiesCharges[0]._attachments).length >  0);
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

    describe('database sync process test', () => {
        it('should replicate to remote server', () => {
            const WHO_REPLICATE = 'local';

            let localDbTotalRows;
            let remoteDbTotalRowsAfterReplication;

            return databaseService.db.allDocs()
                .then((data) => {
                    localDbTotalRows = data.total_rows;
                    console.log("local db total docs before rep: ", localDbTotalRows);
                })
                .then(() => databaseService.replicate(WHO_REPLICATE).then(() => { console.log("Replication done.");}))
                .then(() => databaseService.remoteDb.allDocs())
                .then((data) => {
                    remoteDbTotalRowsAfterReplication = data.total_rows;
                    console.log("remote db total docs after rep: ", remoteDbTotalRowsAfterReplication);
                    assert(localDbTotalRows === remoteDbTotalRowsAfterReplication);
                });
        }).timeout(SYNC_TIMEOUT);

        it('should replicate from remote server', () => {
            const WHO_REPLICATE = 'server';

            let remoteDbTotalRows;
            let localDbTotalRowsAfterReplication;

            return databaseService.remoteDb.allDocs()
                .then((data) => {
                    remoteDbTotalRows = data.total_rows;
                    console.log("Remote db total docs before rep: ", remoteDbTotalRows);
                })
                .then(() => databaseService.destroy())
                .then(() => databaseService.init())
                .then(() => databaseService.replicate(WHO_REPLICATE).then(() => { console.log("Replication done.");}))
                .then(() => databaseService.remoteDb.allDocs())
                .then((data) => {
                    localDbTotalRowsAfterReplication = data.total_rows;
                    console.log("Local db total docs after rep: ", localDbTotalRowsAfterReplication);
                    assert(localDbTotalRowsAfterReplication === remoteDbTotalRows)
                });
        }).timeout(SYNC_TIMEOUT);

        it('should sync with remote server after some doc additions', () => {
            let localDbTotalRows;

            return addXDocInDb(200, 5000, databaseService)
                .then(() => databaseService.db.allDocs())
                .then((data) => { localDbTotalRows = data.total_rows; })
                .then(() => databaseService.db.sync(databaseService.remoteDb))
                .then(() => databaseService.remoteDb.allDocs())
                .then((data) => {
                    console.log(`State after sync: local docs ${localDbTotalRows}, remote docs: ${data.total_rows}`);
                    assert(localDbTotalRows === data.total_rows) 
                });
        }).timeout(SYNC_TIMEOUT);
    });

    // *************  WRITE NEW TEST ABOVE TO THIS LINE **********************///
    // ***********  LAST TEST DESTROY THE DB *********************///

    describe('database empty', () => {
        it('should empty the database', () => {
            return databaseService.db.allDocs()
                .then((data) => {
                    assert(data.total_rows > 0)
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

function randomBuffer(size) {
    let buff = new Buffer(size);
    for (let i = 0; i < size; i++) {
        buff.write(
            String.fromCharCode(Math.floor(65535 * Math.random())),
            i, 1, 'binary');
    }
    return buff.toString('base64');
}


function createDocWithAttachment(databaseService, id) {

    let facilityCharges = new FacilityCharges({id: id, name:'toto', warming:1, chickPrice:1, vetPrice:1,
        contributions:1, disinfection:1, commodities:1,
        litter:1, catching:1, insurances:1});

    if (id%3 ===0) {
        facilityCharges._attachments = {
            'foo.txt': {
                content_type: 'image/png',
                data: randomBuffer(ATTACHMENT_SIZE)
            }
        };
    }

    return databaseService.save('facilityCharges', facilityCharges);
}

function addXDocInDb(docNumber, from, databaseService) {
    let calls = [];

    for(let j = from ; j < docNumber; j++) {
        calls.push(createDocWithAttachment(databaseService, j));
    }

    return Promise.all(calls);
}