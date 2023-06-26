const child_process = require("child_process");
module.exports = {
    runCommand: (command, args, datafn, errorfn) => {
        const child = child_process.spawn(command, args, {
            encoding: 'utf8',
            shell: true
        });
        // You can also use a variable to save the output for when the script closes later
        child.on('error', (error) => {
            errorfn(error);
        });

        child.stdout.setEncoding('utf8');
        child.stdout.on('data', (data) => {
            //Here is the output
            data = data.toString();
            datafn(data);
        });

        child.stderr.setEncoding('utf8');
        child.stderr.on('data', (data) => {
            errorfn(data);
        });

        child.on('close', (code) => {
            //Here you can get the exit code of the script
            switch (code) {
                case 0:
                    break;
            }

        });
    }
};