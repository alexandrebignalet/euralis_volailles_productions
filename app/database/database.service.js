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
    constructor() {
        this.db = null;
        this.remoteDb = null;
        let obj = DatabaseService.init();
        this.db = obj.db;
        this.remoteDb = obj.remoteDb;
    }

    static init() {
        let db, remoteDb;
        switch(process.env.NODE_ENV) {
            case 'development':
                db = new PouchDB(config.db.remoteUrl + config.db.name);
                break;
            case 'test':
                db = new PouchDB(config.db.name, { skip_setup: true });
                break;
            default:
                db = new PouchDB(config.db.name, { skip_setup: true });
                break;
        }
        remoteDb = new PouchDB(config.db.remoteUrl + config.db.name);
        db.setSchema(databaseSchema);

        return {db, remoteDb};
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
        return db.rel.removeAttachment(entityName, obj, name);
    }

    // it will empty the db, because we are using WebSql adapter
    destroy() {
        return this.db.info()
            .then((data) => this.db.destroy())
            .catch(() => { return {ok: true}; });
    }

    sync() {
        return this.remoteDb.info()
            .then((data) => this.db.sync(this.remoteDb).on('complete', () => {
                return {ok: true};
            }).on('error', function (err) {
                console.log(err, err.result);
                return {ok: false};
            }))
            .catch(() => { return {ok: false}; });
    }
}

module.exports = DatabaseService;