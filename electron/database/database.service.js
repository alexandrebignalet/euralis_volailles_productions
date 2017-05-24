// Needed for sync between pouch and couch
if (typeof btoa === 'undefined') {
    global.btoa = function (str) {
        return new Buffer(str).toString('base64');
    };
}

const config = require('../electron.config');
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
        this.dbName = config.db.name;
        switch(process.env.NODE_ENV) {
            case 'development':
                this.db = new PouchDB(config.db.remoteUrl + this.dbName);
                break;
            case 'test':
                this.db = new PouchDB(this.dbName, { skip_setup: true });
                break;
            default:
                this.db = new PouchDB(this.dbName, { skip_setup: true });
                break;
        }
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
        return this.db.rel.del(entityName, id);
    }

    // it will empty the db, because we are using WebSql adapter
    destroy() {
        return this.db.destroy();
    }

    sync() {
        return this.db.sync(this.remoteDb);
    }
}

module.exports = DatabaseService;