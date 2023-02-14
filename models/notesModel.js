const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//create new schema to database
const notesSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

//use the above schema to make a model
module.exports = mongoose.model("Note", notesSchema);
//A notes collection is automatically made
