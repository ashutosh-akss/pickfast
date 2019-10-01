const ArangoDb = require('./arangodb');
const ArangoModel = require('./arangoModel');

class Devices extends ArangoModel {

    constructor(collection) {
        super(collection);
    }

    async currentOwner() {
        let result = [];
        const queryResult = await ArangoDb.query(`for v in outbound "devices/3C:71:BF:FE:6E:B0" graph "OwnsDevice" return v`);
        while (queryResult.hasNext()) {
            result.push(await queryResult.next());
        }
        return result;
    }
}

module.exports = new Devices(ArangoDb.devices);