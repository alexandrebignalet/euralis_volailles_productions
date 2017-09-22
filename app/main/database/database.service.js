// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

const path = require('path');
const config = require('./electron.config.js');
const MemoryStream = require('memorystream');
const replicationStream = require('pouchdb-replication-stream');
const PouchDB = require('pouchdb');
PouchDB.plugin(require('relational-pouch'));
// const load = require('pouchdb-load');
// PouchDB.plugin({ loadIt: load.load });
PouchDB.plugin(replicationStream.plugin);
PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);


const databaseSchema = [
    {
        singular: 'video',
        plural: 'videos'
    },
    {
        singular: 'production',
        plural: 'productions',
        relations: {
            'facility': { belongsTo: 'facility' }
        }
    },
    {
        singular: 'facility',
        plural: 'facilities',
        relations: {
            'facilityCharges': { belongsTo: 'facilityCharges'},
            'investments': { hasMany: 'investment' }
        }
    },
    {
        singular: 'facilityCharges',
        plural: 'facilitiesCharges'
    },
    {
        singular: 'investment',
        plural: 'investments'
    }
];

/**
 * This class is used to create the local database if it does not exist yet.
 * And the schema of THIS app.
 * Also provide an API in order to manipulate data.
 */
class DatabaseService {
    constructor(env) {
        this.env = env;
        if(this.env === undefined) this.env = 'test';

        this.dbOpts = { auto_compaction: true};
        this.remoteDbOpts = {
            ajax: { timeout: 10000 },
            auth: {
                username: 'admin',
                password: 'c907f253966a6676d7c54232e'
            }
        };

        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName, this.dbOpts);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName, this.remoteDbOpts);
        this.db.setSchema(databaseSchema);
    }

    init() {
        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName, this.dbOpts);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName, this.remoteDbOpts);
        this.db.setSchema(databaseSchema);
    }

    /**
     *
     * @param entityName
     * @param object
     * @return Promise
     */
    save(entityName, object) {
        return this.db.rel.save(entityName, object);
    }

    find(entityName, id) {
        return this.db.rel.find(entityName, id)
            .then((data) => {
                let objects = data[Object.keys(data)[0]];

                let objectsWithAttachmentsPromises = [];

                for(let i = 0; i < objects.length; i++) {
                    if (objects[i].attachments) {
                        let attachmentsPromises = [];

                        Object.keys(objects[i].attachments).forEach((key) => {
                            attachmentsPromises.push(
                                this.db.rel.getAttachment(entityName, objects[i].id, key)
                                    .then((attachment) => {
                                        objects[i].attachments[key].data = attachment;
                                        return objects[i];
                                    })
                            );
                        });

                        objectsWithAttachmentsPromises.push(Promise.all(attachmentsPromises).then((data) => data[0]));
                    }
                }

                return Promise.all(objectsWithAttachmentsPromises);
            });
    }

    remove(entityName, object) {
        return this.db.rel.del(entityName, object).then(() => this.compact());
    }

    putAttachment({entityName, obj, name, base64, contentType}) {
        return this.db.rel.putAttachment(entityName, obj, name, base64, contentType);
    }
    
    addAttachments(entityName, obj, files) {

        if (files.length === 0 || !files.reduce((acc, item) =>  typeof item.name == 'string', true) ) return obj;

        return files.reduce((p, file) => {
            return p.then(() => this.db.rel.putAttachment(entityName, obj, file.name, file, file.type));
        }, Promise.resolve());
    }

    // it will empty the db, because we are using WebSql adapter
    destroy() {
        return this.db.info()
            .then((data) => this.db.destroy())
            .catch(() => { return {ok: true}; });
    }

    compact() {
        return this.db.compact()
            .then((info) => {
                return info;
            }).catch((err) => {
                return err;
            });
    }

    sync() {
        return this.db.sync(this.remoteDb)
            .then((data) => {
                console.log(`Synchronisation SUCCESS: ${data}`);
                return data;
            })
            .catch((err) => {
                console.log(`Synchronisation ERROR: ${err}`);
                return err;
            })
    }

    replicate(who) {
        let stream = new MemoryStream();

        let from = this.db;
        let to = this.remoteDb;

        if(who === 'server') {
            let aux = from;
            from = to;
            to = aux;
        }

        console.log(`replication from ${from.name} to ${to.name}`);

        return Promise.all([
            from.dump(stream),
            to.load(stream)
        ])
            .then(() => {
                console.log(`Replication from ${who} SUCCESS !`);
            })
            .catch((err) => {
                console.log(`Replication from ${who} FAIL !`, err);
            })
    }
}

module.exports = new DatabaseService(process.env.NODE_ENV);