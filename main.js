const {app, BrowserWindow} = require('electron');
const path = require('path');

const isMac = process.platform === "darwin";

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'myFirst Electron app',
        width: 500,
        height: 600
    });

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on('window-all-closed', () => {
        if (!isMac) {
            app.quit();
        }
    });
});