const {app, BrowserWindow, Menu, contextBridge} = require('electron');
const path = require('path');


const isMac = process.platform === "darwin";
const isDev = true;

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        title: 'myFirst Electron app',
        width: isDev ? 1000 : 500,
        height: 600,
        webPreferences: {
            nodeIntegration:true,
            preload: path.join(__dirname, './preLoad.js')
        }
    });


    if (isDev) {
        mainWindow.webContents.openDevTools();
    }

    mainWindow.loadFile(path.join(__dirname, './renderer/index.html'));
}

const createAboutWindow = () => {
    const aboutWindow = new BrowserWindow({
        title: 'About',
        width: 300,
        height: 300
    });

    aboutWindow.setMenuBarVisibility(false);


    aboutWindow.loadFile(path.join(__dirname, './renderer/about.html'));
}

const menu = [
    ...(isMac
        ? [
            {
                label: app.name,
                submenu: [
                    {
                        label: 'About',
                        click: createAboutWindow
                    },
                ],
            },
        ]
        : []),
    {
        role: 'fileMenu',
    },
    ...(!isMac
        ? [
            {
                label: 'Help',
                submenu: [
                    {
                        label: 'About',
                        click: createAboutWindow
                    },
                ],
            },
        ]
        : []),
];

app.whenReady().then(() => {
    createWindow();

    const menuBar = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(menuBar);

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