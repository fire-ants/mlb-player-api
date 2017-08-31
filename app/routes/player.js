const express = require('express');

const Player = require('../models/player');

const router = express.Router();

router.get('/', (req, res) => {
  const query = Player.find();

  if (req.query.limit) {
    query.limit(parseInt(req.query.limit, 10));
  } else {
    query.limit(100);
  }

  query.exec((err, players) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(players);
    }
  });
});

router.post('/', (req, res) => {
  console.log("Body:"+JSON.stringify(req.body));
  const player = new Player();
  player.mlbid = req.body.mlbid;
  player.firstName = req.body.firstName;
  player.lastName = req.body.lastName;
  player.position = req.body.position;
  player.bats = req.body.bats;
  player.birthDate = req.body.birthDate;
  player.height = req.body.height;
  player.weight = req.body.weight;
  player.team = req.body.team;

  player.save((err) => {
    if (err) {
      res.status(400).json(err);
    } else {
      res.setHeader('Location', `/player/${player.mlbid})`);
      res.status(201).json(player);
    }
  });
});

router.get('/:mlbid', (req, res) => {
  Player.findOne({mlbid: req.params.mlbid})
    .exec((err, player) => {
      if (err || !player) {
        res.sendStatus(404);
      } else {
        res.json(player);
      }
    });
});

module.exports = router;
