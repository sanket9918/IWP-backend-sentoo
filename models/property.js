const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const comment = new Schema({
  email: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
  },
});
const property = new Schema({
  uid: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  comments: [comment],
  rating: {
    type: Number,
    default: 0,
  },
});
const Property = Mongoose.model("property", property);
const Comment = Mongoose.model("comment", comment);
module.exports = {
  Property,
  Comment,
};
