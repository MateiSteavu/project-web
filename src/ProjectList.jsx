import Card from './Card';

import { useState, useEffect } from 'react';
function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(function() {
        fetch('/data/projects.json')
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                setProjects(data.projects);
                setLoading(false);
            });
    }, []);
    if (loading) {
        return <p>Se incarca...</p>;
    }
    return (
        <div>
        <h3>Proiecte</h3>
        {projects.map(function(item, index) {
          return <Card key={index} title={item.title} description={item.tech} />;
        })}
        </div>
    );
}
export default ProjectList;