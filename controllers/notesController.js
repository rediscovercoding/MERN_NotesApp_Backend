const Note = require("../models/notesModel");
const mongoose = require("mongoose");

//get all notes
const getNotes = async (req, res) => {
  const notes = await Note.find().sort({ createdAt: -1 });
  res.status(200).json(notes);
};

//get a single note
const getNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note found" });
  }
  const note = await Note.findById(id);

  if (!note) {
    return res.status(404).json({ error: "No note found" });
  }
  res.status(200).json(note);
};

//create a new note
const createNote = async (req, res) => {
  const { title, text } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!text) {
    emptyFields.push("text");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  //add to the database
  try {
    //creating a new document with model that was created in the model folder with database schema
    const note = await Note.create({ title, text });
    res.status(200).json(note);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a note
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note found" });
  }
  const note = await Note.findOneAndDelete({ _id: id });
  if (!note) {
    return res.status(404).json({ error: "No note found" });
  }
  res.status(200).json(note);
};

//update a note
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such Note found" });
  }
  const note = await Note.findOneAndUpdate({ _id: id }, { ...req.body });
  if (!note) {
    return res.status(404).json({ error: "No note found" });
  }
  res.status(200).json(note);
};

module.exports = {
  createNote,
  getNotes,
  getNote,
  deleteNote,
  updateNote,
};
