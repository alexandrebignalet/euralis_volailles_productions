import {assert}  from 'chai';
import {PouchDbService} from '../../renderer/database/pouchdb.service';
import {addXDocInDb} from '../database/utils';

const SYNC_TIMEOUT = 100000000;
const INDEX_NUMBER = 1;
const BASE_DOC_NUMBER = 10;

describe('PouchCouchReplicationTest', () => {
    let pouchDbService = new PouchDbService('test', { name: 'euralis_volailles_db-', remoteUrl: 'http://46.101.36.6:5984/' });
    jasmine.DEFAULT_TIMEOUT_INTERVAL = SYNC_TIMEOUT;
    
    beforeAll(function(done) {
        pouchDbService.init()
            .then(() => addXDocInDb(BASE_DOC_NUMBER, 0, pouchDbService) )
            .then(() => done());
    });

    afterAll(function(done) {
        pouchDbService.destroy()
            .then(() => pouchDbService.remoteDb.destroy())
            .then(() => pouchDbService.init())
            .catch(() => pouchDbService.init())
            .then(() => done());
    });

    describe('constructor and init tests', () => {

        it(`should contain ${BASE_DOC_NUMBER} docs`, () => {
            return pouchDbService.db.allDocs()
                .then((data) => {
                    assert(data.rows.length === BASE_DOC_NUMBER + INDEX_NUMBER);
                })
        });
    });

    describe('database sync process test', () => {
        it('should replicate to remote server', () => {

            let localDbTotalRows;
            let remoteDbTotalRowsAfterReplication;

            return pouchDbService.db.allDocs()
                .then((data) => {
                    localDbTotalRows = data.rows.length;
                    console.log("local db total docs before rep: ", localDbTotalRows);
                })
                .then(() => new Promise((resolve, reject) => {
                    pouchDbService.db.replicate.to(pouchDbService.remoteDb)
                        .on('complete', () => {
                            resolve();
                        })
                        .on('paused', (info) => {
                            if(!info) resolve();
                        })
                        .on('error', () => {
                            reject();
                        });
                }))
                .then(() => pouchDbService.remoteDb.allDocs())
                .then((data) => {
                    remoteDbTotalRowsAfterReplication = data.rows.length;
                    console.log("remote db total docs after rep: ", remoteDbTotalRowsAfterReplication);
                    assert(localDbTotalRows === remoteDbTotalRowsAfterReplication);
                });
        }, SYNC_TIMEOUT);

        it('should replicate from remote server', () => {

            let remoteDbTotalRows;
            let localDbTotalRowsAfterReplication;

            return pouchDbService.remoteDb.allDocs()
                .then((data) => {
                    remoteDbTotalRows = data.rows.length;
                    console.log("Remote db total docs before rep: ", remoteDbTotalRows);
                })
                .then(() => pouchDbService.db.destroy())
                .then(() => pouchDbService.init())
                .then(() => pouchDbService.db.allDocs())
                .then((data) => assert.equal(data.rows.length, INDEX_NUMBER))
                .then(() => pouchDbService.db.replicate.from(pouchDbService.remoteDb))
                .then(() => pouchDbService.db.allDocs())
                .then((data) => {
                    localDbTotalRowsAfterReplication = data.rows.length;
                    console.log("Local db total docs after rep: ", localDbTotalRowsAfterReplication);
                    assert(localDbTotalRowsAfterReplication === remoteDbTotalRows)
                });
        }, SYNC_TIMEOUT);

        it('should sync with remote server after some doc additions', () => {
            const ADDED_DOCS = 200;
            let localDbTotalRows;

            return addXDocInDb(ADDED_DOCS, 5000, pouchDbService)
                .then((data) => pouchDbService.db.allDocs())
                .then((data) => {
                    localDbTotalRows = data.rows.length;
                    assert.equal(localDbTotalRows, BASE_DOC_NUMBER + INDEX_NUMBER + ADDED_DOCS);
                })
                .then(() => new Promise((resolve, reject) => {
                    pouchDbService.sync()
                        .on('complete', () => {
                            resolve();
                        })
                        .on('paused', (info) => {
                            pouchDbService.remoteDb.info()
                                .then((data) => {
                                    if(data.doc_count === localDbTotalRows) {
                                        resolve();
                                    }
                                })
                        })
                        .on('error', (err) => {
                            reject();
                        });
                }))
                .then(() => pouchDbService.remoteDb.allDocs())
                .then((data) => {
                    console.log(`State after sync: local docs ${localDbTotalRows}, remote docs: ${data.rows.length}`);
                    assert(localDbTotalRows === data.rows.length)
                });
        }, SYNC_TIMEOUT);
    });
});