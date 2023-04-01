const http = require ('http')
const hostname = '127.0.0.1';
const port = 3000;
const Sequelize = require('sequelize');
const { user } = require('./models');
const { artist } = require('./models');
const { album } = require('./models');

const express = require('express');
const app = express();

const es6Renderer = require('express-es6-template-engine');
app.engine('html', es6Renderer);
app.set('views', 'templates');
app.set('view engine', 'html');

const server = http.createServer(app);
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('home');
});

app.get('/users', async (req, res) => {
  const users = await user.findAll();
  res.json(users);
});

app.get('/artists', async (req, res) => {
  const artists = await artist.findAll();
  res.json(artists);
});

app.get('/albums', async (req, res) => {
  const albums = await album.findAll();
  res.json(albums);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

