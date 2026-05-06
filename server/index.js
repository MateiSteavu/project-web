const express = require('express');
const app = express();
const PORT = 3000;

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

const projects = [
 { id: 1, title: "Pagina Personala",    tech: "HTML, CSS",  done: true },
 { id: 2, title: "Calculator Buget",    tech: "JS",         done: true },
 { id: 3, title: "Dashboard React",     tech: "React",      done: false },
 { id: 4, title: "API Meteo",           tech: "React, API", done: false },
];

// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', function(req, res) {
 res.json(projects);
});

app.get('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id);
    const project = projects.find(p => p.id === id)
    if (project)
        res.json(project);
    else
        res.status(404).json({ error: 'Not found' })
});

app.get('/api/stats', function(req, res) {
    res.json({
        total_proiecte: projects.length,
        done:           projects.filter(p => p.done).length,
        failed:         projects.filter(p => !p.done).length
    });
});

app.delete('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id)
    const my_index = projects.findIndex(p => p.id === id)
    if (my_index !== null) {
        projects.splice(my_index, 1);
        res.json({ message: 'Deleted' })
    }
    else
        res.status(404).json({ error: 'Not found' })
})

app.put('/api/projects/:id', function(req, res) {
    const id = parseInt(req.params.id)
    const my_index = projects.findIndex(p => p.id === id)
    if (my_index !== null) {
        projects[my_index].title = req.body.title;
        projects[my_index].tech = req.body.tech;
        projects[my_index].done = req.body.done;
        res.json({ message: projects[my_index] })
    }
    else
        res.status(404).json({ error: 'Not found' })
})

// POST /api/projects - adauga un proiect nou
app.post('/api/projects', function(req, res) {
    const newProject = {
        id: projects.length + 1,
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false,
    };
    projects.push(newProject);
    res.status(201).json(newProject);
 });

// Porneste serverul
app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});