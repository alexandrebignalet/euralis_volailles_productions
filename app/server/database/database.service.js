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

        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName);
        this.db.setSchema(databaseSchema);
    }

    init() {
        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName);
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
        return this.db.rel.find(entityName, id);
    }

    remove(entityName, id) {
        return this.db.rel.del(entityName, id)
            .then(this.compact());
    }
    
    addAttachments(entityName, obj, files) {

        if (files.length === 0 || !files.reduce((acc, item) =>  typeof item.name == 'string', true) ) return obj;

        return files.reduce((p, file) => {
            return p.then(() => this.db.rel.putAttachment(entityName, obj, file.name, file, file.type));
        }, Promise.resolve());
    }

    getAttachments(entityName, id) {
        return this.find(entityName, id)
            .then((data) => {
                const keys = Object.keys(data);
                const entity = data[keys[0]][0];

                if (!entity.attachments) return [];

                let findAttachmentsPromises = [];
                const attachmentsKeys = Object.keys(entity.attachments);

                attachmentsKeys.forEach((key) => {
                    findAttachmentsPromises.push(this.db.rel.getAttachment(entityName, entity.id, key));
                });

                return Promise.all(findAttachmentsPromises)
                    .then((images) => {
                        images.forEach((img, index) => {
                            img.name = attachmentsKeys[index];
                        });
                        return images;
                    });
            })
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