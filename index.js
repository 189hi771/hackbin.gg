const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(bodyParser.json()); // Use JSON parser for request body

app.post('/api/scripts', (req, res) => {
    const { fileName, codeContent } = req.body;

    if (codeContent.trim() !== "") {
        const filePath = path.join(__dirname, 'public', 'scripts', `${fileName}.html`);

        fs.writeFile(filePath, codeContent, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
            } else {
                console.log(`File ${fileName}.html created successfully.`);
                res.send(fileName);
            }
        });
    } else {
        res.status(400).send('Bad Request: Please provide code content.');
    }
});

function generateRandomFileName() {
    const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
