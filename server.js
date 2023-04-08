const http = require("http");
const hostname = "127.0.0.1";
const port = 3000;
const Sequelize = require("sequelize");
const crypto = require('crypto')
const session = require("express-session");
const userRoute = require('./routes/user')
const artistRoute = require('./routes/artist')
const albumRoute = require('./routes/album')
const express = require("express");
const app = express();
const randomSecret = () => {
  return crypto.randomBytes(32).toString('hex')
};

const es6Renderer = require("express-es6-template-engine");
const { strict } = require("assert");

app.engine("html", es6Renderer);
app.set("views", "templates");
app.set("view engine", "html");

const server = http.createServer(app);

app.use(express.static("public"));
app.use(express.json());
app.use(
  session({
    secret: randomSecret(),
    resave: false,
    saveUninitialized: true,
  })
);

app.use(userRoute);
app.use(artistRoute);
app.use(albumRoute);



server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
