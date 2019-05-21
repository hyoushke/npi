const mongoose = require('mongoose');
const muri = "mongodb+srv://admin:SuperPass1981@cluster0-oc3co.mongodb.net/test?retryWrites=true";
mongoose.connect(muri);
mongoose.Promise = global.Promise;


const usersSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: {type: String, 
            required: true, 
            unique: true,
            match: /^\S+@\S+$/},
    //username: {type: String, required: true},
    password: {type: String, required: true}

});

module.exports = mongoose.model('Users', usersSchema);

