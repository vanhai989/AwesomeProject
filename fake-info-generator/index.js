const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');

const app = express();
const port = 3000;
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

    res.json({
        page,
        pageSize,
        totalPages,
        totalItems,
        data: fakeInfo
    });
});

app.listen(port, () => {
    console.log(`Fake info generator app listening at http://localhost:${port}`);
});
