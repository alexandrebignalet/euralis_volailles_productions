const path = require('path');
const fs = require('fs');
const electron = require('electron');


const userDataPath = (electron.app || electron.remote.app).getPath('userData') + '/data-files';

class StorageService {
    constructor(fileName) {

        this.path = path.join(userDataPath, fileName + '.json');
        this.data = parseDataFile(this.path);
        this.lastId = Math.max.apply(null, this.data.map(item => item.id));
    }

    getAll() {
        return this.data;
    }

    get(id) {
        return this.data[this.data.ObjectsIndexOf('id', id)];
    }

    create(item) {
        return new Promise((resolve) => {
            item.id = ++this.lastId;
            this.data.push(item);
            fs.writeFileSync(this.path, JSON.stringify(this.data));
            return resolve(item);
        });
    }

    update(updatedItem) {
        
        return new Promise((resolve) => {
            this.data[this.data.ObjectsIndexOf('id', updatedItem.id)] = Object.assign({}, updatedItem);
            fs.writeFileSync(this.path, JSON.stringify(this.data));
            return resolve();
        });
    }

    remove(id) {
        console.log("remove ", id);
        return new Promise((resolve) => {
            this.data.splice(this.data.ObjectsIndexOf('id', id), 1);
            fs.writeFileSync(this.path, JSON.stringify(this.data));
            return resolve();
        });
    }
}

/**
 *
 * @param prop
 * @param value
 * @return int
 */
Array.prototype.ObjectsIndexOf = function(prop, value) {

    for (let i = 0; i < this.length; i++) {
        if (this[i].hasOwnProperty(prop)) {
            if (this[i][prop] === value) {
                return i;
            }
        }
    }
};

function parseDataFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath));
    } catch(error) {
        return null;
    }
}

// expose the class
module.exports = StorageService;