const {contextBridge} = require('electron')
const {runCommand} = require("./helpers");

let last = 0;
contextBridge.exposeInMainWorld('warp', {
    status: () => {
        return new Promise((resolve, reject) => {

            runCommand('warp-cli', ['status'],
                (data) => {
                    if (data === 'Success') {
                        resolve(last);
                    }
                    if (data.includes('Connecting')) {
                        last = -1;
                        resolve(-1);
                    } else if (data.includes('Connected')) {
                        last = 1;
                        resolve(1);
                    } else {
                        last = 0;
                        resolve(0);
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
