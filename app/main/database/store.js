const electron = require('electron');
const path = require('path');
const fs = require('fs');

class Store {
    constructor({directoryName, dataFileName}) {
        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.dirPath = path.join(userDataPath, directoryName);
        this.fileName = dataFileName;
        this.data = Store.parseDataFile(this.dirPath, this.fileName);
    }

    get(key) {
        return this.data[key];
    }

    set(key, val) {
        this.data[key] = val;
        fs.writeFileSync(path.join(this.dirPath, this.fileName), JSON.stringify(this.data));
    }

    static parseDataFile(dirPath, fileName) {

        try {
            return JSON.parse(fs.readFileSync(path.join(dirPath, fileName)));
        } catch(error) {
            fs.mkdir(dirPath, (err) => {if(err !== null) console.log(err); } );
            return {};
        }
    }
}

module.exports = Store;