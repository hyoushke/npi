const mongoose = require('mongoose');
const muri = "mongodb+srv://admin:SuperPass1981@cluster0-oc3co.mongodb.net/test?retryWrites=true";
mongoose.connect(muri);
mongoose.Promise = global.Promise;

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    price: {type: Number, required: true},
    imageurl: {type: String, required: true}
});

module.exports = mongoose.model('Product', productSchema);

