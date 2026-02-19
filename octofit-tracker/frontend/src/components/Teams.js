import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Teams endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="card-title">Teams</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Members</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.members && item.members.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-warning mt-2">Refresh</button>
      </div>
    </div>
  );
  );
};

export default Teams;
