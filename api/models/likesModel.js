const mongoose = require('mongoose');
const {DB_MONGO_USER, DB_MONGO_PASSWORD, DB_MONGO_HOST, DB_MONGO_DATABASE } = process.env;
const muri = `mongodb+srv://${DB_MONGO_USER}:${DB_MONGO_PASSWORD}@${DB_MONGO_HOST}/${DB_MONGO_DATABASE}?retryWrites=true`;
mongoose.connect(muri);
mongoose.Promise = global.Promise;

const mongoosePaginate = require('mongoose-paginate-v2');

const likesSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status: {type: String, required: true},
    postid: mongoose.Schema.Types.ObjectId,
    userid: mongoose.Schema.Types.ObjectId,
    datecreated: {type: String, required: true},
    datemodified: {type: String, required: true}
});

likesSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Likes', likesSchema);