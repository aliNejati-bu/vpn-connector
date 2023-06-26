const ssh = document.getElementById('ssh');
const warpBtn = document.getElementById('warp');
const msgBox = document.getElementById('msg-box');

async function setup() {
    const isConnectToWarp = await warp.status();
    if (isConnectToWarp === 1) {
        warpBtn.innerText = 'Disconnect Warp';
        msgBox.innerText = 'Connected to Warp';
        msgBox.classList.add('is-success');
        msgBox.classList.remove('is-danger');
        warpBtn.classList.remove('is-loading');
    } else if(isConnectToWarp === 0) {
        warpBtn.innerText = 'Connect To Warp';
        msgBox.innerText = 'Disconnect Warp';
        msgBox.classList.remove('is-success');
        msgBox.classList.add('is-danger');
        warpBtn.classList.remove('is-loading');
    }else {
        warpBtn.classList.add('is-loading');
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
    if (isConnectToWarp === 1) {
        const NOTIFICATION_TITLE = 'Warp Connected'
        const NOTIFICATION_BODY = 'Now your internet is safe.'

        new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
            .onclick = () => {
            console.log('clicked')
        }
        warpBtn.innerText = 'Disconnect Warp';
        msgBox.innerText = 'Connected to Warp';
        msgBox.classList.add('is-success');
        msgBox.classList.remove('is-danger');
        warpBtn.classList.remove('is-loading');
    } else if (isConnectToWarp === 0) {
        const NOTIFICATION_TITLE = 'Warp disconnected'
        const NOTIFICATION_BODY = 'Now your internet is not safe.'

        new window.Notification(NOTIFICATION_TITLE, {body: NOTIFICATION_BODY})
            .onclick = () => {
            console.log('clicked')
        }
        warpBtn.innerText = 'Connect To Warp';
        msgBox.innerText = 'Disconnect Warp';
        msgBox.classList.remove('is-success');
        msgBox.classList.add('is-danger');
        warpBtn.classList.remove('is-loading');
    }else {
        warpBtn.classList.add('is-loading');
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




