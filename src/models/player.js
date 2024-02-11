const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  playerId: { type: String, required: true },
  games: {type: [String], default:() => []},
  agentSelectionMeta: {type: mongoose.Schema.Types.Mixed, default:{}},
  gameStartTime: {type: Date},
  profileImage: {type: String, required: true}
  },{ versionKey: false });


const Player = mongoose.model('player', playerSchema);
module.exports = Player;