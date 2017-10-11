import {assert}  from 'chai';
import {PouchDbService} from '../../app/renderer/database/pouchdb.service';
import {addXDocInDb} from './utils.spec';

const SYNC_TIMEOUT = 100000000;
const INDEX_NUMBER = 1;
const BASE_DOC_NUMBER = 10;

describe('PouchCouchReplicationTest', () => {
    let pouchDbService = new PouchDbService('test', { name: 'euralis_volailles_db-', remoteUrl: 'http://217.182.169.232:5984/' });

    before(function () {
        this.timeout(SYNC_TIMEOUT);
        return addXDocInDb(BASE_DOC_NUMBER, 0, pouchDbService);
    });

    after(function() {
        this.timeout(SYNC_TIMEOUT);
        return pouchDbService.destroy()
            .then(() => pouchDbService.remoteDb.destroy())
            .then(() => pouchDbService.init())
            .catch(() => pouchDbService.init());
    });

    describe('constructor and init tests', () => {
        it('should be a singleton', () => {
            assert.isNotNull(pouchDbService);
        });

        it(`should contain ${BASE_DOC_NUMBER} docs`, () => {
            return pouchDbService.db.allDocs()
                .then((data) => {
                    assert(data.rows.length === BASE_DOC_NUMBER + INDEX_NUMBER);
                })
        });
    });

    describe('database sync process test', () => {
        it('should replicate to remote server', () => {
            const WHO_REPLICATE = 'local';

            let localDbTotalRows;
            let remoteDbTotalRowsAfterReplication;

            return pouchDbService.db.allDocs()
                .then((data) => {
                    localDbTotalRows = data.rows.length;
                    console.log("local db total docs before rep: ", localDbTotalRows);
                })
                .then(() => new Promise((resolve, reject) => {
                    pouchDbService.replicate(WHO_REPLICATE)
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
        }).timeout(SYNC_TIMEOUT);

        it('should replicate from remote server', () => {
            const WHO_REPLICATE = 'server';

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
        }).timeout(SYNC_TIMEOUT);

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
                            console.log("paused ", info);
                            if(!info) resolve();
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
        }).timeout(SYNC_TIMEOUT);
    });
});