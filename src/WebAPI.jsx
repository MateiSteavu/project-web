import Card from './Card';

import { useState, useEffect } from 'react';
function WebAPI() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('');
    useEffect(function() {
        fetch('https://jsonplaceholder.typicode.com/users')
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
            return p.name.toLowerCase().includes(search.toLowerCase());
            })
            .map(function(item, index) {
          return <Card key={index} title={item.name} description={item.username} />;
        })}
        </div>
    );
}
export default WebAPI;