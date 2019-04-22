var csv = require("fast-csv");
var mongoose = require("mongoose");
var sensor_data = [];
var schema = require("../db/db.js");

const ReadVoice = (req, res) => {
  csv
    .fromPath("uploaded/voice.csv", {
      headers: true,
      ignoreEmpty: true
    })
    .on("data", function(data) {
      data["_id"] = new mongoose.Types.ObjectId();
      sensor_data.push(data);
    })
    .on("end", function() {
      schema.Voice.create(sensor_data, function(err, documents) {
        if (err) throw err;
        res.json({ success: true });
      });
    });
};

const GetVoice = (req, res) => {
  schema.Voice.find(
    {
      dataset_id: req.query.dataset_id,
      badge_id: req.query.badge_id,
      timestamp: {
        $lte: new Date().setTime(req.query.end)
        // $gte: new Date().setTime(req.query.start)
      }
    },
    (err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    }
  )
    .sort({ timestamp: -1 })
    .limit(req.query.size);
};

module.exports = router => {
  router.post("/readVoice", ReadVoice);
  router.get("/getVoice", GetVoice);
};
