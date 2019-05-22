const mongoose = require('mongoose');
const muri = "mongodb+srv://admin:SuperPass1981@cluster0-oc3co.mongodb.net/test?retryWrites=true";
mongoose.connect(muri);
mongoose.Promise = global.Promise;


const postsSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    status : {type: String},
    title : {type: String},
    content : {type: String},
    imageurl : {type: String},
    tags : {type: String},
    datecreated : {type: Date},
    datemodified : {type: Date}


});

module.exports = mongoose.model('Posts', postsSchema);

