const { readdirSync, statSync } = require('node:fs');
const { blue, cyan, red } = require('chalk');
const { join } = require('node:path');

exports.Functions = class Functions {
    constructor(client, basePath, debug) {
        if (!basePath || !client) return;

        try {
            const files = readdirSync(basePath);
            for (const file of files) {
                if (file === 'index.js') continue;
                const filePath = join(basePath, file);
                if (!statSync(filePath).isDirectory() && file.endsWith('.js')) {
                    const func = require(filePath);

                    if (debug) this.debug('success', func.name);
                    client.functionManager.createFunction(func);
                } else {
                    new this.constructor(client, filePath, debug);
                }
            }
        } catch (err) {
            this.debug('error', 'ALL', err);
        }
    }

    debug(type, name, err) {
        if (type === 'success') {
            console.log(`[${blue('DEBUG')}] :: Function loaded: ${cyan(`$${name}`)}`);
        } else if (type === 'error') {
            console.log(`[${blue('DEBUG')}] :: Failed to Load: ${red(`$${name}`)}`);
            if (err) console.error(err);
        }
    }
};
