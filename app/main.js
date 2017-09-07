const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

const electron = require('electron');
const {shell} = require('electron');

const fs = require('fs');
const os = require('os');
const ipc = electron.ipcMain;


// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

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
    if(process.env.NODE_ENV === 'dev') {
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
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    app.quit();
});

ipc.on('print-to-pdf', (event) => {
    const pdfPath = path.join(os.tmpdir(), 'print.pdf');
    console.log(pdfPath);
    const win = BrowserWindow.fromWebContents(event.sender);

    win.webContents.printToPDF({}, (err, data) => {
        if(err) return console.log(err.message);

        fs.writeFile(pdfPath, data, (err) => {
            if(err) return console.log(err.message);
            shell.openExternal('file://' + pdfPath);
            event.sender.send('wrote-pdf', pdfPath);
        })
    })
});

app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
        createWindow();
    }
});