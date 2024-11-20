exports.ClientVariables = class Variables {
    constructor(client) {
        this.tables = [];
        this.#variables(client).forEach(vars => {
            if (!this.tables.includes(vars[0])) this.tables.push(vars[0]);
            client.variables(vars[1], vars[0]);
        });
    }

    #variables(client) {
        return [
            ['main', {
                
                prefix: client.config.prefix[0],
                production: client.config.production,

                cmain: client.config.color.main,
                cred: client.config.color.red,
                cblue: client.config.color.blue,
                cgreen: client.config.color.green,
                cyellow: client.config.color.yellow
                
            }],
            ['economy', {
                
                balance: 0,
                bank: 0,
                register: false
                
            }],
            ['music', {
                
                247: false,
                djrole: ''
                
            }]
        ];
    }
};
