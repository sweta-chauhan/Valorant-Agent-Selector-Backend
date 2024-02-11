const { v4: uuidv4 } = require('uuid');
const Player = require('../models/player');
const gameRuleEngine = require("../utils/gameRuleEngine");
const { agent } = require('supertest');

const playerController = {
  addNewPlayer: async (req, res) => {
    try {
      const playerId = uuidv4();
      const player = new Player({playerId: playerId});
      await player.save();
      res.status(201).json(
        {
            data: {
              playerId: playerId,
              games: [],
              agentSelectionMeta: {}
            },
            success: true 
        }
    ); 
    }
    catch (error) {
      console.error(error);
        res.status(500).json(
          { 
            message: 'Internal Server Error',
            success: false
          });
    }
  },
  getPlayer: async (req, res) => {
    try {
      const playerId = req.params.playerId;
      const player = await Player.findOne({playerId: playerId});
      if (player){
        res.status(200).json(
          {
              data: {
                playerId: playerId,
                games: player.games,
                agentSelectionMeta: player.agentSelectionMeta || {},
                gameStartTime: player.gameStartTime || null
              },
              success: true 
          });
        }
      else{
        res.status(400).json(
          {
              message: "Player not found",
              success: false
          });
      }
    }
    catch (error) {
      console.error(error);
        res.status(500).json(
          { 
            message: 'Internal Server Error',
            success: false
          });
    }
  }, 
  lockInAgent: async (req, res) => {
    try {
        const playerId = req.params.playerId;
        const { agentId } = req.body;
        const player = await Player.findOne({playerId});
        if (player){
          
          let games = player.games;
          const gameRules = new gameRuleEngine(player, agentId);
          const {allowedLockIn, errorMessage, timeStamp} = gameRules.execute();
          if (allowedLockIn){
            let agentSelectionCount = 1;
            if (player.agentSelectionMeta[agentId]){
              agentSelectionCount = player.agentSelectionMeta[agentId] + 1;
            }
            const agentSelectionMetaData = player.agentSelectionMeta;
            agentSelectionMetaData[agentId] = agentSelectionCount
            games.push(agentId);
            let updateKeyValue = {}
            if (timeStamp){
              updateKeyValue = { 
                $set:
                  {
                    agentSelectionMeta: agentSelectionMetaData,
                    games: games,
                    gameStartTime: timeStamp
                  }
                };
            }
            else{
              updateKeyValue = {
                $set: 
                {
                  agentSelectionMeta: agentSelectionMetaData,
                  games: games
                }
              };
            }
            
            // Update using updateOne
            try {
              const result = await Player.updateOne({ playerId: playerId }, updateKeyValue);
              
            } catch (err) {
              res.status(400).json({
                success: false,
                message: "Not able to write in Database"
              });
            }            
            res.status(200).json({
              success: true,
              playerId: playerId,
              games: player.games,
              agentSelectionMeta: player.agentSelectionMeta,
              gameStartTime: player.gameStartTime
            });
            
          }
          else {
            res.status(400).json({
              success: false,
              message: errorMessage
            })
          }
        }
        else{
          res.status(400).json({success: false, message: "Player not found"})
        }

    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' , success: false});
    }
  },
};


module.exports = playerController;
