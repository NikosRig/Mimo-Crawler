
const fs = require('fs')

const { spawn } = require('child_process');


class Firefox {



    constructor(settings) {

        this.settings = settings;

        this.firefoxBinary = settings.firefoxBinary;
    }




    start = () =>
    {
        if (!fs.existsSync(this.firefoxBinary))
            throw Error('Firefox binary does not exist');

        this.firefox = spawn(this.firefoxBinary);

        this.firefox.stdout.on('data', (data) => {
            console.log(`stdout: ${data}`);
        });

        this.firefox.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        this.firefox.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });

        this.pid = this.firefox.pid;

    }




}





module.exports = Firefox;