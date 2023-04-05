const http = require ('http')
const hostname = '127.0.0.1';
const port = 3000;
const Sequelize = require('sequelize');
const { User, Artist, Album } = require('./models');


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

app.post('/users', async (req, res) => {   //<-- creates new user
    const { username, email, password } = req.body;
    const newUser = await User.create({
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
  const users = await User.findAll();
  res.json(users);
});

app.get('/users/:id', async (req, res) => {  //<--- gets user by id
  try{
    const oneUser = await User.findByPk(req.params.id);
    res.json(oneUser);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: 'User not found'
    });
  }
});

app.post('/users/:id', async (req, res) => { //<-- updates user by id
  const { id } = req.params;
  const updatedUser = await User.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const deletedUser = await User.destroy({
    where: {
      id
    }
  });
  res.json(deletedUser);
})

app.get('/artists', async (req, res) => {
  const artists = await Artist.findAll();
  res.json(artists);
});

app.post('/artists', async (req, res) => {
  const { name, genre } = req.body;
  const newArtist = await Artist.create({
    name,
    genre
  });
  res.json({
    id: newArtist.id,
    name: newArtist.name
  });
});

app.get('/artists/:id', async (req, res) => {
  try{
    const oneArtist = await Artist.findByPk(req.params.id);
    res.json(oneArtist);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: 'Artist not found.'
    });
  }
});

app.post('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const updatedArtist = await Artist.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedArtist);
});

app.delete('/artists/:id', async (req, res) => {
  const { id } = req.params;
  const deletedAritst = await Artist.destroy({
    where: {
      id
    }
  });
  res.json(deletedAritst);
});

app.get('/albums', async (req, res) => {
  const Albums = await Album.findAll();
  res.json(Albums);
});

app.post('/albums', async (req, res) => {
  const { name, year, artistId } = req.body;
  const newAlbum = await Album.create({
    name,
    year,
    artistId
  });
  res.json({
    id: newAlbum.id,
    name: newAlbum.name
  });
});

app.get('/albums/:id', async (req, res) => {
  try{
    const oneAlbum = await Album.findByPk(req.params.id);
    res.json(oneAlbum);
  } catch (e) {
    console.log(e);
    res.status(404).json({
      message: 'Album not found'
    });
  }
});

app.post('/albums/:id', async (req, res) => {
  const { id } = req.params;
  const updatedAlbum = await Album.update(req.body, {
    where: {
      id
    }
  });
  res.json(updatedAlbum);
});

app.delete('/albums/:id', async (req, res) => {
  const { id } = req.params;
  const deletedAlbum = await Album.destroy({
    where: {
      id
    }
  });
  res.json(deletedAlbum);
});


app.get('/artists-albums', async (req, res) =>{  //<-- foreign key handler
    const artistAlbum = await Artist.findAll({
        include: [{
            model: Album
        }]
    });
    res.json(artistAlbum);
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

