const express = require('express');
const sequelize = require('sequelize');
const router = express.Router();
const { User, Artist, Album } = require("./../models");

router.get("/albums", async (req, res) => {
    const Albums = await Album.findAll();
    res.render("albums", {
      locals: {
        Albums,
      },
    });
  });
  
  router.post("/albums", async (req, res) => {
    const { name, year, artistId } = req.body;
    const newAlbum = await Album.create({
      name,
      year,
      artistId,
    });
    res.json({
      id: newAlbum.id,
      name: newAlbum.name,
    });
  });
  
  router.get("/albums/:id", async (req, res) => {
    const oneAlbum = await Album.findByPk(req.params.id);
    res.render("albumsid", {
      locals: {
        oneAlbum,
      },
    });
  });
  
  router.post("/albums/:id", async (req, res) => {
    const { id } = req.params;
    const updatedAlbum = await Album.update(req.body, {
      where: {
        id,
      },
    });
    res.json(updatedAlbum);
  });
  
  router.delete("/albums/:id", async (req, res) => {
    const { id } = req.params;
    const deletedAlbum = await Album.destroy({
      where: {
        id,
      },
    });
    res.json(deletedAlbum);
  });
  
  router.get("/artists-albums", async (req, res) => {
    //<-- foreign key handler
    const artistAlbum = await Artist.findAll({
      include: [
        {
          model: Album,
        },
      ],
    });
    res.json(artistAlbum);
  });

  module.exports = router;
  