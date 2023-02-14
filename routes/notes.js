const expres = require("express");
const {
  createNote,
  getNote,
  getNotes,
  deleteNote,
  updateNote,
} = require("../controllers/notesController");
const router = expres.Router();

//Get all notes
router.get("/", getNotes);

//Get single note
router.get("/:id", getNote);

//Post a new note
router.post("/", createNote);

//Delete a note
router.delete("/:id", deleteNote);

//Update a note
router.patch("/:id", updateNote);

module.exports = router;
