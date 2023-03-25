const fs = require('node:fs/promises');
const { v4: generateId } = require('uuid');

const getNotes = async ()=>{
    const data = await fs.readFile('notes.json', 'utf8');
    // console.log(data);
    return JSON.parse(data);
}

const pasteNotes = async(data)=>{
    const storedData = await getNotes();
    storedData.unshift({ ...data, id: generateId() });
    await fs.writeFile('notes.json', JSON.stringify(storedData));
}

const delNotes = async(id)=>{
    const storedData = await getNotes();
    const updatedData = storedData.filter((note)=>{
        return note.id !== id;
    });
    await fs.writeFile('notes.json', JSON.stringify(updatedData));
}

module.exports = {getNotes, pasteNotes, delNotes};