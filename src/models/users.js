const ArangoDb = require('./arangodb');
const ArangoModel = require('./arangoModel');

class Users extends ArangoModel {
    
    constructor(collection){
        super(collection);
    }
}

module.exports = new Users(ArangoDb.users);