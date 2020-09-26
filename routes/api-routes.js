const express = require("express")
const util = require("util")
const fs = require("fs")

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const app = express()

app.get("/notes", function (req, res) {
    readFileAsync("db/db.json", "utf8")
        .then(notes => {
            if ([].concat(JSON.parse(notes))) {
                notesTogether = [].concat(JSON.parse(notes))
            } else {
                notesTogether = []
            }

            return notesTogether
        })
        .then(notesTogether => res.json(notesTogether))
        .catch(err => res.status(500).json(err))
})

app.post("/notes", function (req, res) {
    const {
        title,
        text
    } = req.body

    if (!title || !text) {
        throw "Title and text must have content"
    }

    const id = Math.floor(Math.random() * 100)

    const note = {
        title,
        text,
        id
    }

    readFileAsync("db/db.json", "utf8")
        .then(notes => {
            if ([].concat(JSON.parse(notes))) {
                notesTogether = [].concat(JSON.parse(notes))
            } else {
                notesTogether = []
            }

            return notesTogether
        })
        .then(notesTogether => {
            notesTogether = [...notesTogether, note]
            return notesTogether
        })
        .then(allNotes => {
            writeFileAsync("db/db.json", JSON.stringify(allNotes))
            return allNotes
        })
        .then(x => res.json(x))
        .catch(err => res.status(500).json(err))
})

app.delete("/notes/:id", function (req, res) {
    readFileAsync("db/db.json", "utf8")
        .then(notes => {
            if ([].concat(JSON.parse(notes))) {
                notesTogether = [].concat(JSON.parse(notes))
            } else {
                notesTogether = []
            }

            return notesTogether
        })
        .then(notesTogether => {
            let notes = notesTogether.filter(note => note.id != req.params.id)
            return notes
        })
        .then(notes => {
            writeFileAsync("db/db.json", JSON.stringify(notes))
        })
        .then(x => res.json({
            ok: true
        }))
        .catch(err => res.status(500).json(err))
})

module.exports = app