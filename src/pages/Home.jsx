import { useState, useEffect } from 'react';

function Home() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(function () {
    fetch('http://localhost:3000/api/stats')
      .then(function (res) {
        if (!res.ok) throw new Error('Eroare la fetch');
        return res.json();
      })
      .then(function (data) {
        setStats(data);
        setLoading(false);
      })
      .catch(function (err) {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Se încarcă statisticile...</p>;
  if (error) return <p>Eroare: {error}</p>;

  return (
    <div className="page home-page">
      <p className="page-label">Dashboard</p>
      <h1>Bine ai venit</h1>
      <p className="page-description">O privire de ansamblu asupra proiectelor tale.</p>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total proiecte</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.done}</div>
          <div className="stat-label">Finalizate</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">În lucru</div>
        </div>
      </div>
    </div>
  );
}

export default Home;