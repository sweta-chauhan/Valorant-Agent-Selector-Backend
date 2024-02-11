const axios = require('axios');
const agentLock = require("../utils/agentLock");
const Player = require('../models/player');

const agentController = {
    roles : async (req, res) => {
        try {
            const response = await axios.get('https://valorant-api.com/v1/agents');
            const agents = response.data.data;
            const agentRoles = groupAgentsRole(agents);
            res.json({"roles": agentRoles, "success": true});
        }         
        catch (error) {
            console.error('Error fetching agents:', error.message);
            res.status(500).send('Internal Server Error');
        }
    },

    agents : async (req, res) => {

        try {
                const response = await axios.get('https://valorant-api.com/v1/agents');
                const { role, playerId} = req.query;
                const agents = response.data.data;
                let agentLockedMap = {};
                const playerObj = await Player.findOne({playerId: playerId});
                if (playerObj){
                    const agentLockObj = new agentLock(playerObj);
                    agentLockedMap =  agentLockObj.meta(); 
                }
                const groupedAgents = getAgentsByRole(agents, role, agentLockedMap, playerId);
                
                res.json({"agents": groupedAgents, "success": true});
            } 
        catch (error) {
            console.error('Error fetching agents:', error.message);
            res.status(500).send('Internal Server Error');
        }
    }

};

function getAgentsByRole(agents, role, agentLockedMap, playerId) {
  const groupedAgents = [];

  agents.forEach((agent) => {
    if (agent.role != null){
        const role_name = agent.role.displayName;
        if  (role == role_name || role == null  || role == "all"){
            let isLocked = false;
            let player = "NA";
            if (agent.uuid in agentLockedMap){
                isLocked = agentLockedMap[agent.uuid];
                player = playerId;
            }
            if (agentLockedMap.canSelect){
                if (!agentLockedMap.canSelect.includes(agent.uuid)){
                    isLocked = true;
                }
            }
            groupedAgents.push({
                agentId: agent.uuid,
                agentName: agent.displayName,
                bustPortrait: agent.bustPortrait,
                fullPortrait: agent.fullPortrait,
                background: agent.background,
                backgroundGradientColors: agent.backgroundGradientColors,
                agentImageURL: agent.displayIcon,
                role: {
                    displayName:role_name,
                    displayIcon: agent.role.displayIcon
                },
                isLocked: isLocked,
                lockedBy: player
            });
        }
    } 
  });
  return groupedAgents;
}

function groupAgentsRole(agents) {
    const agentsRole = new Set();

  agents.forEach((agent) => {
    if (agent.role != null){
        const role = agent.role.displayName;
        agentsRole.add(role)
    }
      
  });
  return Array.from(agentsRole);
}


module.exports = agentController;