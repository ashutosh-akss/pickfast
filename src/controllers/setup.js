const db = require('../models/arangodb');

class SetupController {

    async setup(req,res){
        db.setup();
    }

    async reset(req,res) {
        db.reset();
    }
}

module.exports = new SetupController();