const StorageService = require('../storage.service');

class Repository extends StorageService {
    constructor(fileName, clazz){
        super(fileName);
        this.clazz = clazz;
    }

    get(id) { return Reflect.construct(this.clazz, [super.get(id)]); }

    getAll() { return super.getAll().map(item => Reflect.construct(this.clazz, [item])); }
}

module.exports = Repository;