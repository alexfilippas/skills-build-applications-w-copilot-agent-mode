import React, { useEffect, useState } from 'react';

const Users = () => {
  const [data, setData] = useState([]);
  const codespace = process.env.REACT_APP_CODESPACE_NAME;
  const endpoint = codespace
    ? `https://${codespace}-8000.app.github.dev/api/users/`
    : 'http://localhost:8000/api/users/';

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(json => {
        const results = json.results || json;
        setData(results);
        console.log('Users endpoint:', endpoint);
        console.log('Fetched data:', results);
      });
  }, [endpoint]);

  return (
    <div className="card mb-4">
      <div className="card-header bg-secondary text-white">
        <h2 className="card-title">Users</h2>
      </div>
      <div className="card-body">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Team</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(data) && data.map((item, idx) => (
              <tr key={idx}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.team}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-secondary mt-2">Refresh</button>
      </div>
    </div>
  );
  );
};

export default Users;
