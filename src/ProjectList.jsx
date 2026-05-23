import { useState, useEffect } from 'react';

const API = 'https://dashboard-api-xxxx.onrender.com';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [description, setDescription] = useState('');

    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetch(API + '/api/projects', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, tech, description }),
            });
            const newProject = await response.json();
            setProjects([...projects, newProject]);
            setTitle('');
            setTech('');
            setDescription('');
        } catch (err) {
            console.error('Eroare:', err);
        }
    }

    function handleDelete(projectId) {
        if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
            fetch(API + '/api/projects/' + projectId, { method: 'DELETE' })
                .then(function (response) {
                    if (!response.ok) throw new Error('Delete failed');
                    setProjects((prev) => prev.filter((p) => p._id !== projectId));
                })
                .catch(function (err) {
                    setError('Error deleting project');
                    console.error('Error deleting project:', err);
                });
        }
    }

    function handleToggle(id, currentDone) {
        fetch(API + '/api/projects/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: !currentDone }),
        })
            .then(async function (response) {
                const updatedProject = await response.json();
                setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
            })
            .catch(function (err) {
                setError('Cannot find project');
                console.error('Something happened', err);
            });
    }

    function handleEdit(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    }

    async function handleSave(id) {
        try {
            const response = await fetch(API + '/api/projects/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title: editTitle, tech: editTech }),
            });
            const updatedProject = await response.json();
            setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
            setEditingId(null);
        } catch (err) {
            setError('Error saving project');
            console.error('Error saving:', err);
        }
    }

    function handleCancel() {
        setEditingId(null);
    }

    useEffect(function () {
        fetch(API + '/api/projects')
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                setLoading(false);
            })
            .catch((err) => {
                setError('Eroare la incarcarea datelor: ' + err);
                setLoading(false);
            });
    }, []);

    if (error) return <p>Eroare: {error}</p>;
    if (loading) return <p>Se încarcă...</p>;

    return (
        <div className="projects-page">
            <p className="page-label">Proiecte</p>
            <h1>Proiectele mele</h1>

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="project-form-fields">
                    <input
                        placeholder="Titlu proiect"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        placeholder="Tehnologie"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                    />
                    <textarea
                        placeholder="Descriere"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
                <button type="submit" className="btn-primary">
                    Adaugă
                </button>
            </form>

            <div className="section-head">Toate proiectele</div>

            <input
                className="search-input"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="project-list">
              {projects
                .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
                .map(function (project) {

                    if (editingId === project._id) {
                        return (
                            <div key={project._id} className="project-item">
                                <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                                    <input
                                        value={editTitle}
                                        onChange={(e) => setEditTitle(e.target.value)}
                                        placeholder="Titlu"
                                    />
                                    <input
                                        value={editTech}
                                        onChange={(e) => setEditTech(e.target.value)}
                                        placeholder="Tehnologie"
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '6px' }}>
                                    <button type="button" className="btn-primary" onClick={() => handleSave(project._id)}>
                                        Salvează
                                    </button>
                                    <button type="button" onClick={handleCancel}>
                                        Anulează
                                    </button>
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={project._id} className="project-item">
                            <div>
                                <div className="project-title">{project.title}</div>
                                <div className="project-tech">{project.tech}</div>
                            </div>
                            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                                <span className={`badge ${project.done ? 'done' : ''}`}>
                                    {project.done ? 'Finalizat' : 'În lucru'}
                                </span>
                                <button type="button" onClick={() => handleEdit(project)}>
                                    Editează
                                </button>
                                <button type="button" onClick={() => handleToggle(project._id, project.done)}>
                                    Toggle
                                </button>
                                <button type="button" className="btn-danger" onClick={() => handleDelete(project._id)}>
                                    Șterge
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="stats-grid" style={{ marginTop: '32px' }}>
                <div className="stat-card primary">
                    <div className="stat-number">{projects.length}</div>
                    <div className="stat-label">Total</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{projects.filter((p) => p.done).length}</div>
                    <div className="stat-label">Finalizate</div>
                </div>
                <div className="stat-card">
                    <div className="stat-number">{projects.filter((p) => !p.done).length}</div>
                    <div className="stat-label">În lucru</div>
                </div>
            </div>
        </div>
    );
}

export default ProjectList;