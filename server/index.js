const express = require('express');
const app = express();
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
    const projects = await Project.find();
    const my_index = await Project.findById(req.params.id)
    if (my_index !== null) {
        projects.splice(my_index, 1);
        res.json({ message: 'Deleted' })
    }
    else
        res.status(404).json({ error: 'Not found' })
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

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});