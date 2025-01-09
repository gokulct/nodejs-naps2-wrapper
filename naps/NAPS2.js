const { spawn } = require('child_process');
const path = require('path');
const { ScanBuilder } = require('./ScanBuilder');

class NAPS2 {
    constructor(naps2ConsolePath) {
        this.executablePath = naps2ConsolePath || path.join(__dirname,'..', 'lib', 'NAPS2.Console.exe');
    }

    async scan(outputPath) {
        return this.executeCommand(['-o', outputPath]);
    }

    async scanWithProfile(profileName, outputPath) {
        return this.executeCommand(['-o', outputPath, '--profile', profileName]);
    }

    async autoScan(outputPath) {
        return this.executeCommand(['autoscan', outputPath]);
    }

    async listDevices(driver) {
        const validDrivers = ['twain', 'wia', 'sane', 'escl', 'apple'];
        if (!validDrivers.includes(driver.toLowerCase())) {
            throw new Error('Invalid driver specified');
        }

        const result = await this.executeCommand(['--listdevices', '--driver', driver.toLowerCase()]);
        const devices = result.output
            .split('\n')
            .filter(line => line && !line.toLowerCase().includes('qt:'))
            .map(deviceName => new Device(deviceName.replaceAll('\r',''), driver));
        return devices;
    }

    async executeCommand(args) {
        return new Promise((resolve, reject) => {
            const sanitizedArgs = args.map(arg => arg.toString().replaceAll('\r', '').replaceAll('\n', '').replace(/\\/g, '\\\\'));
            console.log(sanitizedArgs);
            const process = spawn(this.executablePath, sanitizedArgs);
            
            let output = '';
            let errorOutput = '';

            process.stdout.on('data', (data) => {
                output += data.toString();
            });

            process.stderr.on('data', (data) => {
                errorOutput += data.toString();
            });

            process.on('close', (exitCode) => {
                if (output.includes('No devices') || 
                    output.includes('ERROR(S):') || 
                    output.includes('File already exists')) {
                    reject(new ScanException(output));
                }
                resolve({ exitCode, output });
            });

            process.on('error', (err) => {
                reject(new Error(`Failed to start process: ${err.message}`));
            });
        });
    }

    createScanBuilder() {
        return new ScanBuilder(this);
    }
}

class Device {
    constructor(name, driver) {
        this.name = name;
        this.driver = driver;
    }

    getName() {
        return this.name;
    }

    getDriver() {
        return this.driver;
    }
}

class ScanException extends Error {
    constructor(message) {
        super(message);
        this.name = 'ScanException';
    }
}

module.exports = NAPS2;