const fs = require("fs/promises");
const path = require("path");
const { title } = require("process");

const notesPath = path.join(__dirname, "db.json");

async function getNote() {
  const notes = await fs.readFile(notesPath, { encoding: "utf-8" });
  return Array.isArray(JSON.parse(notes)) ? JSON.parse(notes) : [];
}

async function addNote(title) {
  const notes = await getNote();

  const note = {
    title,
    id: Math.random
  };

  notes.push(note);

  await fs.writeFile(notesPath, JSON.stringify(notes));
}

async function removeNote(getId) {
  const notes = await getNote();
  const id = Number(getId)
  const editingNotes = notes.filter((note) => note.id !== id);

  await fs.writeFile(notesPath, JSON.stringify(editingNotes));
}

async function editNote(getId, getTitle = 'title') {
  const notes = await getNote();
  const id = Number(getId)
  const editingNotes = notes.forEach(note => {
    if( note.id !== id){
      note.title = getTitle
    }
  });

  await fs.writeFile(notesPath, JSON.stringify(editingNotes));
}

module.exports = {
  getNote,
  addNote,
  removeNote,
  editNote
};
