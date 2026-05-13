import Card from './Card';

import { useState, useEffect } from 'react';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('');
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
        <p>{projects.length}</p>
        <p>{projects.filter(p => p.done).length}</p>
        <p>{projects.filter(p => !p.done).length}</p>
        </div>
    );
}
export default ProjectList;