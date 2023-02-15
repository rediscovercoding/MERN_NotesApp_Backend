require("dotenv").config();
const express = require("express");
const notesRoutes = require("./routes/notes");
const mongoose = require("mongoose");
//create express app
const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/api/notes", notesRoutes);

//connect to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for requests
    app.listen(1000, () => {
      console.log("connected to db and listening on port 1000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
