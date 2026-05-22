import Card from './Card';
import { useState, useEffect } from 'react';

function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [search, setSearch] = useState('');

    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [description, setDescription] = useState('');

    // --- State-uri pentru editare ---
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState('');
    const [editTech, setEditTech] = useState('');

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
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
            fetch('http://localhost:3000/api/projects/' + projectId, {
                method: 'DELETE',
            })
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
        fetch('http://localhost:3000/api/projects/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ done: !currentDone }),
        })
            .then(async function (response) {
                const updatedProject = await response.json();
                setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
            })
            .catch(function (err) {
                setError('Cannot find project I guess');
                console.error('Something happened', err);
            });
    }

    // --- Deschide formularul de editare ---
    function handleEdit(project) {
        setEditingId(project._id);
        setEditTitle(project.title);
        setEditTech(project.tech);
    }

    // --- Salvează modificările ---
    async function handleSave(id) {
        try {
            const response = await fetch('http://localhost:3000/api/projects/' + id, {
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

    // --- Anulează editarea ---
    function handleCancel() {
        setEditingId(null);
    }

    useEffect(function () {
        fetch('http://localhost:3000/api/projects')
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

    if (error) return <p>Error is: {error}</p>;
    if (loading) return <p>Se incarca...</p>;

    return (
        <div>
            <h3>Proiecte</h3>

            <form className="project-form" onSubmit={handleSubmit}>
                <div className="project-form-fields">
                    <input
                        className="todo-list-input"
                        placeholder="Project title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <input
                        className="todo-list-input"
                        placeholder="Tech"
                        value={tech}
                        onChange={(e) => setTech(e.target.value)}
                    />
                    <textarea
                        className="todo-list-input project-description-input"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                    />
                </div>
                <button type="submit" className="todo-list-add-button">
                    Add
                </button>
            </form>

            <input value={search} onChange={(e) => setSearch(e.target.value)} />

            {projects
                .filter((item) =>
                    item.title.toLowerCase().includes(search.toLowerCase())
                )
                .map(function (project) {
                    // Dacă acest proiect e în editare, afișăm formularul
                    if (editingId === project._id) {
                        return (
                            <div key={project._id} className="project-item">
                                <input
                                    className="todo-list-input"
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    placeholder="Title"
                                />
                                <input
                                    className="todo-list-input"
                                    value={editTech}
                                    onChange={(e) => setEditTech(e.target.value)}
                                    placeholder="Tech"
                                />
                                <button type="button" onClick={() => handleSave(project._id)}>
                                    Salvează
                                </button>
                                <button type="button" onClick={handleCancel}>
                                    Anulează
                                </button>
                            </div>
                        );
                    }

                    // Altfel, afișăm card-ul normal
                    return (
                        <div key={project._id} className="project-item">
                            <Card
                                title={project.title}
                                subtitle={project.tech}
                                description={project.description || project.tech || 'No description provided.'}
                            />
                            <button type="button" onClick={() => handleEdit(project)}>
                                Editează
                            </button>
                            <button type="button" onClick={() => handleDelete(project._id)}>
                                Delete
                            </button>
                            <button type="button" onClick={() => handleToggle(project._id, project.done)}>
                                Toggle
                            </button>
                        </div>
                    );
                })}

            <p>Total: {projects.length}</p>
            <p>Done: {projects.filter((p) => p.done).length}</p>
            <p>In progress: {projects.filter((p) => !p.done).length}</p>
        </div>
    );
}

export default ProjectList;