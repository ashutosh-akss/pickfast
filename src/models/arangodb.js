const arangojs = require("arangojs");
const constants = require('../constants');
const config = require('../config');
const {Database, aql} = arangojs;
const {arango} = constants;
const { ARANGODB } = config;
const {SERVER, PORT, DATABASE, USERNAME, PASSWORD, COLLECTIONS} = ARANGODB;

class DB {
    constructor(){
        this.db = new Database({
            url: `http://${SERVER}:${PORT}`
        });
        this.db.useDatabase(DATABASE);
        this.db.useBasicAuth(USERNAME,PASSWORD);
    }

    get client (){
        return this.db;
    }

    get users(){
        return this.db.collection(arango.USERS);
    }

    get devices(){
        return this.db.collection(arango.DEVICES);
    }

    get stores(){
        return this.db.collection(arango.STORES);
    }

    get owns(){
        return this.db.edgeCollection(arango.OWNS);
    }

    get works_at(){
        return this.db.edgeCollection(arango.STORES);
    }

    query(query, bindVars){
        return this.db.query({query,bindVars})
    }

    setup(){
        console.log('setting up arangob datbase');
        Object.keys(COLLECTIONS).forEach(collection=>{
            if(COLLECTIONS[collection].type === arango.DOCUMENT ){
                this.db.collection(collection).create();
            }else{
                this.db.edgeCollection(collection).create();
            }
        })
    }

    reset(){
        console.log('truncating arango database');
        return this.db.truncate();
    }
}

module.exports = new DB();