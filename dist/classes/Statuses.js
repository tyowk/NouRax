exports.ClientStatuses = class Statuses {
    constructor(client) {
        this.#statuses(client).forEach(status => {
            client.status(status);
        });
    }

    #statuses(client) {
        return [
            {
                name: 'Get started with /help',
                type: 'Custom',
                time: 30,
                status: 'online'
            },
            {
                name: 'NouJS Development',
                type: 'Custom',
                time: 30,
                status: 'online'
            }
        ];
    }
};
