const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const PORT = 3000;

const Project = require('./models/Project');


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });

app.use(express.json());
// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', async function(req, res) {
 try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: 'Eroare ' + err });
    }
});

app.get('/api/projects/:id',async function(req, res) {
    const id = parseInt(req.params.id);
    const projects = await Project.find();
    const project = projects.find(p => p.id === id)
    if (project)
        res.json(project);
    else
        res.status(404).json({ error: 'Not found' })
});

app.delete('/api/projects/:id', async function(req, res) {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
        res.status(404).json({ error: 'Not found' });
    }
    else
        res.json({ message: 'Deleted' });
})

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', async function(req, res) {
 try {
 const newProject = new Project({
 title: req.body.title,
 tech: req.body.tech,
 done: req.body.done || false,
 });
 const saved = await newProject.save();
 res.status(201).json(saved);
 } catch (err) {
 res.status(400).json({ error: err.message });
 }
});

app.put('/api/projects/:id', async function(req, res) {
    try {
        const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // returneaza documentul DUPA actualizare
        );
        if (!updated) return res.status(404).json({ error: 'Not found' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

app.get('/api/stats', async function(req, res) {
    try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    res.json({ total: total, done: done, inProgress: total - done });
    } catch (err) {
    res.status(500).json({ error: 'Eroare server: ' + err});
    }
});

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});