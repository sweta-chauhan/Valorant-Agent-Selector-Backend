class agentLock {
    constructor(playerObj){
        this.playerObj = playerObj;
    }
    meta(){
        const games = this.playerObj.games;
        const agentSelectionMeta = this.playerObj.agentSelectionMeta;
        let agentLockFlagMap = {};
        if (games){
            agentLockFlagMap[games[games.length - 1]] = true;
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