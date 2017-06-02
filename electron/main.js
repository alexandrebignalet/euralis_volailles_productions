const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const url = require('url');

const electron = require('electron');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const storageDir = __dirname + '/database/data-files';
const userDataPath = (electron.app || electron.remote.app).getPath('userData') + '/data-files';

ipcMain.on('async', (event, arg) => {
    // Print 1
    console.log(arg);
    // Reply on async message from renderer process
    event.sender.send('async-reply', 2);
});

function createWindow () {

    // if (!fs.existsSync(userDataPath)){
    //     fs.mkdirSync(userDataPath);
    //     initStorageFile();
    // }
    // Create the browser window.
    win = new BrowserWindow({width: 800, height: 600, webPreferences: { nodeIntegration: true }});

    // and load the index.html of the app.
    win.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
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

app.on('toto', (event,data) => {
    console.log(event, data);
});

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