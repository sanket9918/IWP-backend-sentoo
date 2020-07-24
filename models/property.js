const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const comment = new Schema({
    email: {
        type:String
    },
    comment: {
        type: String,
    }
})
const property = new Schema({
    uid: {
        type: Number,
    },
    code: {
        type: String,
    },
    name: {
        type: String
    },
    location: {
        type: String
    },
    comments: [comment]

});
const Property = Mongoose.model('property', property)
const Comment = Mongoose.model('comment', comment)
module.exports = {
    Property, Comment
}