const express = require("express");
const model = require("../db/db.js");
const router = express.Router();

const InitializeDataset = (req, res) => {
  let succ = true;
  let dataset = new model.Dataset({
    dataset_id: req.body.id,
    dataset_name: req.body.name,
    participants: req.body.participants.length,
    created_time: req.body.timestamp,
    description: req.body.description,
    teams: req.body.teams
  });

  req.body.participants.forEach(user => {
    let badge = new model.Badge({
      dataset_id: user.dataset_id,
      badge_id: user.badge_id,
      user_name: user.user_name,
      team_id: user.team_id
    });
    badge.save(err => {
      if (err) {
        console.log(err);
        succ = false;
      }
    });
  });

  dataset.save(err => {
    if (err) console.log(err);
    res.json({
      success: true && succ
    });
  });
};

const AllDataset = (req, res) => {
  model.Dataset.find({}, (err, doc) => {
    if (err) console.log(err);
    res.json(doc);
  });
};

const GetDataset = (req, res) => {
  model.Dataset.findOne(
    {
      dataset_id: req.query.dataset_id
    },
    (err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    }
  );
};

const AllParticipants = (req, res) => {
  model.Badge.find(
    {
      dataset_id: req.query.dataset_id
    },
    (err, doc) => {
      if (err) console.log(err);
      console.log(doc);
      res.json(doc);
    }
  );
};

const GetBadge = (req, res) => {
  model.Badge.findOne(
    {
      dataset_id: req.query.dataset_id,
      badge_id: req.query.badge_id
    },
    (err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    }
  );
};

module.exports = router => {
  router.post("/initializeDataset", InitializeDataset);
  router.get("/allDataset", AllDataset);
  router.get("/allParticipants", AllParticipants);
  router.get("/getDataset", GetDataset);
  router.get("/getBadge", GetBadge);
};
