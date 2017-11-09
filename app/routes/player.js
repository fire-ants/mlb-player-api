const express = require('express');

const Player = require('../models/player');
const Insight = require('../models/insight');

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
  Player.findOne({ mlbid: req.params.mlbid })
    .exec((err, player) => {
      if (err || !player) {
        res.sendStatus(404);
      } else {
        res.json(player);
      }
    });
});


router.post('/:mlbid/insight', (req, res) => {
  Player.findOne({ mlbid: req.params.mlbid })
    .exec((err, player) => {
      if (err || !player) {
        res.sendStatus(404);
      } else {
        Insight.remove({ player: player.id }, (err) => {
          const insight = new Insight();
          insight.player = player.id;
          insight.findings = [];

          req.body.findings.forEach((element) => {
            insight.findings.push(element)
          });

          insight.save((err) => {
            if (err) {
              res.status(400).json(err);
            } else {
              res.setHeader('Location', `/player/${player.mlbid}/insight/${insight.id})`);
              res.status(201).json(insight);
            }
          });
        });
      }
    });
});

router.get('/:mlbid/insight', (req, res) => {
  Player.findOne({ mlbid: req.params.mlbid })
    .exec((err, player) => {
      if (err || !player) {
        res.sendStatus(404);
      } else {
        Insight.findOne({ player: player.id })
          .exec((err, insight) => {
            if (err || !insight) {
              res.sendStatus(404);
            } else {
              res.json(insight);
            }
          });
      }
    });
});

module.exports = router;
