var csv = require("fast-csv");
var mongoose = require("mongoose");
var axios = require("axios");
var formidable = require("formidable");
var schema = require("../db/db.js");

const Predict = data => {
  return axios
    .post("http://localhost:5000/api", {
      x: data["x"],
      y: data["y"],
      z: data["z"]
    })
    .then(res => {
      data["energy"] = res.data.toString();
      return res.data.toString();
    });
};

const ReadBm = (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {});
  form.on("progress", function(bytesReceived, bytesExpected) {
    var percent_complete = (bytesReceived / bytesExpected) * 100;
    console.log(percent_complete.toFixed(2));
  });
  form.on("error", function(err) {
    console.error(err);
  });
  form.on("end", function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file, should be 5_3_bm.csv */
    var dataset_id = Number.parseInt(this.openedFiles[0].name.split("_")[0]);
    var badge_id = Number.parseInt(this.openedFiles[0].name.split("_")[1]);
    var file_name = temp_path + "/" + this.openedFiles[0].name;
    csv
      .fromPath(file_name, {
        headers: true,
        ignoreEmpty: true
      })
      .on("data", function(data) {
        data["_id"] = new mongoose.Types.ObjectId();
        data["dataset_id"] = dataset_id;
        data["badge_id"] = badge_id;
        Predict(data).then(temp => {
          data["energy"] = temp;
          let movement = new schema.Bodymovement(data);
          movement.save(err => {
            if (err) console.log(err);
          });
        });
      })
      .on("end", function() {
        res.json({ success: true });
      });
  });
};

const GetBm = (req, res) => {
  console.log(req.query);
  schema.Bodymovement.find(
    {
      dataset_id: req.query.dataset_id,
      badge_id: req.query.badge_id,
      timestamp: {
        $lte: new Date().setUTCMilliseconds(req.query.end)
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

const BmLimit = (req, res) => {
  schema.Bodymovement.aggregate(
    [
      {
        $match: {
          dataset_id: Number.parseInt(req.query.dataset_id),
          badge_id: Number.parseInt(req.query.badge_id)
        }
      },
      {
        $group: {
          _id: null,
          min: { $min: "$timestamp" },
          max: { $max: "$timestamp" }
        }
      }
    ],
    (err, doc) => {
      if (err) console.log(err);
      res.json(doc);
    }
  );
};

module.exports = router => {
  router.post("/readBm", ReadBm);
  router.get("/getBm", GetBm);
  router.get("/bmLimit", BmLimit);
};
