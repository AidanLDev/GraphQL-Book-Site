const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: String,
  genre: String,
  authorId: String
});

//  Creating a model (collection/table in DB) called books that store objects in the shape defined in our schema
module.exports = mongoose.model("Book", bookSchema);
