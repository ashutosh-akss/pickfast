const constants = require('../constants');
const { arango } = constants;
module.exports = {
    HTTP: {
        PORT: 3000,
    },
    MQTT: {
        PORT: 1883,
    },
    ARANGODB: {
        PORT: 8529,
        SERVER: 'server.pickfast.in',
        DATABASE: 'pickfast',
        USERNAME: "",
        PASSWORD: "",
        COLLECTIONS: {
            users: {
                type: arango.DOCUMENT,
            },
            devices: {
                type: arango.DOCUMENT,
            },
            device_config: {
                type: arango.DOCUMENT,
            },
            stores: {
                type: arango.DOCUMENT,
            },
            belongs_to: {
                type: arango.EDGE,
            },
            works_at: {
                type: arango.EDGE,
            },
        }
    },
    MONGODB: {
        PORT: 27017,
    }
};