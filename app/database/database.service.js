// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

const config = require('./electron.config.js');
const PouchDB = require('pouchdb-browser');
PouchDB.plugin(require('pouchdb-adapter-node-websql'));
PouchDB.plugin(require('relational-pouch'));

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
        this.db = new PouchDB(config.db.name);
        this.remoteDb = new PouchDB(config.db[this.env].remoteUrl + config.db.name);
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
        return this.db.rel.del(entityName, id);
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