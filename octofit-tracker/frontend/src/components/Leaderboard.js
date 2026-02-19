import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Leaderboard endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="card-title">Leaderboard</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Team</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.team}</td>
                <td>{item.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-success mt-2">Refresh</button>
      </div>
    </div>
  );
  );
};

export default Leaderboard;
