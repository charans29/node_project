// const express = require("express");
// const app = express();
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const { google } = require('googleapis');
// const multer = require('multer');
// const fs = require('fs');
// const formidable = require('formidable');
// const credentials = require('./credentials.json')

// const client_id = credentials.web.client_id;
// const client_secret = credentials.web.client_secret;
// const redirect_uris = credentials.web.redirect_uris;
// const oAuth2Client = new google.auth.OAuth2(client_id,client_secret,redirect_uris[0]);

// const SCOPE = ['https://www.googleapis.com/auth/drive.metadata.readonly https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/drive.file']


// app.use(cors());
// app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.json());

// app.get('/',(req,res)=> res.send('API Running'));


// app.get('/getAuthURL', (req, res) => {
//     const authUrl = oAuth2Client.generateAuthUrl({
//         access_type: 'offline',
//         scope: SCOPE,
//     });
//     console.log(authUrl);
//     return res.send(authUrl);
// });


// const PORT = process.env.PORT || 5001;
// app.listen(PORT,()=> console.log(`Server Started ${PORT}`))



const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const SCOPES = ['https://www.googleapis.com/auth/drive.readonly'];
const TOKEN_PATH = 'token.json';

const credentials = JSON.parse(fs.readFileSync('credentials.json'));

const { client_secret, client_id, redirect_uris } = credentials.web;
const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) return getAccessToken(oAuth2Client);
  oAuth2Client.setCredentials(JSON.parse(token));
});

function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
}

app.get('/files', async (req, res) => {
  const drive = google.drive({ version: 'v3', auth: oAuth2Client });
  drive.files.list({
    q: "mimeType='application/pdf'",
    fields: 'files(id, name)',
  }, (err, response) => {
    if (err) return res.status(500).send(err);
    res.send(response.data.files);
  });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
