import React, { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch('/files');
      const data = await response.json();
      setFiles(data);
    } catch (error) {
      console.error('Error fetching files:', error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Google Drive PDF Access</h1>
        <button onClick={fetchFiles}>Fetch PDF Files</button>
        <ul>
          {files.map(file => (
            <li key={file.id}>
              {file.name} ({file.id})
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
