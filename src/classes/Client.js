const { AoiClient, LoadCommands } = require('aoi.js');
const { Database } = require('aoijs.mysql');
const { MusicClient } = require('aoijs.lavalink');
const { ClientVariables } = require('./Variables.js');
const { ClientStatuses } = require('./Statuses.js');
const { ClientEvents } = require('./Events.js');

exports.DiscordClient = class Client extends AoiClient {
    constructor(options = {}) {
        options.token = options.token || null;
        options.prefix = options.prefix || '<@$clientId>';
        options.disableAoiDB = true;
        options.mysql = options.mysql || {};
        options.mysql.keepAoiDB = false;
        options.mysql.debug = options.debug || false;
        options.music = options.music || {};
        options.music.debug = options.debug || false;
        options.intents = options.intents || [];
        options.events = options.events || [];
        options.suppressAllErrors = options.production ? true : false;
        options.debug = options.debug ? true : false;
        options.allowedMentions = {
            parse: ['users', 'roles'],
            repliedUser: false
        };
        
        super(options);
        new Database(this, options.mysql);
        new MusicClient(this, options.music);
        this.debug = options.debug || false;
        this.config = require('../config.js').Config;
        new ClientVariables(this);
        new ClientStatuses(this);
        new ClientEvents(this);
        this.cmd = Object.assign(this.music.cmds, this.cmd);
        this.loadCommands(options.dir, options.debug);
    }
}
