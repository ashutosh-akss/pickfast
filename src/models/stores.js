const ArangoDb = require('./arangodb');
const ArangoModel = require('./arangoModel');

class Stores extends ArangoModel {
    
    constructor(collection){
        super(collection);
    }
}

module.exports = new Stores(ArangoDb.stores);