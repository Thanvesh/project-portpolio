const express = require('express');
const sqlite3 = require('sqlite3');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3005;

app.use(bodyParser.json({ limit: '10mb' }));

// Define the path to the SQLite database file
const dbPath = path.join(__dirname, 'projects.db');

// Create SQLite database
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the database');
    }
});

// Create projects table if not exists
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY, title TEXT, link TEXT, description TEXT, imageUrl TEXT)");
});

// API endpoint to get all projects
app.get('/api/projects', (req, res) => {
    db.all("SELECT * FROM projects", (err, projects) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json(projects);
        }
    });
});

// API endpoint to add a new project
app.post('/api/projects', (req, res) => {
    const { title, link, description, imageUrl } = req.body;
    db.run("INSERT INTO projects (title, link, description, imageUrl) VALUES (?, ?, ?, ?)",
        [title, link, description, imageUrl], (err) => {
            if (err) {
                console.error(err);
                res.status(500).json({ error: 'Internal Server Error' });
            } else {
                res.json({ message: 'Project added successfully' });
            }
        });
});

// API endpoint to delete a project by ID
app.delete('/api/projects/:id', (req, res) => {
    const projectId = req.params.id;
    db.run("DELETE FROM projects WHERE id = ?", [projectId], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        } else {
            res.json({ message: 'Project deleted successfully' });
        }
    });
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
