const express = require('express');
const path = require('path');
const api = require('./routes/index.js');
const noteRoutes = require('./routes/notes.js');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", api);
app.use("/", noteRoutes);

app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});