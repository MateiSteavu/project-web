import Card from './Card';

import { useState, useEffect } from 'react';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('');

    const [title, setTitle] = useState('');
    const [tech, setTech] = useState('');
    const [description, setDescription] = useState('');

    async function handleSubmit() {
        try {
            const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, tech: tech }),
        });
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setTitle(''); // Goleste input-urile
        setTech('');
        } catch (err) {
        console.error('Eroare:', err);
        }
    }

    function handleDelete(projectId) {

        fetch('http://localhost:3000/api/projects/' + projectId, {
            method: 'DELETE'
        })
        .then(function (response) {
            if (!response.ok) {
                throw new Error('Delete failed');
            }
            setProjects(function (prevProjects) {
                return prevProjects.filter(function (project) {
                    return project._id !== projectId;
                });
            });
        })
        .catch(function (err) {
            setError('Error deleting project');
            console.error('Error deleting project:', err);
        });
    }

    useEffect(function() {
        fetch('http://localhost:3000/api/projects')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setProjects(data);
                setLoading(false);
            })
            .catch(function(err) {
            setError('Eroare la incarcarea datelor' + err);
            setLoading(false);
            });
    }, []);
    if(error) {
        return(<p>Error is: {error}</p>);
    }
    if (loading) {
        
        return <p>Se incarca...</p>;
    }
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
            <button
                type="submit"
                className="todo-list-add-button"
            > Add </button>
        </form>
        <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />
        {projects.filter(function(p) {
            return p.title.toLowerCase().includes(search.toLowerCase());
            })
            .map(function(item, index) {
          return <Card key={index} title={item.title} description={item.tech} />;
        })}
        {projects.filter(item => item.title.toLowerCase().includes(search.toLowerCase())).map(function (project) {
            return <div key={project._id} className="project-item">
                <Card
                title={project.title}
                subtitle={project.tech}
                description={project.description || project.tech || 'No description provided.'}
                />
                <button
                type="button"
                onClick={() => handleDelete(project._id)}
                >
                Delete
                </button>
                </div>})
        }
        <p>{projects.length}</p>
        <p>{projects.filter(p => p.done).length}</p>
        <p>{projects.filter(p => !p.done).length}</p>
        </div>
        
    );
}
export default ProjectList;