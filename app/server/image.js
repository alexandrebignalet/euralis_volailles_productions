const electron = require('electron');
const path = require('path');


const app = electron.app || electron.remote.app;
const storePath = app.getPath('userData');
const imageDirectoryPath = path.join(storePath, 'images');

class Image {
    constructor(displayName) {
        this.file = null;
        this.displayName = displayName;
    }

    setFile(file, fileName) {
        this.file = file;
        this.fileName = fileName;
        return this;
    }

    getFileName(){
        return this.fileName;
    }

    getFullPath() {
        return path.join(imageDirectoryPath, this.fileName);
    }

    transformToPouchFormat() {
        return {
            fileName: this.fileName,
            displayName: this.displayName,
            size: this.file.byteLength
        };
    }
}

module.exports= Image;