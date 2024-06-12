const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
app.use(express.json())
app.use(cors());

app.get('/generate-fake-info', (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = 50; // Default page size is 50
    const totalItems = 1000; // Total number of fake entries
    const totalPages = Math.ceil(totalItems / pageSize);

    // Ensure page is within bounds
    if (page > totalPages || page < 1) {
        return res.status(400).json({ error: 'Page number out of range' });
    }

    const fakeInfo = [];

    // Calculate starting index for the current page
    const startIndex = (page - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);

    for (let i = startIndex; i < endIndex; i++) {
        fakeInfo.push({
            userId: faker.string.uuid(),
            username: faker.internet.userName(),
            email: faker.internet.email(),
            avatar: faker.image.avatar(),
            password: faker.internet.password(),
            birthdate: faker.date.birthdate(),
            registeredAt: faker.date.past(),
        });
    }

    res.status(200).json({
        page,
        pageSize,
        totalPages,
        totalItems,
        data: fakeInfo
    });
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, ()=> {
            console.log('Connect db success and listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

// Note Schema
const noteSchema = new mongoose.Schema({
    notes: [{
        _id: String,
        title: String,
        content: String,
        date: { type: Date, default: Date.now }
    }]
});

const NoteCollection = mongoose.model('NoteCollection', noteSchema);

// Ensure the document exists
const ensureNotesDocument = async () => {
    try {
        await NoteCollection.findOneAndUpdate({}, {}, { upsert: true, setDefaultsOnInsert: true });
    } catch (err) {
        console.error('Error ensuring notes document:', err);
    }
};

ensureNotesDocument();

app.post('/sync-realm', async (req, res) => {
    try {
        const newNotes = req.body;
        if (!Array.isArray(newNotes)) {
            return res.status(400).json({ message: 'Notes should be an array' });
        }
        const updatedCollection = await NoteCollection.findOneAndUpdate(
            {},
            { $set: { notes: newNotes } },
            { new: true, upsert: true }
        );
        res.json(updatedCollection.notes);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});