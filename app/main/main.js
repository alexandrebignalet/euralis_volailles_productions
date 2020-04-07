import path from 'path';
import url from 'url';

const log = require('electron-log');
const electron = require('electron');
const { autoUpdater } = require('electron-updater');

autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

app.on('ready', function()  {
    autoUpdater.checkForUpdatesAndNotify();
});

function createWindow () {

    // Create the browser window.
    mainWindow = new BrowserWindow({width: 800, height: 600, webPreferences: { nodeIntegration: true }});

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.maximize();

    // Open the DevTools.
    if(process.env.NODE_ENV === 'development') {
        mainWindow.openDevTools({detach: true});
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();
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
