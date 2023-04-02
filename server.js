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
app.use(express.json());

app.get('/', (req, res) => {
  res.send('home');
});

app.post('/users', async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await user.create({
        username,
        email,
        password
    });
    res.json({
        id: newUser.id,
        username: newUser.username,
    });
});

app.get('/users', async (req, res) => {
  const users = await user.findAll();
  res.json(users);
});

app.get('/users/by-username', async (req, res) => {
    const username = await user.findAll({
        attributes: ['username']
    });
    res.json(username)
});


app.get('/artists', async (req, res) => {
  const artists = await artist.findAll();
  res.json(artists);
});

app.get('/albums', async (req, res) => {
  const albums = await album.findAll();
  res.json(albums);
});

app.get('/artists/albums', async (req, res) =>{
    const artistAlbum = await artist.findAll({
        include: [{
            model: album
        }]
    });
    res.json(artistAlbum);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

