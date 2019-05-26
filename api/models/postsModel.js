const mongoose = require('../utils/mongooseUtils');
const mongoosePaginate = require('mongoose-paginate-v2');

const postsSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    authorid: {type: String, required: true},
    author: {type: String, required: true},
    status: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    categories: {type: String, required: true},
    tags: {type: String, required: true},
    likes: {type: String, required: true},
    subscribers: {type: String, required: true},
    shares: {type: String, required: true},
    views: {type: String, required: true},
    imageurl: {type: String, required: true},
    datecreated: {type: String, required: true},
    datemodified: {type: String, required: true},
});

postsSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Posts', postsSchema);

