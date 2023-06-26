const ssh = document.getElementById('ssh');
const warpBtn = document.getElementById('warp');


async function setup() {
    const isConnectToWarp = await warp.status();
    if (isConnectToWarp) {
        warpBtn.innerText = 'DisConnect Warp';
    } else {
        warpBtn.innerText = 'Connect To Warp';
    }
    warpBtn.addEventListener('click', () => {
        connectDisconnect();
    })
}

let prev = null;

async function updateConnection() {
    const isConnectToWarp = await warp.status();
    if (prev == null) {
        prev = isConnectToWarp;
    }
    if (prev === isConnectToWarp) {
        return;
    }
    prev = isConnectToWarp;
    if (isConnectToWarp) {
        const NOTIFICATION_TITLE = 'Warp Connected'
        const NOTIFICATION_BODY = 'Now your internet is safe.'

        new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
            .onclick = () => {
            console.log('clicked')
        }
        warpBtn.innerText = 'DisConnect Warp';
    } else {
        const NOTIFICATION_TITLE = 'Warp disconnected'
        const NOTIFICATION_BODY = 'Now your internet is not safe.'

        new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
            .onclick = () => {
            console.log('clicked')
        }
        warpBtn.innerText = 'Connect To Warp';
    }
}

async function connectDisconnect() {
    const isConnectToWarp = await warp.status();
    if (isConnectToWarp) {
        await warp.disconnect();
    } else {
        await warp.connect();
    }
    updateConnection();
}

setInterval(updateConnection, 500);

setup();




