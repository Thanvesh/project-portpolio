const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = 3005;

app.use(bodyParser.json({ limit: '10mb' }));

console.log(process.env.MONGO_DB_URL)
// Connection URL
const url = process.env.MONGO_DB_URL
const dbName = 'portfolio';


app.use(bodyParser.json({ limit: '10mb' }));


mongoose.connect(`${url}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});
app.use(
    cors({
        origin: "https://project-portpolio.vercel.app/",
        methods: ["GET", "POST"],
        credentials: true
    })
)
// Define the project schema
const projectSchema = new mongoose.Schema({
    title: String,
    link: String,
    description: String,
    imageUrl: String,
});

// Define the Project model
const Project = mongoose.model('Project', projectSchema);

// API endpoint to get all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to add a new project
app.post('/api/projects', async (req, res) => {
    const { title, link, description, imageUrl } = req.body;

    try {
        await Project.create({ title, link, description, imageUrl });
        res.json({ message: 'Project added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// API endpoint to delete a project by ID
app.delete('/api/projects/:id', async (req, res) => {
    const projectId = req.params.id;

    try {
        await Project.findByIdAndRemove(projectId);
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
