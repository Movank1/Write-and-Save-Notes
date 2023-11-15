const util = require('util');
const fs = require('fs');

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require('uuid/v1');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync('db/db.json', 'utf8');
  }

  write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
  }
// Get all notes with the given id, 
  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    });
  }



// Add a unique id to the note using uuid package
    async addNote(note) {
    const { title, text } = note;

    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    const newNote = { title, text, id: uuidv1() };

    try {
      const notes = await this.getNotes();
      const updatedNotes = [...notes, newNote];
      await this.write(updatedNotes);
      return newNote;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

     // Get all notes, remove the note with the given id, write the filtered notes


    async removeNote(id) {
    try {
      const notes = await this.getNotes();
      const filteredNotes = notes.filter((note) => note.id !== id);
      await this.write(filteredNotes);
    } catch (error) {
      console.error('Error removing note:', error);
      throw error;
    }
  }
}

module.exports = new Store();

