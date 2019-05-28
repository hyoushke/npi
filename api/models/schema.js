const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const dynamicSchema = (jsonFields, modelName)=>{
    const {DB_MONGO_USER, DB_MONGO_PASSWORD, DB_MONGO_HOST, DB_MONGO_DATABASE } = process.env;
    const muri = `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/${DB_MONGO_DATABASE}?retryWrites=true`;
    
    mongoose.connect(muri);
    mongoose.Promise = global.Promise;
    
    const schema = mongoose.Schema(jsonFields);
    schema.plugin(mongoosePaginate);
    return module.exports = mongoose.model(modelName, schema);
}

module.exports = dynamicSchema;

