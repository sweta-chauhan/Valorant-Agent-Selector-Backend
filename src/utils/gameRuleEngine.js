const gameErrorMessages = require("../common/errorMessages")
const gameConfig = require("../common/constants")


class gameRuleEngine {
    constructor(playerObj, agentId){
        this.playerObj = playerObj,
        this.agentId = agentId
    }
    checkAgentLockInExceed(){
        let isAgentLockInAllowed = true;
        if (this.agentId in this.playerObj.agentSelectionMeta){
            if (this.playerObj.agentSelectionMeta[this.agentId] >= gameConfig.MAX_LIMIT_ON_ONE_AGENT_SELECTION){
                isAgentLockInAllowed = false;
            };
        }
        return isAgentLockInAllowed
    }
    checkAgentIsAllowedForGame(){
        let isAgentAllowedForGame = false;
        let gameErrorMessage = ""
        let timeStamp = null;
        const gamePlayed = this.playerObj.games.length;
        if (gamePlayed == 0){
            isAgentAllowedForGame = true;
            timeStamp = Date.now();
        }
        else{
            if (gamePlayed >= gameConfig.MAX_GAME_ALLOWED_PER_USER){
                gameErrorMessage = gameErrorMessages.MAXGAMELIMIT;
            }
            else{
                if ( gamePlayed >= gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME){
                    const agentSelectedInLastRound = [...new Set(this.playerObj.games.slice(-gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME))];
                    const differntSelectedAgent = agentSelectedInLastRound.length;
                    
                    if (differntSelectedAgent == gameConfig.CONDITION_AFTER_LAST_PLAYEDGAME){
                        if (this.playerObj.games[gamePlayed-1]!=this.agentId && this.agentId in agentSelectedInLastRound) {
                            isAgentAllowedForGame = true;
                        }
                        else{
                            gameErrorMessage = gameErrorMessages.NTHGAMERULEBREACH;
                        }
                     }
                     else{
                        if (this.playerObj.games[gamePlayed-1]!=this.agentId){
                            isAgentAllowedForGame = true;
                        }
                        else{
                            gameErrorMessage = gameErrorMessages.CONSECUTIVESELECTION;
                        }
                    }
                    
            }
            else{   
                if (this.playerObj.games[gamePlayed-1]!=this.agentId){
                    isAgentAllowedForGame = true;
                }
                else{
                    gameErrorMessage = gameErrorMessages.CONSECUTIVESELECTION;
                }
            }
            }
        }
        
        return {isAgentAllowedForGame, gameErrorMessage, timeStamp}
    }
    execute(){
        let allowedLockIn = true;
        let errorMessage = "";
        const isAgentLockInExceed = this.checkAgentLockInExceed();
        const {isAgentAllowedForGame, gameErrorMessage, timeStamp}  = this.checkAgentIsAllowedForGame();
        
        if (!isAgentAllowedForGame){
            allowedLockIn = false;
            errorMessage = gameErrorMessage;
        
        }
        else{
            if (!isAgentLockInExceed){
                errorMessage = gameErrorMessages.AGENTLOCKINLIMIT;
                allowedLockIn = false;
            }
        }
        
        return {allowedLockIn, errorMessage, timeStamp}
    }
}


module.exports = gameRuleEngine;