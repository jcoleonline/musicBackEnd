const express = require('express');
const sequelize = require('sequelize')
const router = express.Router();
const bcrypt = require('bcrypt');
const session = require('express-session');
const {User} = require("./../models");


router.get("/", (req, res) => {
    res.render("home");
  });

router.post("/user-login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username,
      },
    });
  
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      res.status(500).json({ message: "Invalid username or password" });
    }
    req.session.user = user;
    req.session.authorized = true;
    res.json({ message: "login successful!" });  //<-- eventually we can change this to render the user template
    res.render('/username')
  });

  
  router.post("/user-register", async (req, res) => {
    //<-- creates new user
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });
      res.json(newUser);
     

    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "user not created",
      });
    }
  });
  
  router.get("/users", async (req, res) => {
    const users = await User.findAll();
    res.render("user", {
      locals: {
        users,
      },
    });
  });
  
  router.get("/users/:id", async (req, res) => {
    const oneUser = await User.findByPk(req.params.id);
    // const username = db[oneUser].username
    res.render("username", {
      locals: {
        oneUser,
      },
    });
  });
  
  router.post("/users/:id", async (req, res) => {
    //<-- updates user by id
    const { id } = req.params;
    const updatedUser = await User.update(req.body, {
      where: {
        id,
      },
    });
    res.json(updatedUser);
  });
  
  router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await User.destroy({
      where: {
        id,
      },
    });
    res.json(deletedUser);
  });

  router.get("/login", (req, res) => {
    res.render("login");
  });

  router.get("/register", (req, res) => {
    res.render("register");
  });

  module.exports = router;