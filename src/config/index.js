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
        SERVER: 'localhost',
        DATABASE: 'pickfast',
        USERNAME: process.env.ARANGO_USERNAME,
        PASSWORD: process.env.ARANGO_PASSWORD,
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