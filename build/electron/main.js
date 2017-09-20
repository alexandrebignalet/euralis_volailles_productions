'use strict';

var _require = require('electron'),
    app = _require.app,
    BrowserWindow = _require.BrowserWindow;

var path = require('path');
var url = require('url');

var electron = require('electron');

var _require2 = require('electron'),
    shell = _require2.shell;

var fs = require('fs');
var os = require('os');
var ipc = electron.ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
var mainWindow = null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: { nodeIntegration: true } });

    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.resolve(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.maximize();

    // Open the DevTools.
    if (process.env.NODE_ENV === 'dev') {
        mainWindow.openDevTools({ detach: true });
    }

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    app.quit();
});

ipc.on('print-to-pdf', function (event) {
    var pdfPath = path.join(os.tmpdir(), 'print.pdf');
    console.log(pdfPath);
    var win = BrowserWindow.fromWebContents(event.sender);

    win.webContents.printToPDF({}, function (err, data) {
        if (err) return console.log(err.message);

        fs.writeFile(pdfPath, data, function (err) {
            if (err) return console.log(err.message);
            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        });
    });
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});