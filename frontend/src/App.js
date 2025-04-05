import React, { useState, useEffect } from 'react';

function App() {
  const [resumeData, setResumeData] = useState([]);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'; // Fallback for local

  useEffect(() => {
    fetch('${backendUrl}/api/resume-data') // Adjust port if needed
      .then(response => response.json())
      .then(data => setResumeData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Awesome Resume</h1>
      {resumeData.length > 0 ? (
        <pre>{JSON.stringify(resumeData, null, 2)}</pre>
      ) : (
        <p>Loading resume data...</p>
      )}
    </div>
  );
}

export default App;