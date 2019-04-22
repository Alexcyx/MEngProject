var express = require('express')
var InitializeController = require('../controller/initialize.js')
var BodymovementController = require('../controller/bodymovement.js')
var VoiceController = require('../controller/voice.js')
var router = express.Router()

InitializeController(router);
BodymovementController(router);
VoiceController(router);

module.exports = router;
