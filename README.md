# Valorant-Agent-Selection


#### Back-End API Contract

* Roles Lisitng API
  *URL Suffix* : `/api/roles`
  *Response* 
    ```{
        "roles": [
        "Initiator",
        "Sentinel",
        "Duelist",
        "Controller"
    ],
    "success": true
    }```
-----
* AngentList
   *URL Suffix* : `api/agents?role={roldId}&playerId={playerId}`
   *query params*
    - role filter
          - anyOf ["Initiator","Sentinel","Duelist","Controller"]
          - default will list all agents having role object
    - playerId
   *Response*
```{
    "agents": [
        {
            "agentId": "e370fa57-4757-3604-3648-499e1f642d3f",
            "agentName": "Gekko",
            "bustPortrait": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
            "fullPortrait": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/fullportrait.png",
            "background": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/background.png",
            "backgroundGradientColors": [
                "c7f458ff",
                "d56324ff",
                "3a2656ff",
                "3a7233ff"
            ],
            "agentImageURL": "https://media.valorant-api.com/agents/e370fa57-4757-3604-3648-499e1f642d3f/displayicon.png",
            "role": {
                "displayName": "Initiator",
                "displayIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png"
            },
            "isLocked": true,
            "lockedBy": "e195b61e-2dc9-42f6-aaec-48243d1ac9d5"
        },
        {
            "agentId": "dade69b4-4f5a-8528-247b-219e5a1facd6",
            "agentName": "Fade",
            "bustPortrait": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/fullportrait.png",
            "fullPortrait": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/fullportrait.png",
            "background": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/background.png",
            "backgroundGradientColors": [
                "b1414cff",
                "5589bdff",
                "18344cff",
                "66376cff"
            ],
            "agentImageURL": "https://media.valorant-api.com/agents/dade69b4-4f5a-8528-247b-219e5a1facd6/displayicon.png",
            "role": {
                "displayName": "Initiator",
                "displayIcon": "https://media.valorant-api.com/agents/roles/1b47567f-8f7b-444b-aae3-b0c634622d10/displayicon.png"
            },
            "isLocked": true,
            "lockedBy": "e195b61e-2dc9-42f6-aaec-48243d1ac9d5"
        }
    ],
    "success": true
}```
-----
* Add Player : POST
    *URL Suffix* : `/api/add-player`
    *Response*
```{
    "data": {
        "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
        "games": [],
        "agentSelectionMeta": {}
    },
    "success": true
}```
-----
* Get Player : UID in path
*URL Suffix* : `/api/player/:playerId` 
*Response*: 
```{
    "data": {
        "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
        "games": [],
        "agentSelectionMeta": {},
        "gameStartTime": null
    },
    "success": true
}
```
-----
* Locking Agent : UID in path
  *URL Suffix* : `api/lock-agent/:playerId`
  *Request Body* : ```{
    "agentId": "e370fa57-4757-3604-3648-499e1f642d3f"
  }```
  *Response*
```{
    "success": true,
    "playerId": "10810a49-96b3-42fa-88af-1a69682a3789",
    "games": [
        "e370fa57-4757-3604-3648-499e1f642d3f"
    ],
    "agentSelectionMeta": {
        "e370fa57-4757-3604-3648-499e1f642d3f": 1
    }
}
```


