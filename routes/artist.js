const express = require('express');
const sequelize = require('sequelize')
const router = express.Router();
const {Artist} = require("./../models");

router.get("/artists", async (req, res) => {
    const artists = await Artist.findAll();
    res.render("artist", {
      locals: {
        artists,
      },
    });
  });
  
router.post("/artists", async (req, res) => {
    const { name, genre } = req.body;
    const newArtist = await Artist.create({
      name,
      genre,
    });
    res.json({
      id: newArtist.id,
      name: newArtist.name,
    });
  });
  
  router.get("/artists/:id", async (req, res) => {
    const oneArtist = await Artist.findByPk(req.params.id);
    res.render("artistId", {
      locals: {
        oneArtist,
      },
    });
  });
  
  router.post("/artists/:id", async (req, res) => {
    const { id } = req.params;
    const updatedArtist = await Artist.update(req.body, {
      where: {
        id,
      },
    });
    res.json(updatedArtist);
  });
  
  router.delete("/artists/:id", async (req, res) => {
    const { id } = req.params;
    const deletedAritst = await Artist.destroy({
      where: {
        id,
      },
    });
    res.json(deletedAritst);
  });

  module.exports = router;
