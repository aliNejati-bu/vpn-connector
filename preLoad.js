const {contextBridge} = require('electron')
const {runCommand} = require("./helpers");


contextBridge.exposeInMainWorld('warp', {
    status: () => {
        return new Promise((resolve, reject) => {

            runCommand('warp-cli', ['status'],
                (data) => {
                    if (data.includes('Disconnected')) {
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                },
                (err) => {
                    reject(err);
                }
            );

        });
    },
    connect: () => {
        return new Promise((resolve, reject) => {
            runCommand('warp-cli', ['connect'],
                (data) => {
                    resolve(true)
                },
                (err) => {
                    resolve(false)
                }
            )
        });
    },
    disconnect: () => {
        return new Promise((resolve, reject) => {
            runCommand('warp-cli', ['disconnect'],
                (data) => {
                    resolve(true)
                },
                (err) => {
                    resolve(false)
                }
            )
        });
    }
})
