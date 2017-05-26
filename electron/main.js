const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');
const fs = require('fs');
const electron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const storageDir = __dirname + '/database/data-files';
const userDataPath = (electron.app || electron.remote.app).getPath('userData') + '/data-files';

function initStorageFile() {

    const template = path.join(storageDir, 'productions.json');
    const userDataProductionsFilePath = path.join(userDataPath, 'productions.json');

    fs.createReadStream(template)
        .pipe(fs.createWriteStream(userDataProductionsFilePath));
}

function createWindow () {

    // if (!fs.existsSync(userDataPath)){
    //     fs.mkdirSync(userDataPath);
    //     initStorageFile();
    // }
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'webapp/index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.maximize();
    // Open the DevTools.
    // win.webContents.openDevTools();

    // Emitted when the window is closed.
    win.on('closed', () => {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        win = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
        createWindow();
    }
});