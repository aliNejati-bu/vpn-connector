const {contextBridge} = require('electron')
const {runCommand} = require("./helpers");


contextBridge.exposeInMainWorld('warp', {
    status: () => {
        return new Promise((resolve, reject) => {

            runCommand('warp-cli', ['status'],
                (data) => {
                    console.log(data);
                    if (data.includes(' Connected')) {
                        resolve(1);
                    } else if(data.includes('Connecting')) {
                        resolve(-1);
                    }else {
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
