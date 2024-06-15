import React, { useState } from 'react';
import './App.css';

function App() {
  const [files, setFiles] = useState([]);

  const requestBody = {
    token: {

      "access_token": "ya29.a0AXooCgsTJTVKWCVmI3YrII8dIvubATDB08gi2PTSudGjDX-hlg4vaVXT322tiYn-5PpKGohOaI_cEX8rfjpYkWooXZCRO-PbuEfNRxlwJeyk3OK95-wJm3bBpJoSlkmEDqGsb8lO2gw9GgVdExEYGICCw9bAmIEJBJq7aCgYKAWwSARMSFQHGX2MiX8UmKsqoKyEmxefMNLNgTw0171",
      "refresh_token": "1//06TGbJCfs8d4WCgYIARAAGAYSNwF-L9Ir9NPbwso320VqlhinDnpAHGRgcMEkv-91ed8r9aQiw-Yy3ANAUoEs8O30lQZxRT9ncJc",
      "scope": "https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file",
      "token_type": "Bearer",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImMzYWJlNDEzYjIyNjhhZTk3NjQ1OGM4MmMxNTE3OTU0N2U5NzUyN2UiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxNzM4OTc5NDk2MzMtbHU0dXEzYmFiaGZsMnJlNThiZ2FmbXIxZzQ0N3VyMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxNzM4OTc5NDk2MzMtbHU0dXEzYmFiaGZsMnJlNThiZ2FmbXIxZzQ0N3VyMmUuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMDQzMDg5NDE3NzA5MTMzOTkxNTMiLCJhdF9oYXNoIjoiWklhNG9naFNpZXlrLUR1YlhhekJMQSIsIm5hbWUiOiJBcnNoaXlhIE5haGVlZCIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMekZGaWdLNjJfVE1kZ2l3aXExZk1sSzA3YVFsRGlVYmdST0t3N1dvTjlHUGhkOEMwM2l3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6IkFyc2hpeWEiLCJmYW1pbHlfbmFtZSI6Ik5haGVlZCIsImlhdCI6MTcxODE1NTIwMiwiZXhwIjoxNzE4MTU4ODAyfQ.qRFs3Q2ohzDB1-IyWseK78D4xPyhxC43J7nuYoHva5ClxVLD0MKNF5mOxSyNUm1IZM-nw2fotwyRv9nsjllemp5Kkx7nvTk6XOAT_1S3qFZl5w0uUWVsPPgpb-oG-AFXaho3PBdZ-BWXbiFefpEFelqSr8mDU-gq--KRdb91DFG7rviaxaaH8iILYTPxCw8Q-IXgXWh4100C8Kz875zOZ3fyC53vGFzxNe0dLU5X_t7Wt9tCj2phr1ODBKgHxmYH55lZT9pe6QUZsBPcHAYP49FsXKXroQZJDgYy-EQirEeUvKdPtnLY8DvzRG3sng_WhaKmn2jkVpthEpCUcaKFdw",
      "expiry_date": 1718158801214
    }
  };

  const fetchFiles = async () => {
    try {
      // const response = await fetch('/files');
      const response = await fetch('http://localhost:3001/readDrive', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
      }
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