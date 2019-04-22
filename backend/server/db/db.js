const mongoose = require('mongoose')
const config = require('config-lite')

// mongodb 连接🔗
mongoose.connect(config.mongodb, { useMongoClient: true })
// 此处防止 node.js - Mongoose: mpromise 错误
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connect error'))
db.once('open', function () {
    console.log('Mongodb started successfully')
})


var datasetSchema = mongoose.Schema({
    dataset_id: Number,
    dataset_name: String,
    participants: Number,
    created_time: Date,
    description: String,
    teams: Number
})

var badgeSchema = mongoose.Schema({
    dataset_id: Number,
    badge_id: Number,
    user_name: String,
    team_id: Number
})

var bodymovementSchema = mongoose.Schema({
    badge_id: Number,
    dataset_id: Number,
    x: Number,
    y: Number,
    z: Number,
    energy: Number,
    consistency: Number,
    timestamp: Date
})

var voiceSchema = mongoose.Schema({
    badge_id: Number,
    dataset_id: Number,
    frequency: Number,
    amplitude: Number,
    timestamp: Date
})

var model = {
    // 在此处扩展 model，例如：
    // Article: mongoose.model('Article', articleSchema),
    Dataset: mongoose.model('Dataset', datasetSchema),
    Badge: mongoose.model('Badge', badgeSchema),
    Bodymovement: mongoose.model('Bodymovement', bodymovementSchema),
    Voice: mongoose.model('Voice', voiceSchema)
}

module.exports = model