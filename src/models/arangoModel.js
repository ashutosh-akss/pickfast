class ArangoModel {
    
    constructor(collection){
        this.collection = collection;
    }

    save(document){
        return this.collection.save(document,{
            waitForSync:true,
            returnNew:true,
        });
    }

    findAll(options){
        return this.collection.all(options);
    }

    search(example){
        // Returns cursor
        return this.collection.byExample(example);
    }

    document(handle){
        return this.collection.document(handle);
    }

    exists(handle){
        return this.collection.documentExists(handle);
    }

    update(handle,record){
        return this.collection.update(handle, record, {
            waitForSync:true,
        });
    }

    replace(handle,record){
        return this.collection.replace(handle, record, {
            waitForSync:true,
            keepNull:true,
            mergeObjects:true,
        });
    }

    bulkUpdate(documents){
        return this.collection.bulkUpdate(documents, {
            waitForSync:true,
            keepNull:true,
            mergeObjects:true,
        });
    }

    list(type='_Key'){
        return this.collection.list(type);
    }

    delete(handle){
        return this.collection.remove(handle,{
            waitForSync:true,
        })
    }
}

module.exports = ArangoModel;