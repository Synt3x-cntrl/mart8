const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Array to store girlfriend's answer
let answers = [];

app.post('/api/answer', (req, res) => {
    const { answer, timestamp } = req.body;
    answers.push({ answer, timestamp });
    console.log(`New answer received: ${answer}`);
    res.json({ success: true, message: 'Answer saved' });
});

app.get('/api/answers', (req, res) => {
    res.json(answers);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
