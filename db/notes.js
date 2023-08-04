const util = require('util');
const fs = require('fs');
const { v4: uuiv4 } = require('uuid');
const { parse } = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf-8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }
  getNotes(){
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
          parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  addNote(note) {
      const { title, text } = note;

      if (!title || !text) {
        throw new Error ("Please enter a title and text for your note");
      }
      const newNote = {
        title, 
        text,
        id: uuiv4(),
      }
      return this.getNotes()
        .then((notes) => [... notes, newNote])
        .then((updateNotes) => this.write(updateNotes))
        .then(() => newNote)

  }
  deleteNote(id) {
    return this.getNotes()
        .then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    
  }
};

module.exports = new Store();