const gameConfig = require("../common/constants")

class agentLock {
    constructor(playerObj){
        this.playerObj = playerObj;
    }
    meta(){
        const games = this.playerObj.games;
        const agentSelectionMeta = this.playerObj.agentSelectionMeta;
        let agentLockFlagMap = {};
        agentLockFlagMap["canSelect"] = [];
        if (games){
            agentLockFlagMap[games[games.length - 1]] = true;
        }
        if (games.length == gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME){
            const agentSelectedInLastRound = [...new Set(this.playerObj.games.slice(-gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME))];
            const differentSelectedAgent = agentSelectedInLastRound.length;
            if (differentSelectedAgent == gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME){
                agentLockFlagMap["canSelect"] = agentSelectedInLastRound;
            }
            
            console.log(agentLockFlagMap);
        }
        if (agentSelectionMeta){
            for (const [key, value] of Object.entries(agentSelectionMeta)) {
                if (value==3){
                    agentLockFlagMap[key] = true;
                }
              } 
        }
        return agentLockFlagMap
    }
}


module.exports = agentLock;