import Card from './Card';

import { useState, useEffect } from 'react';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search] = useState('Pagina Personala');
    useEffect(function() {
        fetch('/data/projects.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            }).catch(function(err) {
            setError('Eroare la incarcarea datelor' + err);
            setLoading(false);
            });
    }, []);
    if(error);
    if (loading) {
        
        return <p>Se incarca...</p>;
    }
    return (
        <div>
        <h3>Proiecte</h3>
        {projects.filter(function(p) {
            return p.title.toLowerCase().includes(search.toLowerCase());
            })
            .map(function(item, index) {
          return <Card key={index} title={item.title} description={item.tech} />;
        })}
        </div>
    );
}
export default ProjectList;