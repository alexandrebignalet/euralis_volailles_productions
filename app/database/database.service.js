// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}
const ipc = require('electron').ipcRenderer;
const config = require('./electron.config.js');
// const MemoryStream = require('memorystream');
// const replicationStream = require('pouchdb-replication-stream');
const PouchDB = require('pouchdb-browser');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));
PouchDB.plugin(require('relational-pouch'));
// const load = require('pouchdb-load');
// PouchDB.plugin({ loadIt: load.load });
// PouchDB.plugin(replicationStream.plugin);
// PouchDB.adapter('writableStream', replicationStream.adapters.writableStream);


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
        this.dbName = config.db.name + this.env;
        this.db = new PouchDB(this.dbName);
        this.remoteDb = new PouchDB(config.db.remoteUrl + this.dbName);
        this.db.setSchema(databaseSchema);
    }

    init() {
        this.db = new PouchDB(config.db.name + this.env);
        this.remoteDb = new PouchDB(config.db.remoteUrl + config.db.name);
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

    removeAttachment(entityName, obj, name) {
        return this.db.rel.removeAttachment(entityName, obj, name);
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

    load() {
        // let dumpFile = require('../../dump-dev-db.txt');
        //
        // return this.db.loadIt('./dump-dev-db.txt').then((d) => {
        //     console.log("LOADING OVER");
        //     return d;
        // }).catch( (err) => {
        //     console.log("LOADING ERROR: ", err);
        //     return err;
        // });
    }

    replicate(){
        console.log('channel replicate created !');
        ipc.on('replicate', (e,d) => {
            console.log(d);
            ipc.removeAllListeners('replicate');
        });

        ipc.send('db', {db: this.db, remote: this.remoteDb});
    }

    sync() {
        return this.remoteDb.info()
                .then(() => new Promise((resolve, reject) => {
                        this.db.sync(this.remoteDb)
                            .on('complete', () => {
                                console.log("complete ");
                                resolve({ok: true});
                            })
                            .on('change', (change) => {
                                console.log("change ", change);
                            })
                            .on('paused', (info) => {
                                console.log("paused ", info);
                            })
                            .on('active', (info) => {
                                console.log("active ", info);
                            })
                            .on('error', (err) => {
                                console.log(err, err.result);
                                reject({ok: false});
                            });
                    }))
                .catch(() => { return {ok: false}; });
    }
}

module.exports = new DatabaseService(process.env.NODE_ENV);