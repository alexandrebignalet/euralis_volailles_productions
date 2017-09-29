import {assert}  from 'chai';
import DatabaseService from '../../app/main/database/database.service.js';
import {FacilityCharges} from '../../app/renderer/components/management/facility_charges/facility_charges';

global.navigator = {
    userAgent: 'node.js'
};

const ATTACHMENT_SIZE = 500000;
const SYNC_TIMEOUT = 100000000;
const INDEX_NUMBER = 1;
const BASE_DOC_NUMBER = 100000;

describe('DatabaseServiceTest', () => {
    let databaseService = DatabaseService;

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
                    assert(data.total_rows === BASE_DOC_NUMBER + INDEX_NUMBER);
                })
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
        //
        // it('should replicate from remote server', () => {
        //     const WHO_REPLICATE = 'server';
        //
        //     let remoteDbTotalRows;
        //     let localDbTotalRowsAfterReplication;
        //
        //     return databaseService.remoteDb.allDocs()
        //         .then((data) => {
        //             remoteDbTotalRows = data.total_rows;
        //             console.log("Remote db total docs before rep: ", remoteDbTotalRows);
        //         })
        //         .then(() => databaseService.destroy())
        //         .then(() => databaseService.init())
        //         .then(() => databaseService.replicate(WHO_REPLICATE).then(() => { console.log("Replication done.");}))
        //         .then(() => databaseService.remoteDb.allDocs())
        //         .then((data) => {
        //             localDbTotalRowsAfterReplication = data.total_rows;
        //             console.log("Local db total docs after rep: ", localDbTotalRowsAfterReplication);
        //             assert(localDbTotalRowsAfterReplication === remoteDbTotalRows)
        //         });
        // }).timeout(SYNC_TIMEOUT);

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
    let facilityCharges = new FacilityCharges({id: id+'', name:'toto', warming:1, chickPrice:1, vetPrice:1,
        contributions:1, disinfection:1, commodities:1,
        litter:1, catching:1, insurances:1});

    // const attachment = {
    //     entityName: 'facilityCharges',
    //     name:'foo.png',
    //     base64: randomBuffer(ATTACHMENT_SIZE),
    //     contentType:'image/png'
    // };

    // if (id%3 ===0) {
    //
    //     if (id%6 === 0) {
    //         return databaseService.save('facilityCharges', facilityCharges)
    //             .then(data => {
    //                 attachment.obj = data.facilitiesCharges[0];
    //                 return databaseService.putAttachment(attachment);
    //             })
    //             .then(data => {
    //                 attachment.obj = data.facilitiesCharges[0];
    //                 attachment.name = 'foo2.png';
    //                 return databaseService.putAttachment(attachment);
    //             });
    //     }
    //
    //     return databaseService.save('facilityCharges', facilityCharges)
    //         .then(data => {
    //             attachment.obj = data.facilitiesCharges[0];
    //             return databaseService.putAttachment(attachment);
    //         });
    // }

    return databaseService.save('facilityCharges', facilityCharges);
}

function addXDocInDb(docNumber, from, databaseService) {
    let calls = [];

    for(let j = from ; j < docNumber; j++) {
        calls.push(createDocWithAttachment(databaseService, j));
    }

    return Promise.all(calls);
}