const fs = require('fs');
const chalk = require('chalk');

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.blue.bold("Your notes:"));
    notes.forEach(note => console.log(note));
}

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green.bold.inverse('New note added!'));
    } else {
        console.log(chalk.red.bold.inverse('Note title taken'));
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
    saveNotes(notesToKeep);

    if(notes.length > notesToKeep.length) {
        console.log(chalk.green.bold.inverse('Note removed!'));
    } else {
        console.log(chalk.red.bold.inverse('No note found!'));
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const foundNote = notes.find(note => note.title === title);

    if(!foundNote) {
        console.log(chalk.red.bold(`Note "${title}" not found!`))
    } else {
        console.log(`${chalk.blue.bold(foundNote.title)}: ${foundNote.body}`);
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }
}

module.exports = {
    listNotes: listNotes,
    addNote: addNote,
    removeNote: removeNote,
    readNote: readNote
}